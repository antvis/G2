import { tree, hierarchy } from 'd3-hierarchy';
import { TransformComponent as TC } from '../../runtime';
import { TreeTransform } from '../../spec';
import { merge } from '../utils/helper';

export type TreeOptions = Omit<TreeTransform, 'type'>;

export const Tree: TC<TreeOptions> = (options) => {
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
    const c = tree();
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

Tree.props = {
  category: 'preprocessor',
};
