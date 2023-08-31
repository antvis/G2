import { deepMix } from '@antv/util';
import { subObject } from '../utils/helper';
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

export type LiquidData = {
  target?: number;
  total?: number;
  percent?: number;
  name?: string;
  thresholds?: number[];
};

export type LiquidOptions = Omit<LiquidMark, 'type'>;

export const Liquid: CC<LiquidOptions> = (options) => {
  const {
    data = {},
    style = {},
    animate,
    encode = {},
    ...resOptions
  } = options;

  const { percent } = data;

  const newData = [{ percent: data.percent, type: 'liquid' }];

  const textStyle = subObject(style, 'text').style;

  return [
    deepMix({}, DEFAULT_OPTIONS, {
      type: 'interval',
      data: newData,
      style: {
        liquidOptions: {
          percent,
          liquidShape: encode?.shape,
        },
        styleOptions: style,
      },
      animate,
      ...resOptions,
    }),
    deepMix({}, DEFAULT_TEXT_OPTIONS, {
      style: {
        text: `${percent * 100} %`,
        ...textStyle,
      },
      animate,
    }),
  ];
};

Liquid.props = {};
