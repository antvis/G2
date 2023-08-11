import { ForceGraph, Tree } from '../mark';

export function graphlib() {
  return {
    'mark.forceGraph': ForceGraph,
    'mark.tree': Tree,
  } as const;
}
