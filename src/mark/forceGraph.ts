import {
  forceSimulation,
  forceManyBody,
  forceLink,
  forceX,
  forceY,
  forceCenter,
} from 'd3-force';
import { deepMix } from '@antv/util';
import { subObject } from '../utils/helper';
import { CompositionComponent as CC } from '../runtime';
import { ForceGraphMark } from '../spec';
import { field, initializeData } from './utils';

export type ForceGraphOptions = Omit<ForceGraphMark, 'type'>;

type ForceLayout = {
  /** Connect all nodes. */
  joint?: boolean;
  /** Gravity coefficient between nodes. */
  nodeStrength?: number | ((d: any) => number);
  /** Gravity coefficient between links. */
  linkStrength?: number | ((d: any) => number);
};

function dataTransform(data, layout, encode) {
  const { nodes, links } = data;
  const { joint, nodeStrength, linkStrength } = layout;
  const { nodeKey = (d) => d.id, linkKey = (d) => d.id } = encode;
  const nodeForce = forceManyBody();
  const linkForce = forceLink(links).id(field(linkKey));
  typeof nodeStrength === 'function' && nodeForce.strength(nodeStrength);
  typeof linkStrength === 'function' && linkForce.strength(linkStrength);
  const simulation = forceSimulation(nodes)
    .force('link', linkForce)
    .force('charge', nodeForce);
  joint
    ? simulation.force('center', forceCenter())
    : simulation.force('x', forceX()).force('y', forceY());
  simulation.stop();
  const n = Math.ceil(
    Math.log(simulation.alphaMin()) / Math.log(1 - simulation.alphaDecay()),
  );
  for (let i = 0; i < n; i++) simulation.tick();
  return {
    nodesData: nodes,
    linksData: links,
  };
}

export const ForceGraph: CC<ForceGraphOptions> = (options) => {
  return () => {
    const DEFAULT_LAYOUT_OPTIONS: ForceLayout = {
      joint: true,
    };
    const DEFAULT_LINK_OPTIONS = {
      type: 'link',
      axis: false,
      legend: false,
      encode: {
        x: [(d) => d.source.x, (d) => d.target.x],
        y: [(d) => d.source.y, (d) => d.target.y],
      },
      style: {
        stroke: '#999',
        strokeOpacity: 0.6,
      },
    };
    const DEFAULT_NODE_OPTIONS = {
      type: 'point',
      axis: false,
      legend: false,
      encode: {
        x: 'x',
        y: 'y',
        size: 5,
        color: 'group',
        shape: 'point',
      },
      scale: {
        color: { type: 'ordinal' },
      },
      style: {
        stroke: '#fff',
      },
    };
    const DEFAULT_LABEL_OPTIONS = {
      text: '',
    };
    const {
      data,
      encode = {},
      scale,
      style = {},
      layout = {},
      nodeLabels = [],
      linkLabels = [],
      animate = {},
    } = options;
    const nodeEncode = subObject(encode, 'node');
    const linkEncode = subObject(encode, 'link');
    const { links, nodes } = initializeData(data, encode);
    const { nodesData, linksData } = dataTransform(
      { links, nodes },
      deepMix({}, DEFAULT_LAYOUT_OPTIONS, layout),
      encode,
    );
    return [
      deepMix({}, DEFAULT_LINK_OPTIONS, {
        data: linksData,
        encode: linkEncode,
        labels: linkLabels,
        style: subObject(style, 'link'),
        animate:
          typeof animate === 'object' ? subObject(animate, 'link') : animate,
      }),
      deepMix({}, DEFAULT_NODE_OPTIONS, {
        data: nodesData,
        encode: { ...nodeEncode },
        scale,
        style: subObject(style, 'node'),
        labels: [
          { ...DEFAULT_LABEL_OPTIONS, ...subObject(style, 'label') },
          ...nodeLabels,
        ],
        animate:
          typeof animate === 'object' ? subObject(animate, 'node') : animate,
      }),
    ];
  };
};

ForceGraph.props = {};
