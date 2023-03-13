import { deepMix, isArray } from '@antv/util';
import { stratify, hierarchy, pack as packLayout } from 'd3-hierarchy';
import { CompositionComponent as CC } from '../runtime';
import { subObject } from '../utils/helper';
import { PackMark } from '../spec';
import { getBBoxSize } from '../utils/size';
import { maybeTooltip } from '../utils/mark';
import { field } from './utils';

export type PackOptions = Omit<PackMark, 'type'>;

type PackLayout = {
  size?: [number, number];
  padding?: number;
  sort?(a: any, b: any): number;
  // @todo
  path?: any;
};

const dataTransform = (data, layout: PackLayout, encode) => {
  const { value } = encode;
  const root = isArray(data)
    ? stratify().path(layout.path)(data)
    : hierarchy(data);
  value ? root.sum((d) => field(value)(d)).sort(layout.sort) : root.count();
  // @ts-ignore
  packLayout().size(layout.size).padding(layout.padding)(root);
  return root.descendants();
};

export const Pack: CC<PackOptions> = (markOptions) => {
  return (viewOptions) => {
    const { width, height } = getBBoxSize(viewOptions);
    const {
      data,
      encode = {},
      scale = {},
      style = {},
      layout = {},
      labels = [],
      tooltip = {},
      ...resOptions
    } = markOptions;
    const DEFAULT_LAYOUT_OPTIONS: PackLayout = {
      size: [width, height],
      padding: 0,
      sort: (a, b) => b.value - a.value,
    };
    const DEFAULT_OPTIONS = {
      type: 'point',
      axis: false,
      legend: false,
      scale: {
        x: { domain: [0, width] },
        y: { domain: [0, height] },
        size: { type: 'identity' },
      },
      encode: {
        x: 'x',
        y: 'y',
        size: 'r',
        shape: 'point',
      },
      style: {
        fill: !encode.color
          ? (d) => (d.height === 0 ? '#ddd' : '#fff')
          : undefined,
        stroke: !encode.color
          ? (d) => (d.height === 0 ? '' : '#000')
          : undefined,
      },
    };
    const DEFAULT_LABEL_OPTIONS = {
      text: '',
      position: 'inside',
      textOverflow: 'clip',
      wordWrap: true,
      maxLines: 1,
      wordWrapWidth: (d) => d.r * 2,
    };
    const DEFAULT_TOOLTIP_OPTIONS = {
      title: (d) => d.data.name,
      items: [{ field: 'value' }],
    };

    const transformedData = dataTransform(
      data,
      deepMix({}, DEFAULT_LAYOUT_OPTIONS, layout),
      deepMix({}, DEFAULT_OPTIONS['encode'], encode),
    );
    const labelStyle = subObject(style, 'label');
    return [
      deepMix({}, DEFAULT_OPTIONS, {
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
      }),
    ];
  };
};

Pack.props = {};
