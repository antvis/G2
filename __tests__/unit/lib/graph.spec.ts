import { graphlib } from '../../../src/lib';
import { ForceGraph, Tree } from '../../../src/mark';

describe('graphlib', () => {
  it('graphlib() should returns expected graph components.', () => {
    expect(graphlib()).toEqual({
      'mark.forceGraph': ForceGraph,
      'mark.tree': Tree,
    });
  });
});
