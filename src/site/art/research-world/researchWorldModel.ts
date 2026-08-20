/**
 * Defines the authored argument embedded in the decorative research sculpture.
 * Positions create visual hierarchy only: node size and proximity never represent
 * confidence, demand, or importance. Explicit primary relationships prevent the
 * artwork from becoming a random nearest-neighbour graph.
 */
import { Euler, Vector3 } from 'three';
import { secondaryEvidenceNodes } from './researchWorldSecondaryEvidence';

export type ResearchEvidenceKind =
  | 'interview'
  | 'receipt'
  | 'product'
  | 'alternative'
  | 'price'
  | 'factory'
  | 'route'
  | 'transport'
  | 'economics'
  | 'risk'
  | 'competitor'
  | 'permit'
  | 'supplier'
  | 'customs'
  | 'inventory'
  | 'repair'
  | 'channel'
  | 'failure'
  | 'pilot';
export type ResearchNodeAccent = 'ivory' | 'cobalt' | 'cyan' | 'coral' | 'amber';
export type ResearchConnectionKind =
  'observed' | 'corroborated' | 'assumption' | 'constraint';

export interface ResearchWorldNode {
  readonly position: Vector3;
  readonly rotation: Euler;
  readonly scale: number;
  readonly accent: ResearchNodeAccent;
  readonly evidenceKind?: ResearchEvidenceKind;
  readonly evidenceScale?: number;
  readonly evidenceOffset?: readonly [number, number];
  readonly isUnknown?: boolean;
}

export interface ResearchWorldConnection {
  readonly from: number;
  readonly to: number;
  readonly kind: ResearchConnectionKind;
}

export interface ResearchWorldModel {
  readonly nodes: readonly ResearchWorldNode[];
  readonly connections: readonly ResearchWorldConnection[];
}

const primaryNodes: readonly ResearchWorldNode[] = [
  {
    position: new Vector3(4.1, 1.1, 0),
    rotation: new Euler(0.08, -0.28, 0.04),
    scale: 3.1,
    accent: 'cobalt',
  },
  {
    position: new Vector3(-0.15, 4.7, -0.4),
    rotation: new Euler(0, 0.18, -0.05),
    scale: 1.55,
    accent: 'cobalt',
    evidenceKind: 'interview',
  },
  {
    position: new Vector3(-0.55, 1.8, 0.5),
    rotation: new Euler(0, -0.1, 0.04),
    scale: 1.08,
    accent: 'cyan',
    evidenceKind: 'receipt',
  },
  {
    position: new Vector3(-1.65, -1.15, -0.3),
    rotation: new Euler(0.08, 0.2, -0.08),
    scale: 1.35,
    accent: 'cyan',
    evidenceKind: 'product',
  },
  {
    position: new Vector3(1.45, -1.05, 1.15),
    rotation: new Euler(-0.05, -0.18, 0.04),
    scale: 1.08,
    accent: 'cyan',
    evidenceKind: 'alternative',
  },
  {
    position: new Vector3(5.1, -1.7, -0.35),
    rotation: new Euler(0.05, 0.16, 0),
    scale: 1.25,
    accent: 'amber',
    evidenceKind: 'factory',
  },
  {
    position: new Vector3(9.25, 0.7, 0.65),
    rotation: new Euler(0, -0.22, 0.03),
    scale: 1.72,
    accent: 'cyan',
    evidenceKind: 'route',
  },
  {
    position: new Vector3(3.75, -3.75, 0.9),
    rotation: new Euler(-0.06, 0.1, 0.02),
    scale: 1.27,
    accent: 'cyan',
    evidenceKind: 'transport',
  },
  {
    position: new Vector3(8.1, -3.85, 0.7),
    rotation: new Euler(0.04, -0.16, 0.06),
    scale: 2.15,
    accent: 'amber',
    evidenceKind: 'economics',
  },
  {
    position: new Vector3(-0.45, -4.25, -0.2),
    rotation: new Euler(0, 0.25, 0),
    scale: 1.17,
    accent: 'coral',
    evidenceKind: 'risk',
  },
  {
    position: new Vector3(6.55, 4.75, 0.3),
    rotation: new Euler(0.08, -0.12, 0),
    scale: 1.42,
    accent: 'coral',
    evidenceKind: 'price',
  },
  {
    position: new Vector3(10.35, -1.95, -1.1),
    rotation: new Euler(0, 0, 0),
    scale: 0.78,
    accent: 'ivory',
    isUnknown: true,
  },
  ...secondaryEvidenceNodes,
] as const;

