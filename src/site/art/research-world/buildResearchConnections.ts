/**
 * Renders the research argument as drafting strokes rather than structural pipes.
 * Paired, single, dashed, and interrupted lines have a stable visual grammar, while
 * their placement remains decorative and carries no quantitative meaning.
 */
import {
  BoxGeometry,
  BufferGeometry,
  Float32BufferAttribute,
  Group,
  LineBasicMaterial,
  LineDashedMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  Vector3,
  type Material,
  type Texture,
} from 'three';
import type {
  ResearchConnectionKind,
  ResearchWorldConnection,
  ResearchWorldModel,
} from './researchWorldModel';

const connectionDirection = new Vector3();
const connectionStart = new Vector3();
const connectionEnd = new Vector3();
const connectionOffset = new Vector3();

function appendConnectionPositions(
  positions: number[],
  model: ResearchWorldModel,
  connection: ResearchWorldConnection,
): void {
  const fromNode = model.nodes[connection.from];
  const toNode = model.nodes[connection.to];
  if (!fromNode || !toNode) return;
  connectionDirection.subVectors(toNode.position, fromNode.position).normalize();
  connectionStart
    .copy(fromNode.position)
    .addScaledVector(connectionDirection, fromNode.scale * 0.88);
  connectionEnd
    .copy(toNode.position)
    .addScaledVector(connectionDirection, -toNode.scale * 0.88);
  if (connection.kind !== 'corroborated') {
    positions.push(...connectionStart.toArray(), ...connectionEnd.toArray());
    return;
  }
  connectionOffset
    .set(-connectionDirection.y, connectionDirection.x, 0)
    .normalize()
    .multiplyScalar(0.055);
  positions.push(
    ...connectionStart.clone().add(connectionOffset).toArray(),
    ...connectionEnd.clone().add(connectionOffset).toArray(),
    ...connectionStart.clone().sub(connectionOffset).toArray(),
    ...connectionEnd.clone().sub(connectionOffset).toArray(),
  );
}

function createConnectionLines(
  model: ResearchWorldModel,
  kind: ResearchConnectionKind,
  resources: (BufferGeometry | Material | Texture)[],
): LineSegments {
  const positions: number[] = [];
  model.connections
    .filter((connection) => connection.kind === kind)
    .forEach((connection) => {
      appendConnectionPositions(positions, model, connection);
    });
  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
  const material =
    kind === 'assumption'
      ? new LineDashedMaterial({
          color: 0xb7b3aa,
          dashSize: 0.18,
          gapSize: 0.12,
          transparent: true,
          opacity: 0.62,
        })
      : new LineBasicMaterial({
          color: kind === 'constraint' ? 0xe75347 : 0xd5d4cd,
          transparent: true,
          opacity: kind === 'observed' ? 0.5 : 0.8,
        });
  const lines = new LineSegments(geometry, material);
  if (kind === 'assumption') lines.computeLineDistances();
  resources.push(geometry, material);
  return lines;
}

function createConstraintBars(
  model: ResearchWorldModel,
  resources: (BufferGeometry | Material | Texture)[],
): Group {
  const group = new Group();
  const geometry = new BoxGeometry(0.12, 0.58, 0.08);
  const material = new MeshBasicMaterial({ color: 0xe75347 });
  model.connections
    .filter((connection) => connection.kind === 'constraint')
    .forEach((connection) => {
      const fromNode = model.nodes[connection.from];
      const toNode = model.nodes[connection.to];
      if (!fromNode || !toNode) return;
      const bar = new Mesh(geometry, material);
      bar.position.addVectors(fromNode.position, toNode.position).multiplyScalar(0.5);
      bar.position.z += 0.08;
      bar.rotation.z = Math.atan2(
        toNode.position.y - fromNode.position.y,
        toNode.position.x - fromNode.position.x,
      );
      group.add(bar);
    });
  resources.push(geometry, material);
  return group;
}

export function buildResearchConnections(
  model: ResearchWorldModel,
  resources: (BufferGeometry | Material | Texture)[],
): Group {
  const group = new Group();
  (['observed', 'corroborated', 'assumption', 'constraint'] as const).forEach(
    (connectionKind) =>
      group.add(createConnectionLines(model, connectionKind, resources)),
  );
  group.add(createConstraintBars(model, resources));
  return group;
}
