/**
 * Places original raster pencil miniatures beneath the front surface of selected
 * spheres. The generated atlas depicts research categories rather than case facts;
 * each clone is cropped deterministically and disposed with the decorative scene.
 */
import {
  CircleGeometry,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  Quaternion,
  SRGBColorSpace,
  TextureLoader,
  TorusGeometry,
  Vector3,
  type BufferGeometry,
  type Material,
  type Texture,
} from 'three';
import type { ResearchEvidenceKind, ResearchWorldNode } from './researchWorldModel';

interface EvidenceAtlasTile {
  readonly atlas: 'primary' | 'secondary';
  readonly tile: number;
}

const atlasTileByEvidence: Record<ResearchEvidenceKind, EvidenceAtlasTile> = {
  interview: { atlas: 'primary', tile: 0 },
  receipt: { atlas: 'primary', tile: 1 },
  product: { atlas: 'primary', tile: 2 },
  alternative: { atlas: 'primary', tile: 3 },
  price: { atlas: 'primary', tile: 4 },
  factory: { atlas: 'primary', tile: 5 },
  route: { atlas: 'primary', tile: 6 },
  transport: { atlas: 'primary', tile: 7 },
  economics: { atlas: 'primary', tile: 8 },
  risk: { atlas: 'primary', tile: 8 },
  competitor: { atlas: 'secondary', tile: 0 },
  permit: { atlas: 'secondary', tile: 1 },
  supplier: { atlas: 'secondary', tile: 2 },
  customs: { atlas: 'secondary', tile: 3 },
  inventory: { atlas: 'secondary', tile: 4 },
  repair: { atlas: 'secondary', tile: 5 },
  channel: { atlas: 'secondary', tile: 6 },
  failure: { atlas: 'secondary', tile: 7 },
  pilot: { atlas: 'secondary', tile: 8 },
};

const frontAxis = new Vector3(0, 0, 1);

function createAtlasTile(atlasTexture: Texture, tileIndex: number): Texture {
  const tileTexture = atlasTexture.clone();
  const columnIndex = tileIndex % 3;
  const rowIndex = Math.floor(tileIndex / 3);
  tileTexture.repeat.set(1 / 3, 1 / 3);
  tileTexture.offset.set(columnIndex / 3, 1 - (rowIndex + 1) / 3);
  tileTexture.colorSpace = SRGBColorSpace;
  tileTexture.needsUpdate = true;
  return tileTexture;
}

function createEvidenceMedallion(
  node: ResearchWorldNode,
  atlasTexture: Texture,
  rimMaterial: Material,
  resources: (BufferGeometry | Material | Texture)[],
): Group {
  const group = new Group();
  if (!node.evidenceKind) return group;
  const tileTexture = createAtlasTile(
    atlasTexture,
    atlasTileByEvidence[node.evidenceKind].tile,
  );
  const medallionRadius = node.scale * (node.evidenceScale ?? 0.66);
  const [offsetX, offsetY] = node.evidenceOffset ?? [0, 0];
  const normal = new Vector3(offsetX, offsetY, 1).normalize();
  const surfacePosition = node.position
    .clone()
    .addScaledVector(normal, node.scale * 1.012);
  const surfaceRotation = new Quaternion().setFromUnitVectors(frontAxis, normal);
  const medallionGeometry = new CircleGeometry(medallionRadius, 56);
  const medallionMaterial = new MeshBasicMaterial({ map: tileTexture });
  const medallion = new Mesh(medallionGeometry, medallionMaterial);
  medallion.position.copy(surfacePosition);
  medallion.quaternion.copy(surfaceRotation);
  group.add(medallion);

  const rimGeometry = new TorusGeometry(
    medallionRadius * 1.045,
    node.scale * 0.021,
    7,
    52,
  );
  const rim = new Mesh(rimGeometry, rimMaterial);
  rim.position.copy(medallion.position);
  rim.position.addScaledVector(normal, 0.025);
  rim.quaternion.copy(surfaceRotation);
  group.add(rim);
  resources.push(tileTexture, medallionGeometry, medallionMaterial, rimGeometry);
  return group;
}

export interface BuiltEvidenceNodes {
  readonly group: Group;
  dispose(): void;
}

export function buildResearchEvidenceNodes(
  nodes: readonly ResearchWorldNode[],
  specimenCount: number,
  maximumAnisotropy: number,
): BuiltEvidenceNodes {
  const resources: (BufferGeometry | Material | Texture)[] = [];
  const group = new Group();
  let isActive = true;
  const rimMaterial = new MeshStandardMaterial({ color: 0x535e65, roughness: 0.76 });
  resources.push(rimMaterial);
  const selectedNodes = nodes
    .filter((node) => node.evidenceKind)
    .slice(0, specimenCount);
  const atlasTextures: Texture[] = [];
  const loadAtlas = (atlas: EvidenceAtlasTile['atlas'], path: string): void => {
    const atlasTexture = new TextureLoader().load(path, (loadedTexture) => {
      if (!isActive) {
        loadedTexture.dispose();
        return;
      }
      loadedTexture.colorSpace = SRGBColorSpace;
      loadedTexture.anisotropy = Math.min(maximumAnisotropy, 8);
      selectedNodes
        .filter(
          (node) =>
            node.evidenceKind && atlasTileByEvidence[node.evidenceKind].atlas === atlas,
        )
        .forEach((node) => {
          group.add(
            createEvidenceMedallion(node, loadedTexture, rimMaterial, resources),
          );
        });
    });
    atlasTextures.push(atlasTexture);
  };
  loadAtlas('primary', '/art/research-evidence-pencil-atlas.webp');
  loadAtlas('secondary', '/art/research-evidence-pencil-atlas-ii.webp');
  return {
    group,
    dispose: () => {
      isActive = false;
      resources.forEach((resource) => {
        resource.dispose();
      });
      atlasTextures.forEach((texture) => {
        texture.dispose();
      });
      group.clear();
    },
  };
}
