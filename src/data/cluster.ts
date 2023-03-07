import { cluster, hierarchy } from 'd3-hierarchy';
import { DataComponent as DC } from '../runtime';

export type ClusterOptions = Omit<Record<string, any>, 'type'>;

export const hierarchyFunction = (layoutFunction) => (options) => {
  return (data) => {
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

    const nodes = [];
    root.each((node: any) => {
      node[x] = node.x;
      node[y] = node.y;
      node.name = node.data.name;

      nodes.push(node);
    });

    const edges = root.links();
    edges.forEach((edge) => {
      edge[x] = [edge.source[x], edge.target[x]];
      edge[y] = [edge.source[y], edge.target[y]];
    });

    return { nodes, edges };
  };
};

export const Cluster: DC<ClusterOptions> = (options) => {
  return hierarchyFunction(cluster)(options);
};

Cluster.props = {};
