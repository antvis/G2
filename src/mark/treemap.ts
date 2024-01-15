import { deepMix, get, last } from '@antv/util';
import { subObject } from '../utils/helper';
import { CompositionComponent as CC } from '../runtime';
import { TreemapMark } from '../spec';
import { maybeTooltip } from '../utils/mark';
import { treeDataTransform } from '../utils/treeDataTransform';

export type TreemapOptions = Omit<TreemapMark, 'type'>;

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
    key: 'id',
    color: (d) => d.path[1],
  },
  scale: {
    x: { domain: [0, width], range: [0, 1] },
    y: { domain: [0, height], range: [0, 1] },
  },
  style: {
    stroke: '#fff',
  },
  state: {
    active: { opacity: 0.6 },
    inactive: { opacity: 1 },
  },
});

const DEFAULT_LABEL_OPTIONS = {
  fontSize: 10,
  text: (d) => last(d.path),
  position: 'inside',
  fill: '#000',
  textOverflow: 'clip',
  wordWrap: true,
  maxLines: 1,
  wordWrapWidth: (d) => d.x1 - d.x0,
};

const DEFAULT_TOOLTIP_OPTIONS = {
  title: (d) => d.path?.join?.('.'),
  items: [{ field: 'value' }],
};

const DEFAULT_TOOLTIP_OPTIONS_DRILL = {
  title: (d) => last(d.path),
  items: [{ field: 'value' }],
};

export const Treemap: CC<TreemapOptions> = (options, context) => {
  const { width, height, options: markOptions } = context;

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

  const treemapDrillDown = get(markOptions, [
    'interaction',
    'treemapDrillDown',
  ]);

  // Layout
  const layoutOptions = deepMix(
    {},
    GET_DEFAULT_LAYOUT_OPTIONS(width, height),
    layout,
    {
      layer: treemapDrillDown
        ? (d) => {
            return d.depth === 1;
          }
        : layout.layer,
    },
  );

  // Data
  const [transformedData, transformedDataAll] = treeDataTransform(
    data,
    layoutOptions,
    encode,
  );

  // Label
  const labelStyle = subObject(style, 'label');

  return deepMix(
    {},
    GET_DEFAULT_OPTIONS(width, height),
    {
      data: transformedData,
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
      encode,
      tooltip: maybeTooltip(tooltip, DEFAULT_TOOLTIP_OPTIONS),
      axis: false,
    },
    treemapDrillDown
      ? {
          interaction: {
            ...resOptions.interaction,
            treemapDrillDown: treemapDrillDown
              ? {
                  ...treemapDrillDown,
                  originData: transformedDataAll,
                  layout: layoutOptions,
                }
              : undefined,
          },
          encode: {
            color: (d) => last(d.path),
            ...encode,
          },
          tooltip: maybeTooltip(tooltip, DEFAULT_TOOLTIP_OPTIONS_DRILL),
        }
      : {},
  );
};

Treemap.props = {};
