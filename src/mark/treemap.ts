import { deepMix } from '@antv/util';
import {
  treemap as treemapLayout,
  treemapBinary,
  treemapDice,
  treemapSlice,
  treemapSliceDice,
  treemapSquarify,
  treemapResquarify,
} from 'd3-hierarchy';
import { subObject } from '../utils/helper';
import { CompositionComponent as CC } from '../runtime';
import { TreemapMark } from '../spec';
import { maybeTooltip } from '../utils/mark';
import { generateHierarchyRoot, field } from './utils';

export type TreemapOptions = Omit<TreemapMark, 'type'>;

type Layout = {
  tile?:
    | 'treemapBinary'
    | 'treemapDice'
    | 'treemapSlice'
    | 'treemapSliceDice'
    | 'treemapSquarify'
    | 'treemapResquarify';
  size?: [number, number];
  round?: boolean;
  // Ignore the value of the parent node when calculating the total value.
  ignoreParentValue?: boolean;
  ratio?: number;
  padding?: number;
  paddingInner?: number;
  paddingOuter?: number;
  paddingTop?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  sort?(a: any, b: any): number;
  path?: (d: any) => any;
  /** The granularity of Display layer.  */
  layer?: number | ((d: any) => any);
};

type TreemapData = {
  name: string;
  children: TreemapData[];
  [key: string]: any;
}[];

function getTileMethod(tile: string, ratio: number) {
  const tiles = {
    treemapBinary,
    treemapDice,
    treemapSlice,
    treemapSliceDice,
    treemapSquarify,
    treemapResquarify,
  };
  const tileMethod =
    tile === 'treemapSquarify' ? tiles[tile].ratio(ratio) : tiles[tile];
  if (!tileMethod) {
    throw new TypeError('Invalid tile method!');
  }
  return tileMethod;
}

function dataTransform(data, layout: Layout, encode): TreemapData {
  const { value } = encode;
  const tileMethod = getTileMethod(layout.tile, layout.ratio);
  const root = generateHierarchyRoot(data, layout.path);

  // Calculate the value and sort.
  value
    ? root
        .sum((d) =>
          layout.ignoreParentValue && d.children ? 0 : field(value)(d),
        )
        .sort(layout.sort)
    : root.count();

  treemapLayout()
    .tile(tileMethod)
    // @ts-ignore
    .size(layout.size)
    .round(layout.round)
    .paddingInner(layout.paddingInner)
    .paddingOuter(layout.paddingOuter)
    .paddingTop(layout.paddingTop)
    .paddingRight(layout.paddingRight)
    .paddingBottom(layout.paddingBottom)
    .paddingLeft(layout.paddingLeft)(root);

  return root
    .descendants()
    .map((d) =>
      Object.assign(d, {
        x: [d.x0, d.x1],
        y: [d.y0, d.y1],
      }),
    )
    .filter(
      typeof layout.layer === 'function'
        ? layout.layer
        : (d) => d.height === layout.layer,
    );
}

// Defaults
const GET_DEFAULT_LAYOUT_OPTIONS = (width, height) => ({
  tile: 'treemapSquarify',
  ratio: 0.5 * (1 + Math.sqrt(5)),
  size: [width, height],
  round: false,
  ignoreParentValue: true,
  padding: 0,
  paddingInner: 0,
  paddingOuter: 0,
  paddingTop: 0,
  paddingRight: 0,
  paddingBottom: 0,
  paddingLeft: 0,
  sort: (a, b) => b.value - a.value,
  layer: 0,
});

const GET_DEFAULT_OPTIONS = (width, height) => ({
  type: 'rect',
  axis: false,
  encode: {
    x: 'x',
    y: 'y',
    color: (d) => d.data.parent.name,
  },
  scale: {
    x: { domain: [0, width], range: [0, 1] },
    y: { domain: [0, height], range: [0, 1] },
  },
  style: {
    stroke: '#fff',
  },
});

const DEFAULT_LABEL_OPTIONS = {
  fontSize: 10,
  text: (d) => d.data.name,
  position: 'inside',
  fill: '#000',
  textOverflow: 'clip',
  wordWrap: true,
  maxLines: 1,
  wordWrapWidth: (d) => d.x1 - d.x0,
};

const DEFAULT_TOOLTIP_OPTIONS = {
  title: (d) => d.data.name,
  items: [{ field: 'value' }],
};

export const Treemap: CC<TreemapOptions> = (options, context) => {
  const { width, height } = context;

  const {
    data,
    encode = {},
    scale,
    style = {},
    layout = {},
    labels = [],
    tooltip = {},
    ...resOptions
  } = options;

  // Data
  const transformedData = dataTransform(
    data,
    deepMix({}, GET_DEFAULT_LAYOUT_OPTIONS(width, height), layout),
    encode,
  );

  // Label
  const labelStyle = subObject(style, 'label');

  return deepMix({}, GET_DEFAULT_OPTIONS(width, height), {
    data: transformedData,
    encode,
    scale,
    style,
    labels: [
      {
        ...DEFAULT_LABEL_OPTIONS,
        ...labelStyle,
      },
      ...labels,
    ],
    ...resOptions,
    tooltip: maybeTooltip(tooltip, DEFAULT_TOOLTIP_OPTIONS),
    axis: false,
  });
};

Treemap.props = {};
