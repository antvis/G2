import { deepMix } from '@antv/util';
import { CompositeMarkComponent as CC, MarkOptions } from '../runtime';
import { ChordMark } from '../spec';
import { subObject } from '../utils/helper';
import { subTooltip, maybeAnimation } from '../utils/mark';
import { Arc } from '../data/arc';
import { ArcOptions } from '../data/utils/arc/types';
import { field, initializeData } from './utils';

const DEFAULT_LAYOUT_OPTIONS: ArcOptions = {
  y: 0,
  thickness: 0.05, // width of the node, (0, 1)
  marginRatio: 0.1, // margin ratio, [0, 1)
  id: (node) => node.key,
  source: (edge) => edge.source,
  target: (edge) => edge.target,
  sourceWeight: (edge) => edge.value || 1,
  targetWeight: (edge) => edge.value || 1,
  sortBy: null, // optional, id | weight | frequency | {function}
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
    opacity: 1,
    fillOpacity: 1,
    lineWidth: 1,
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
    opacity: 0.5,
    lineWidth: 1,
  },
};

const DEFAULT_LABEL_OPTIONS = {
  position: 'outside',
  fontSize: 10,
};

export type ChordOptions = Omit<ChordMark, 'type'>;

export const Chord: CC<ChordOptions> = (options, context) => {
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
  } = options;

  // Initialize data, generating nodes by link if is not specified.
  const { nodes, links } = initializeData(data, encode);

  // Extract encode for node and link.
  const nodeEncode = subObject(encode, 'node');
  const linkEncode = subObject(encode, 'link');
  const { key: nodeKey = (d) => d.key, color = nodeKey } = nodeEncode;
  const { linkEncodeColor = (d) => d.source } = linkEncode;
  const {
    nodeWidthRatio = DEFAULT_LAYOUT_OPTIONS.thickness,
    nodePaddingRatio = DEFAULT_LAYOUT_OPTIONS.marginRatio,
    ...restLayout
  } = layout;

  const { nodes: nodeData, edges: linkData } = Arc({
    ...DEFAULT_LAYOUT_OPTIONS,
    id: field(nodeKey),
    thickness: nodeWidthRatio,
    marginRatio: nodePaddingRatio,
    ...restLayout,
    weight: true,
  })({ nodes, edges: links });

  // Extract label style and apply defaults.
  const { text = nodeKey, ...labelStyle } = subObject(style, 'label');

  const nodeTooltip = subTooltip(
    tooltip,
    'node',
    {
      title: '',
      items: [(d) => ({ name: d.key, value: d.value })],
    },
    true,
  );
  const linkTooltip = subTooltip(tooltip, 'link', {
    title: '',
    items: [(d) => ({ name: `${d.source} -> ${d.target}`, value: d.value })],
  });

  const { height, width } = context;

  const minimumLen = Math.min(height, width);

  return [
    deepMix({}, DEFAULT_LINK_OPTIONS, {
      data: linkData,
      encode: { ...linkEncode, color: linkEncodeColor },
      labels: linkLabels,
      style: {
        fill: linkEncodeColor ? undefined : '#aaa',
        ...subObject(style, 'link'),
      },
      tooltip: linkTooltip,
      animate: maybeAnimation(animate, 'link'),
    }),
    deepMix({}, DEFAULT_NODE_OPTIONS, {
      data: nodeData,
      encode: { ...nodeEncode, color },
      scale,
      style: subObject(style, 'node'),
      coordinate: {
        type: 'polar',
        // Leave enough rendering space for the label.
        outerRadius: (minimumLen - 20) / minimumLen,
        startAngle: -Math.PI * 2,
        endAngle: 0,
      },
      labels: [
        {
          ...DEFAULT_LABEL_OPTIONS,
          text,
          ...labelStyle,
        },
        ...nodeLabels,
      ],
      tooltip: nodeTooltip,
      animate: maybeAnimation(animate, 'node'),
      axis: false,
    }),
  ] as MarkOptions[];
};

Chord.props = {};
