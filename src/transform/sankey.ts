import { TransformComponent as TC } from '../runtime';
import { SankeyTransform } from '../spec';
import { useMemoTransform } from './utils';
import { sankey, left, right, center, justify } from './d3-sankey';

export type SankeyOptions = Omit<SankeyTransform, 'type'>;

/**
 * 默认值
 */
const DEFAULT_OPTIONS: Partial<SankeyOptions> = {
  nodeAlign: 'justify',
  nodeWidth: 0.008,
  nodePadding: 0.03,
  nodeSort: undefined,
};

/**
 * Compute the node and edge position, return a graph representing the Sankey layout
 * Required graph data (nodes, edges)
 */
export const Sankey: TC<SankeyOptions> = (options) => {
  const { nodeId, nodeSort, nodeAlign, nodeWidth, nodePadding, nodeDepth } =
    Object.assign({}, DEFAULT_OPTIONS, options);

  return useMemoTransform(
    (data) => {
      const sankeyProcessor = sankey()
        .nodeSort(nodeSort)
        .links((d: any) => d.edges)
        // .nodes((d: any) => d.nodes)
        .nodeWidth(nodeWidth)
        .nodePadding(nodePadding)
        .nodeDepth(nodeDepth)
        .nodeAlign(getNodeAlignFunction(nodeAlign))
        .extent([
          [0, 0],
          [1, 1],
        ]);

      if (typeof nodeId === 'function') {
        sankeyProcessor.nodeId(nodeId);
      }

      // 进行桑基图布局处理
      const layoutData = sankeyProcessor(data);

      // post process (x, y), etc.
      layoutData.nodes.forEach((node) => {
        const { x0, x1, y0, y1 } = node;
        /* points
         * 3---2
         * |   |
         * 0---1
         */
        node.x = [x0, x1, x1, x0];
        node.y = [y0, y0, y1, y1];
      });

      layoutData.links.forEach((edge) => {
        const { source, target } = edge;
        const sx = source.x1;
        const tx = target.x0;
        edge.x = [sx, sx, tx, tx];
        const offset = edge.width / 2;
        edge.y = [
          edge.y0 + offset,
          edge.y0 - offset,
          edge.y1 + offset,
          edge.y1 - offset,
        ];
      });

      return {
        nodes: layoutData.nodes,
        edges: layoutData.links,
      };
    },
    [options],
  );
};

const ALIGN_METHOD = {
  left,
  right,
  center,
  justify,
};

function getNodeAlignFunction(nodeAlign: SankeyOptions['nodeAlign']) {
  const func =
    typeof nodeAlign === 'string'
      ? ALIGN_METHOD[nodeAlign]
      : typeof nodeAlign === 'function'
      ? nodeAlign
      : null;

  return func || justify;
}

Sankey.props = {};
