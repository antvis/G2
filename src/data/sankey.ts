import { DataComponent as DC } from '../runtime';
import { sankey, left, right, center, justify } from './utils/d3-sankey';

const DEFAULT_OPTIONS: Partial<SankeyOptions> = {
  nodeAlign: 'justify',
  nodeWidth: 0.008,
  nodePadding: 0.03,
  nodes: (graph) => graph.nodes,
  links: (graph) => graph.links,
  nodeSort: undefined,
  linkSort: undefined,
  iterations: 6,
};

const ALIGN_METHOD = {
  left,
  right,
  center,
  justify,
};

function getNodeAlignFunction(nodeAlign: SankeyOptions['nodeAlign']) {
  const type = typeof nodeAlign;
  if (type === 'string') return ALIGN_METHOD[nodeAlign as string] || justify;
  if (type === 'function') return nodeAlign;
  return justify;
}

export type SankeyOptions = Omit<Record<string, any>, 'type'>;

/**
 * Compute the node and edge position, return a graph representing the Sankey layout. All will be normalized to [[0, 0], [1, 1]]
 * Required graph data (nodes, edges)
 */
export const Sankey: DC<SankeyOptions> = (options) => {
  return (data) => {
    const {
      nodeId,
      nodeSort,
      nodeAlign,
      nodeWidth,
      nodePadding,
      nodeDepth,
      nodes: nodeNodes,
      links: nodeLinks,
      linkSort,
      iterations,
    } = Object.assign({}, DEFAULT_OPTIONS, options);

    const sankeyProcessor = sankey()
      .nodeSort(nodeSort)
      .linkSort(linkSort)
      .links(nodeLinks)
      .nodes(nodeNodes)
      .nodeWidth(nodeWidth)
      .nodePadding(nodePadding)
      .nodeDepth(nodeDepth)
      .nodeAlign(getNodeAlignFunction(nodeAlign))
      .iterations(iterations)
      .extent([
        [0, 0],
        [1, 1],
      ]);

    if (typeof nodeId === 'function') {
      sankeyProcessor.nodeId(nodeId);
    }

    const layoutData = sankeyProcessor(data);

    const { nodes: N, links: L } = layoutData;
    const nodes = N.map((node) => {
      const { x0, x1, y0, y1 } = node;
      /* points
       * 3---2
       * |   |
       * 0---1
       */
      return { ...node, x: [x0, x1, x1, x0], y: [y0, y0, y1, y1] };
    });
    const links = L.map((edge) => {
      const { source, target } = edge;
      const sx = source.x1;
      const tx = target.x0;
      const offset = edge.width / 2;
      return {
        ...edge,
        x: [sx, sx, tx, tx],
        y: [
          edge.y0 + offset,
          edge.y0 - offset,
          edge.y1 + offset,
          edge.y1 - offset,
        ],
      };
    });
    return { nodes, links };
  };
};

Sankey.props = {};
