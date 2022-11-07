import { deepMix, isArray } from '@antv/util';
import * as d3Hierarchy from 'd3-hierarchy';
import { CompositionComponent as CC } from '../runtime';
import { subObject } from '../utils/helper';
import { PackMark } from '../spec';
import { getBBoxSize } from '../utils/size';

export type PackOptions = Omit<PackMark, 'type'>;

type PackLayout = {
  size?: [number, number];
  padding?: number;
  sort?(a: any, b: any): number;
};

const dataTransform = (data, layout: PackLayout, encode) => {
  const { value: originalData, path = (d) => d } = data;
  const { value } = encode;
  const root = isArray(originalData)
    ? d3Hierarchy.stratify().path(path)(originalData)
    : d3Hierarchy.hierarchy(originalData);

  value ? root.sum((d) => d[value]).sort(layout.sort) : root.count();

  d3Hierarchy.pack().size(layout.size).padding(layout.padding)(root);
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
      ...resOptions
    } = markOptions;
    const DEFAULT_LAYOUT_OPTIONS: PackLayout = {
      size: [width, height],
      padding: 5,
      sort: (a, b) => b.value - a.value,
    };
    const DEFAULT_OPTIONS = {
      type: 'point',
      axis: false,
      legend: false,
      encode: {
        x: 'x',
        y: 'y',
        size: 'r',
        color: 'depth',
        shape: 'point',
      },
      scale: {
        x: { domain: [0, width] },
        y: { domain: [0, height] },
        size: { type: 'identity' },
      },
    };
    const DEFAULT_LABEL_OPTIONS = {
      text: '',
    };
    const transformedData = dataTransform(
      data,
      deepMix({}, DEFAULT_LAYOUT_OPTIONS, layout),
      encode,
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
      }),
    ];
  };
};

Pack.props = { composite: true };
