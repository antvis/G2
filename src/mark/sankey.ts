import { deepMix } from '@antv/util';
import { CompositeMarkComponent as CC } from '../runtime';
import { SankeyMark } from '../spec';
import { Sankey as SankeyTransform } from '../data/sankey';
import { subObject } from '../utils/helper';
import { subTooltip, maybeAnimation } from '../utils/mark';
import { field, initializeData } from './utils';

const DEFAULT_LAYOUT_OPTIONS = {
  nodeId: (d) => d.key,
  nodeWidth: 0.02,
  nodePadding: 0.02,
};

const DEFAULT_NODE_OPTIONS = {
  type: 'polygon',
  axis: false,
  legend: false,
  encode: {
    shape: 'polygon',
    x: 'x',
    y: 'y',
  },
  scale: {
    x: { type: 'identity' },
    y: { type: 'identity' },
  },
  style: {
    stroke: '#000',
  },
};

const DEFAULT_LINK_OPTIONS = {
  type: 'polygon',
  axis: false,
  legend: false,
  encode: {
    shape: 'ribbon',
    x: 'x',
    y: 'y',
  },
  style: {
    fillOpacity: 0.5,
    stroke: undefined,
  },
};

const DEFAULT_LABEL_OPTIONS = {
  textAlign: (d) => (d.x[0] < 0.5 ? 'start' : 'end'),
  position: (d) => (d.x[0] < 0.5 ? 'right' : 'left'),
  fontSize: 10,
};

export type SankeyOptions = Omit<SankeyMark, 'type'>;

/**
 * @todo Add interaction
 * @todo Add source-link color mode
 */
export const Sankey: CC<SankeyOptions> = (options) => {
  const {
    data,
    encode = {},
    scale,
    style = {},
    layout = {},
    nodeLabels = [],
    linkLabels = [],
    animate = {},
    tooltip = {},
    interaction,
  } = options;

  // Initialize data, generating nodes by link if is not specified.
  const { links, nodes } = initializeData(data, encode);

  // Extract encode for node and link.
  const nodeEncode = subObject(encode, 'node');
  const linkEncode = subObject(encode, 'link');
  const { key: nodeKey = (d) => d.key, color = nodeKey } = nodeEncode;

  // Transform data, using nodeKey as nodeId.
  const { links: linkData, nodes: nodeData } = SankeyTransform({
    ...DEFAULT_LAYOUT_OPTIONS,
    nodeId: field(nodeKey),
    ...layout,
  })({ links, nodes });

  // Extract label style and apply defaults.
  const {
    text = nodeKey,
    spacing = 5,
    ...labelStyle
  } = subObject(style, 'label');

  const key1 = field(nodeKey);

  const nodeTooltip = subTooltip(
    tooltip,
    'node',
    {
      title: key1,
      items: [{ field: 'value' }],
    },
    true,
  );
  const linkTooltip = subTooltip(tooltip, 'link', {
    title: '',
    items: [
      (d) => ({ name: 'source', value: key1(d.source) }),
      (d) => ({ name: 'target', value: key1(d.target) }),
    ],
  });

  return [
    deepMix({}, DEFAULT_NODE_OPTIONS, {
      data: nodeData,
      encode: { ...nodeEncode, color },
      scale,
      style: subObject(style, 'node'),
      labels: [
        {
          ...DEFAULT_LABEL_OPTIONS,
          text,
          dx: (d) => (d.x[0] < 0.5 ? spacing : -spacing),
          ...labelStyle,
        },
        ...nodeLabels,
      ],
      tooltip: nodeTooltip,
      animate: maybeAnimation(animate, 'node'),
      axis: false,
      interaction,
    }),
    deepMix({}, DEFAULT_LINK_OPTIONS, {
      data: linkData,
      encode: linkEncode,
      labels: linkLabels,
      style: {
        fill: linkEncode.color ? undefined : '#aaa',
        lineWidth: 0,
        ...subObject(style, 'link'),
      },
      tooltip: linkTooltip,
      animate: maybeAnimation(animate, 'link'),
      interaction,
    }),
  ];
};

Sankey.props = {};
