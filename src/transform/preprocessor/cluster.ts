import { cluster, hierarchy } from 'd3-hierarchy';
import { TransformComponent as TC } from '../../runtime';
import { ClusterTransform } from '../../spec';
import { merge } from '../utils/helper';

export type ClusterOptions = Omit<ClusterTransform, 'type'>;

export const hierarchyFunction = (layoutFunction) => (options) => {
  return merge(({ data }) => {
    const {
      field = 'value',
      nodeSize,
      separation,
      sortBy,
      as = ['x', 'y'],
    } = options;
    const [x, y] = as;

    // Process root data.
    const root = hierarchy(data, (d) => d.children)
      .sum((d) => d[field!])
      .sort(sortBy);

    // Layout
    const c = layoutFunction();
    c.size([1, 1]);
    if (nodeSize) c.nodeSize(nodeSize);
    if (separation) c.separation(separation);
    c(root);

    root.each((node: any) => {
      node[x] = node.x;
      node[y] = node.y;
    });

    return {
      data: root,
    };
  });
};

export const Cluster: TC<ClusterOptions> = hierarchyFunction(cluster);

Cluster.props = {
  category: 'preprocessor',
};
