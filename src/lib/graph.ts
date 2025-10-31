import {
  Sankey,
  Treemap,
  Pack,
  ForceGraph,
  Tree,
  Chord,
  Hierarchy,
} from '../mark';
import { Arc, Cluster } from '../data';

export function graphlib() {
  return {
    'data.arc': Arc,
    'data.cluster': Cluster,
    'mark.forceGraph': ForceGraph,
    'mark.tree': Tree,
    'mark.pack': Pack,
    'mark.sankey': Sankey,
    'mark.chord': Chord,
    'mark.treemap': Treemap,
    'mark.hierarchy': Hierarchy,
  } as const;
}