const supportCenters = [
  new Vector3(-3.2, 2.8, -2.4),
  new Vector3(1.4, -1.4, -3.2),
  new Vector3(6.3, 2.7, -2.8),
  new Vector3(10.7, -1.6, -3.6),
] as const;

function nextSeed(seedState: { value: number }): number {
  seedState.value = (seedState.value * 1_664_525 + 1_013_904_223) >>> 0;
  return seedState.value / 4_294_967_296;
}

function createSupportNodes(supportCount: number): ResearchWorldNode[] {
  const seedState = { value: 2_026_081_9 };
  return Array.from({ length: supportCount }, (_unused, supportIndex) => {
    const center =
      supportCenters[supportIndex % supportCenters.length] ?? supportCenters[0];
    const angle = nextSeed(seedState) * Math.PI * 2;
    const radius = 2.4 + nextSeed(seedState) * 4.8;
    return {
      position: new Vector3(
        center.x + Math.cos(angle) * radius,
        center.y + Math.sin(angle) * radius * 0.78,
        center.z + (nextSeed(seedState) - 0.5) * 7.6,
      ),
      rotation: new Euler(
        nextSeed(seedState),
        nextSeed(seedState),
        nextSeed(seedState),
      ),
      scale: 0.16 + Math.pow(nextSeed(seedState), 1.9) * 0.62,
      accent:
        supportIndex % 13 === 0 ? 'coral' : supportIndex % 9 === 0 ? 'cyan' : 'ivory',
      isUnknown: supportIndex === 17,
    };
  });
}

const primaryConnections: readonly ResearchWorldConnection[] = [
  { from: 1, to: 2, kind: 'corroborated' },
  { from: 2, to: 3, kind: 'observed' },
  { from: 3, to: 4, kind: 'corroborated' },
  { from: 4, to: 10, kind: 'observed' },
  { from: 3, to: 5, kind: 'assumption' },
  { from: 5, to: 6, kind: 'corroborated' },
  { from: 5, to: 7, kind: 'observed' },
  { from: 6, to: 8, kind: 'observed' },
  { from: 7, to: 8, kind: 'corroborated' },
  { from: 10, to: 8, kind: 'assumption' },
  { from: 9, to: 7, kind: 'constraint' },
  { from: 9, to: 8, kind: 'constraint' },
  { from: 8, to: 11, kind: 'assumption' },
  { from: 1, to: 0, kind: 'observed' },
  { from: 4, to: 0, kind: 'observed' },
  { from: 6, to: 0, kind: 'observed' },
  { from: 12, to: 10, kind: 'corroborated' },
  { from: 13, to: 6, kind: 'constraint' },
  { from: 14, to: 5, kind: 'observed' },
  { from: 15, to: 6, kind: 'observed' },
  { from: 16, to: 8, kind: 'assumption' },
  { from: 17, to: 9, kind: 'corroborated' },
  { from: 18, to: 12, kind: 'observed' },
  { from: 19, to: 9, kind: 'constraint' },
  { from: 20, to: 11, kind: 'assumption' },
  { from: 14, to: 16, kind: 'corroborated' },
  { from: 15, to: 18, kind: 'observed' },
] as const;

function addSupportConnections(
  nodes: readonly ResearchWorldNode[],
): ResearchWorldConnection[] {
  return nodes.slice(primaryNodes.length).map((node, supportOffset) => {
    const from = primaryNodes.length + supportOffset;
    const nearest = nodes
      .map((candidate, candidateIndex) => ({
        candidateIndex,
        distance: node.position.distanceTo(candidate.position),
      }))
      .filter(({ candidateIndex }) => candidateIndex < from)
      .sort((first, second) => first.distance - second.distance)[0];
    return {
      from,
      to: nearest?.candidateIndex ?? 0,
      kind: supportOffset % 7 === 0 ? 'assumption' : 'observed',
    };
  });
}

export function createResearchWorldModel(nodeCount: number): ResearchWorldModel {
  const requestedCount = Math.max(primaryNodes.length, nodeCount);
  const nodes = [
    ...primaryNodes,
    ...createSupportNodes(requestedCount - primaryNodes.length),
  ];
  return {
    nodes,
    connections: [...primaryConnections, ...addSupportConnections(nodes)],
  };
}
