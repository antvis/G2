import { deepMix } from '@antv/util';
import { CompositeMarkComponent as CC } from '../runtime';
import { SankeyMark } from '../spec';
import { Sankey as SankeyTransform } from '../data/sankey';
import { omitPrefixObject, subObject } from '../utils/helper';
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
    state = {},
    viewStyle = {},
  } = options;

  // Initialize data, generating nodes by link if is not specified.
  const { links, nodes } = initializeData(data, encode);

  // Early check for empty data - return empty marks instead of processing
  if (!links || links.length === 0) {
    return [
      // Empty node mark
      deepMix({}, DEFAULT_NODE_OPTIONS, {
        data: [],
        encode: {},
        scale,
        style: subObject(style, 'node'),
        viewStyle,
        labels: [],
        tooltip: false,
        animate: false,
        axis: false,
        interaction,
        state: {},
      }),
      // Empty link mark
      deepMix({}, DEFAULT_LINK_OPTIONS, {
        data: [],
        encode: {},
        labels: [],
        style: subObject(style, 'link'),
        tooltip: false,
        animate: false,
        interaction,
        state: {},
      }),
    ];
  }

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
  // Extract node and link state.
  const [nodeState, linkState] = Object.entries(state).reduce(
    (acc, [stateName, styleObj]) => {
      const commonState = omitPrefixObject(styleObj, 'node', 'link');
      const nodeState = subObject(styleObj, 'node');
      acc[0][stateName] = { ...commonState, ...nodeState };
      const linkState = subObject(styleObj, 'link');
      acc[1][stateName] = { ...commonState, ...linkState };
      return acc;
    },
    [{}, {}],
  );
  return [
    deepMix({}, DEFAULT_NODE_OPTIONS, {
      data: nodeData,
      encode: { ...nodeEncode, color },
      scale,
      style: subObject(style, 'node'),
      viewStyle,
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
      state: nodeState,
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
      state: linkState,
    }),
  ];
};

Sankey.props = {};
