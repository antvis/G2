import { graphlib } from '../../../src/lib';
import {
  ForceGraph,
  Tree,
  Sankey,
  Treemap,
  Pack,
  Chord,
} from '../../../src/mark';
import { Cluster, Arc } from '../../../src/data';

describe('graphlib', () => {
  it('graphlib() should returns expected graph components.', () => {
    expect(graphlib()).toEqual({
      'data.cluster': Cluster,
      'data.arc': Arc,
      'mark.forceGraph': ForceGraph,
      'mark.tree': Tree,
      'mark.sankey': Sankey,
      'mark.chord': Chord,
      'mark.treemap': Treemap,
      'mark.pack': Pack,
    });
  });
});
