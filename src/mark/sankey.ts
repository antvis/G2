import { deepMix } from '@antv/util';
import { CompositionComponent as CC } from '../runtime';
import { SankeyMark } from '../spec';
import { subObject } from '../utils/helper';
import { Sankey as SankeyTransform } from '../data/sankey';

export type SankeyOptions = Omit<SankeyMark, 'type'>;

type Encode = 'string' | ((d: any) => any);

function field(encode: Encode): (d: any) => any {
  return typeof encode === 'function' ? encode : (d) => d[encode];
}

function valueof(data: Record<string, any>[], encode: Encode): any[] {
  return Array.from(data, field(encode));
}

function initializeData(
  data: { nodes?: any[]; links: any[] },
  encode: Record<string, Encode>,
): {
  links: { target: string; source: string; value: any }[];
  nodes: { key: string }[];
} {
  const {
    source = (d) => d.source,
    target = (d) => d.target,
    value = (d) => d.value,
  } = encode;
  const { links, nodes } = data;
  const LS = valueof(links, source);
  const LT = valueof(links, target);
  const LV = valueof(links, value);
  return {
    links: links.map((_, i) => ({
      target: LT[i],
      source: LS[i],
      value: LV[i],
    })),
    nodes: nodes || Array.from(new Set([...LS, ...LT]), (key) => ({ key })),
  };
}

/**
 * @todo Add interaction
 * @todo Add source-link color mode
 */
export const Sankey: CC<SankeyOptions> = (options) => {
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
      stroke: null,
    },
  };

  const DEFAULT_LABEL_OPTIONS = {
    textAlign: (d) => (d.x[0] < 0.5 ? 'start' : 'end'),
    position: (d) => (d.x[0] < 0.5 ? 'right' : 'left'),
    fontSize: 10,
  };

  return () => {
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

    // Initialize data, generating nodes by link if is not specified.
    const { links, nodes } = initializeData(data.value, encode);

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
        animate: subObject(animate, 'node'),
      }),
      deepMix({}, DEFAULT_LINK_OPTIONS, {
        data: linkData,
        encode: linkEncode,
        labels: linkLabels,
        style: {
          fill: linkEncode.color ? undefined : '#aaa',
          ...subObject(style, 'link'),
        },
        animate: subObject(animate, 'link'),
      }),
    ];
  };
};

Sankey.props = { composite: true };
