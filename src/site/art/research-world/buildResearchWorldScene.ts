/**
 * Composes the approved pencil-sculpture backdrop from real 3D spheres, paper
 * materials, semantic drafting lines, evidence medallions, and flat modernist
 * ribbons. One resource boundary owns disposal for the lazy decorative renderer.
 */
import {
  AmbientLight,
  Color,
  DirectionalLight,
  FogExp2,
  Group,
  PointLight,
  Scene,
  type BufferGeometry,
  type Material,
  type Texture,
} from 'three';
import { buildResearchConnections } from './buildResearchConnections';
import { buildResearchDrafting } from './buildResearchDrafting';
import { buildResearchEvidenceNodes } from './buildResearchEvidenceNodes';
import { buildResearchNodes } from './buildResearchNodes';
import { createResearchWorldModel } from './researchWorldModel';

export interface BuiltResearchWorld {
  readonly scene: Scene;
  update(elapsedSeconds: number): void;
  dispose(): void;
}

function addPencilPlateLights(scene: Scene): void {
  scene.add(new AmbientLight(0xdce8e8, 1.6));
  const paperKey = new DirectionalLight(0xfff8e8, 3.4);
  paperKey.position.set(-5, 10, 14);
  scene.add(paperKey);
  const cyanFill = new DirectionalLight(0x91e3e3, 1.15);
  cyanFill.position.set(11, 2, 9);
  scene.add(cyanFill);
  const coralReflection = new PointLight(0xff715c, 18, 20, 1.7);
  coralReflection.position.set(10, -3, 7);
  scene.add(coralReflection);
}

export function buildResearchWorldScene(
  nodeCount: number,
  specimenCount: number,
  maximumAnisotropy: number,
): BuiltResearchWorld {
  const resources: (BufferGeometry | Material | Texture)[] = [];
  const scene = new Scene();
  scene.background = new Color(0x06162b);
  scene.fog = new FogExp2(0x06162b, 0.009);
  addPencilPlateLights(scene);

  const model = createResearchWorldModel(nodeCount);
  const worldAssembly = new Group();
  worldAssembly.add(buildResearchDrafting(resources));
  worldAssembly.add(buildResearchConnections(model, resources));
  worldAssembly.add(buildResearchNodes(model.nodes, resources));
  const evidenceNodes = buildResearchEvidenceNodes(
    model.nodes,
    specimenCount,
    maximumAnisotropy,
  );
  worldAssembly.add(evidenceNodes.group);
  scene.add(worldAssembly);

  return {
    scene,
    update: (elapsedSeconds) => {
      // Movement stays below perceptual camera motion: the structure breathes in
      // place while page scroll never changes its framing or perspective.
      worldAssembly.position.y = Math.sin(elapsedSeconds * 0.16) * 0.025;
      worldAssembly.rotation.y = Math.sin(elapsedSeconds * 0.11) * 0.0025;
      worldAssembly.rotation.x = Math.cos(elapsedSeconds * 0.09) * 0.0015;
    },
    dispose: () => {
      evidenceNodes.dispose();
      resources.forEach((resource) => {
        resource.dispose();
      });
      worldAssembly.clear();
    },
  };
}
