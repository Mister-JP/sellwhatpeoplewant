/**
 * Adds the flat modernist ribbons and faint construction geometry visible in the
 * approved art direction. These sit behind the spherical argument and create the
 * intentional tension between a two-dimensional print and a spatial 3D scene.
 */
import {
  BufferGeometry,
  DoubleSide,
  EllipseCurve,
  Float32BufferAttribute,
  Group,
  Line,
  LineBasicMaterial,
  Mesh,
  MeshBasicMaterial,
  Vector3,
  type Material,
  type Texture,
} from 'three';

interface RibbonDefinition {
  readonly start: readonly [number, number];
  readonly end: readonly [number, number];
  readonly startWidth: number;
  readonly endWidth: number;
  readonly color: number;
  readonly depth: number;
}

const ribbons: readonly RibbonDefinition[] = [
  {
    start: [-1.8, 3.1],
    end: [11.8, -1.1],
    startWidth: 0.12,
    endWidth: 0.55,
    color: 0x46aeb5,
    depth: -2.3,
  },
  {
    start: [0.4, -5.6],
    end: [12.6, -2.1],
    startWidth: 0.28,
    endWidth: 1.15,
    color: 0x1748a5,
    depth: -2.8,
  },
  {
    start: [5.3, -5.8],
    end: [14.8, -3.5],
    startWidth: 0.12,
    endWidth: 0.42,
    color: 0xe65547,
    depth: -2.2,
  },
  {
    start: [3.4, -5.8],
    end: [7.2, -1.1],
    startWidth: 0.08,
    endWidth: 0.32,
    color: 0xdca02e,
    depth: -2.4,
  },
  {
    start: [6.7, 3.8],
    end: [15.3, 5.4],
    startWidth: 0.46,
    endWidth: 0.14,
    color: 0xe65547,
    depth: -2.6,
  },
  {
    start: [2.5, 5.8],
    end: [4.4, -5.7],
    startWidth: 0.11,
    endWidth: 0.31,
    color: 0x62bdbe,
    depth: -3.1,
  },
  {
    start: [-8.6, -4.9],
    end: [9.8, 1.7],
    startWidth: 0.08,
    endWidth: 0.28,
    color: 0x1648a6,
    depth: -3.4,
  },
  {
    start: [-7.4, 5.6],
    end: [7.6, -4.8],
    startWidth: 0.04,
    endWidth: 0.19,
    color: 0x4cafb5,
    depth: -3.5,
  },
  {
    start: [1.2, 6.5],
    end: [15.2, 2.1],
    startWidth: 0.08,
    endWidth: 0.25,
    color: 0xe65547,
    depth: -3.3,
  },
  {
    start: [-5.8, -6.2],
    end: [2.2, 4.9],
    startWidth: 0.04,
    endWidth: 0.16,
    color: 0xdca02e,
    depth: -3.7,
  },
  {
    start: [-7.2, 1.4],
    end: [13.8, 4.1],
    startWidth: 0.035,
    endWidth: 0.13,
    color: 0xe8e5dc,
    depth: -3.8,
  },
  {
    start: [8.1, -6.2],
    end: [14.6, 0.1],
    startWidth: 0.36,
    endWidth: 0.08,
    color: 0x46aeb5,
    depth: -3,
  },
  {
    start: [10.4, -5.9],
    end: [13.8, 2.4],
    startWidth: 0.09,
    endWidth: 0.29,
    color: 0xdca02e,
    depth: -3.2,
  },
] as const;

function createRibbon(
  definition: RibbonDefinition,
  resources: (BufferGeometry | Material | Texture)[],
): Mesh {
  const [startX, startY] = definition.start;
  const [endX, endY] = definition.end;
  const direction = new Vector3(endX - startX, endY - startY, 0).normalize();
  const startNormalX = -direction.y * definition.startWidth;
  const startNormalY = direction.x * definition.startWidth;
  const endNormalX = -direction.y * definition.endWidth;
  const endNormalY = direction.x * definition.endWidth;
  const geometry = new BufferGeometry();
  geometry.setAttribute(
    'position',
    new Float32BufferAttribute(
      [
        startX + startNormalX,
        startY + startNormalY,
        definition.depth,
        startX - startNormalX,
        startY - startNormalY,
        definition.depth,
        endX - endNormalX,
        endY - endNormalY,
        definition.depth,
        endX + endNormalX,
        endY + endNormalY,
        definition.depth,
      ],
      3,
    ),
  );
  geometry.setIndex([0, 1, 2, 0, 2, 3]);
  const material = new MeshBasicMaterial({
    color: definition.color,
    side: DoubleSide,
    transparent: true,
    opacity: 0.9,
  });
  resources.push(geometry, material);
  return new Mesh(geometry, material);
}

function createConstructionArc(
  centerX: number,
  centerY: number,
  radiusX: number,
  radiusY: number,
  rotation: number,
  material: LineBasicMaterial,
  resources: (BufferGeometry | Material | Texture)[],
): Line {
  const curve = new EllipseCurve(
    centerX,
    centerY,
    radiusX,
    radiusY,
    -0.35,
    Math.PI * 1.62,
    false,
    rotation,
  );
  const points = curve
    .getPoints(84)
    .map((point) => new Vector3(point.x, point.y, -3.6));
  const geometry = new BufferGeometry().setFromPoints(points);
  resources.push(geometry);
  return new Line(geometry, material);
}

function createConstructionGeometry(
  resources: (BufferGeometry | Material | Texture)[],
): Group {
  const group = new Group();
  const material = new LineBasicMaterial({
    color: 0xb7c3c7,
    transparent: true,
    opacity: 0.18,
  });
  resources.push(material);
  const arcs = [
    [-2.5, 0.2, 4.8, 2.7, 0.12],
    [2.8, 1.4, 5.4, 4.2, -0.3],
    [6.4, -0.1, 5.8, 3.4, 0.42],
    [8.1, 2.4, 4.4, 2.2, -0.52],
    [4.5, -3.7, 5.3, 1.7, 0.08],
  ] as const;
  arcs.forEach(([centerX, centerY, radiusX, radiusY, rotation]) =>
    group.add(
      createConstructionArc(
        centerX,
        centerY,
        radiusX,
        radiusY,
        rotation,
        material,
        resources,
      ),
    ),
  );
  return group;
}

export function buildResearchDrafting(
  resources: (BufferGeometry | Material | Texture)[],
): Group {
  const group = new Group();
  ribbons.forEach((ribbon) => group.add(createRibbon(ribbon, resources)));
  group.add(createConstructionGeometry(resources));
  return group;
}
