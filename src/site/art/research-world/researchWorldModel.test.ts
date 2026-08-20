/**
 * Protects the semantic grammar beneath the decorative Three.js sculpture. A random
 * graph could look attractive while falsely implying that evidence naturally converges;
 * these tests cover the authored argument without coupling to renderer implementation.
 */
import { describe, expect, it } from 'vitest';
import { createResearchWorldModel } from './researchWorldModel';

describe('research-world model', () => {
  it('recreates the same abundant spatial composition for every render', () => {
    const firstModel = createResearchWorldModel(48);
    const secondModel = createResearchWorldModel(48);

    expect(firstModel.nodes).toHaveLength(48);
    expect(firstModel.nodes.map((node) => node.position.toArray())).toEqual(
      secondModel.nodes.map((node) => node.position.toArray()),
    );
    expect(firstModel.connections).toEqual(secondModel.connections);
  });

  it('connects research categories through assumptions and explicit stopping evidence', () => {
    const model = createResearchWorldModel(48);
    const evidenceKinds = model.nodes.flatMap((node) =>
      node.evidenceKind ? [node.evidenceKind] : [],
    );
    const constraintConnections = model.connections.filter(
      (connection) => connection.kind === 'constraint',
    );

    expect(evidenceKinds).toEqual([
      'interview',
      'receipt',
      'product',
      'alternative',
      'factory',
      'route',
      'transport',
      'economics',
      'risk',
      'price',
      'competitor',
      'permit',
      'supplier',
      'customs',
      'inventory',
      'repair',
      'channel',
      'failure',
      'pilot',
    ]);
    expect(
      model.connections.some((connection) => connection.kind === 'assumption'),
    ).toBe(true);
    expect(constraintConnections).toEqual([
      { from: 9, to: 7, kind: 'constraint' },
      { from: 9, to: 8, kind: 'constraint' },
      { from: 13, to: 6, kind: 'constraint' },
      { from: 19, to: 9, kind: 'constraint' },
    ]);
    expect(model.nodes.some((node) => node.isUnknown)).toBe(true);
  });
});
