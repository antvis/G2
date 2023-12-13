import { deepMix, isNumber } from '@antv/util';
import { subObject } from '../utils/helper';
import { prettyNumber } from '../utils/number';
import { CompositeMarkComponent as CC } from '../runtime';
import { LiquidMark } from '../spec';
import { LiquidShape } from '../shape';

const DEFAULT_OPTIONS = {
  axis: {
    x: false,
    y: false,
  },
  legend: false,
  tooltip: false,
  encode: {
    x: 'type',
    y: 'percent',
  },
  scale: {
    y: {
      domain: [0, 1],
    },
  },
  style: {
    shape: LiquidShape,
  },
  animate: {
    enter: {
      type: 'fadeIn',
    },
  },
};

const DEFAULT_TEXT_OPTIONS = {
  type: 'text',
  style: {
    x: '50%',
    y: '50%',
    textAlign: 'center',
    textBaseline: 'middle',
    fontSize: 20,
    fontWeight: 800,
    fill: '#888',
  },
  animate: {
    enter: {
      type: 'fadeIn',
    },
  },
};

export type LiquidData =
  | {
      percent?: number;
    }
  | number;

export type LiquidOptions = Omit<LiquidMark, 'type'>;

export const Liquid: CC<LiquidOptions> = (options) => {
  const { data = {}, style = {}, animate, ...resOptions } = options;
  // Compatible with old data structures: { percent: number } and percent >= 0.
  const percent = Math.max(0, isNumber(data) ? data : data?.percent);

  const newData = [{ percent, type: 'liquid' }];

  const contentStyle = {
    ...subObject(style, 'text'),
    ...subObject(style, 'content'),
  };

  const outline = subObject(style, 'outline');
  const wave = subObject(style, 'wave');
  const background = subObject(style, 'background');

  return [
    deepMix({}, DEFAULT_OPTIONS, {
      type: 'interval',
      data: newData,
      style: {
        liquidOptions: {
          percent,
          liquidShape: style?.shape,
        },
        styleOptions: {
          ...style,
          outline,
          wave,
          background,
        },
      },
      animate,
      ...resOptions,
    }),
    deepMix({}, DEFAULT_TEXT_OPTIONS, {
      style: {
        text: `${prettyNumber(percent * 100)} %`,
        ...contentStyle,
      },
      animate,
    }),
  ];
};

Liquid.props = {};
