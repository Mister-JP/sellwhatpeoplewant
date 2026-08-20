/**
 * Builds the ivory spherical sculpture and its restrained modernist color insets.
 * The paper texture and wire overlay intentionally make real 3D geometry read like
 * a graphite engineering plate instead of a polished molecular visualization.
 */
import {
  BackSide,
  CanvasTexture,
  CircleGeometry,
  DoubleSide,
  Group,
  InstancedMesh,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  Object3D,
  RepeatWrapping,
  SphereGeometry,
  SRGBColorSpace,
  TorusGeometry,
  type BufferGeometry,
  type Material,
  type Texture,
} from 'three';
import type { ResearchNodeAccent, ResearchWorldNode } from './researchWorldModel';

const accentColors: Record<ResearchNodeAccent, number> = {
  ivory: 0xf3f0e8,
  cobalt: 0x1646a2,
  cyan: 0x48aeb4,
  coral: 0xe55345,
  amber: 0xd89a2b,
};

function createPencilPaperTexture(): CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const context = canvas.getContext('2d');
  if (!context) throw new Error('The research sculpture requires a 2D canvas context.');
  context.fillStyle = '#f0ede5';
  context.fillRect(0, 0, 256, 256);
  context.strokeStyle = 'rgba(38, 50, 58, 0.16)';
  context.lineWidth = 0.7;
  for (let hatchOffset = -256; hatchOffset < 512; hatchOffset += 11) {
    context.beginPath();
    context.moveTo(hatchOffset, 0);
    context.lineTo(hatchOffset - 256, 256);
    context.stroke();
  }
  context.strokeStyle = 'rgba(255, 255, 255, 0.22)';
  for (let fiberOffset = 3; fiberOffset < 256; fiberOffset += 17) {
    context.beginPath();
    context.moveTo(0, fiberOffset);
    context.bezierCurveTo(60, fiberOffset + 2, 190, fiberOffset - 3, 256, fiberOffset);
    context.stroke();
  }
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.repeat.set(2.6, 1.8);
  return texture;
}

function setNodeTransform(
  mesh: InstancedMesh,
  nodes: readonly ResearchWorldNode[],
  scaleMultiplier = 1,
): void {
  const transform = new Object3D();
  nodes.forEach((node, nodeIndex) => {
    transform.position.copy(node.position);
    transform.rotation.copy(node.rotation);
    transform.scale.setScalar(node.scale * scaleMultiplier);
    transform.updateMatrix();
    mesh.setMatrixAt(nodeIndex, transform.matrix);
  });
  mesh.instanceMatrix.needsUpdate = true;
}

function createSphereBatches(
  nodes: readonly ResearchWorldNode[],
  paperTexture: Texture,
  resources: (BufferGeometry | Material | Texture)[],
): readonly InstancedMesh[] {
  const sphereNodes = nodes.filter((node) => !node.isUnknown);
  const sphereGeometry = new SphereGeometry(1, 32, 22);
  const paperMaterial = new MeshStandardMaterial({
    color: 0xf3f0e8,
    map: paperTexture,
    roughness: 0.82,
    metalness: 0.02,
  });
  const wireMaterial = new MeshBasicMaterial({
    color: 0x3b4650,
    wireframe: true,
    transparent: true,
    opacity: 0.055,
    depthWrite: false,
  });
  const outlineMaterial = new MeshBasicMaterial({
    color: 0x313b43,
    side: BackSide,
    transparent: true,
    opacity: 0.72,
  });
  const paperSpheres = new InstancedMesh(
    sphereGeometry,
    paperMaterial,
    sphereNodes.length,
  );
  const pencilWire = new InstancedMesh(
    sphereGeometry,
    wireMaterial,
    sphereNodes.length,
  );
  const pencilOutlines = new InstancedMesh(
    sphereGeometry,
    outlineMaterial,
    sphereNodes.length,
  );
  setNodeTransform(paperSpheres, sphereNodes);
  setNodeTransform(pencilWire, sphereNodes);
  setNodeTransform(pencilOutlines, sphereNodes, 1.018);
  resources.push(sphereGeometry, paperMaterial, wireMaterial, outlineMaterial);
  return [pencilOutlines, paperSpheres, pencilWire];
}

function createUnknownRings(
  nodes: readonly ResearchWorldNode[],
  resources: (BufferGeometry | Material | Texture)[],
): InstancedMesh {
  const unknownNodes = nodes.filter((node) => node.isUnknown);
  const geometry = new TorusGeometry(0.74, 0.085, 8, 42);
  const material = new MeshStandardMaterial({
    color: 0xe8e5dc,
    roughness: 0.8,
    metalness: 0.02,
  });
  const rings = new InstancedMesh(geometry, material, unknownNodes.length);
  setNodeTransform(rings, unknownNodes);
  resources.push(geometry, material);
  return rings;
}

function createColorInsets(
  nodes: readonly ResearchWorldNode[],
  resources: (BufferGeometry | Material | Texture)[],
): Group {
  const group = new Group();
  const materials = new Map<ResearchNodeAccent, MeshStandardMaterial>();
  nodes.forEach((node, nodeIndex) => {
    if (node.accent === 'ivory' || node.isUnknown) return;
    let material = materials.get(node.accent);
    if (!material) {
      material = new MeshStandardMaterial({
        color: accentColors[node.accent],
        roughness: 0.72,
        metalness: 0,
        side: DoubleSide,
      });
      materials.set(node.accent, material);
      resources.push(material);
    }
    const geometry = new CircleGeometry(0.62, 32, 3.45 + (nodeIndex % 3) * 0.18, 1.24);
    const inset = new Mesh(geometry, material);
    inset.position.copy(node.position);
    inset.position.z += node.scale * 1.006;
    inset.rotation.z = node.rotation.z;
    inset.scale.setScalar(node.scale);
    group.add(inset);
    resources.push(geometry);
  });
  return group;
}

export function buildResearchNodes(
  nodes: readonly ResearchWorldNode[],
  resources: (BufferGeometry | Material | Texture)[],
): Group {
  const group = new Group();
  const paperTexture = createPencilPaperTexture();
  resources.push(paperTexture);
  createSphereBatches(nodes, paperTexture, resources).forEach((sphereBatch) =>
    group.add(sphereBatch),
  );
  group.add(createUnknownRings(nodes, resources));
  group.add(createColorInsets(nodes, resources));
  return group;
}
