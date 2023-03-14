import { deepMix } from '@antv/util';
import { subObject } from '../utils/helper';
import { CompositionComponent as CC } from '../runtime';
import { BulletMark } from '../spec';
import { maybeAnimation } from '../utils/mark';

export type BulletOptions = Omit<BulletMark, 'type'>;

function dataTransform(data, encode) {
  const {
    target = 'target',
    measures = 'measures',
    ranges = 'ranges',
  } = encode || {};

  const dataMap = (data, key: string) => {
    return data.flatMap((d) => {
      const keyMeasure = d[key] || [];
      return keyMeasure.map((m, i) => ({
        x: d.title,
        y: m,
        color: `${key}-${i}`,
      }));
    });
  };

  return {
    measuresData: dataMap(data, measures),
    targetData: dataMap(data, target),
    rangesData: dataMap(data, ranges),
  };
}

export const Bullet: CC<BulletOptions> = (options) => {
  const PUBLIC_OPTIONS = {
    encode: {
      x: 'x',
      y: 'y',
      color: 'color',
    },
  };
  const DEFAULT_RANGES_OPTIONS = {
    type: 'interval',
    transform: [{ type: 'stackY' }],
    encode: {
      size: 50,
    },
    scale: {
      color: {
        range: ['#FFBCB8', '#FFE0B0', '#BFEEC8'],
        independent: true,
      },
    },
    axis: {
      x: {
        title: '',
        tick: null,
        labelFontWeight: 600,
      },
      y: {
        grid: null,
        title: null,
      },
    },
    legend: false,
    style: {
      fillOpacity: 0.5,
    },
  };
  const DEFAULT_MEASURES_OPTIONS = {
    type: 'interval',
    transform: [{ type: 'stackY' }],
    scale: {
      color: {
        range: ['#5B8FF9', '#61DDAA'],
        independent: true,
      },
    },
    encode: {
      size: 40,
    },
    labels: [
      {
        text: 'y',
        position: 'inside',
      },
    ],
    legend: false,
  };
  const DEFAULT_TARGET_OPTIONS = {
    type: 'point',
    encode: {
      size: 10,
    },
    scale: {
      color: {
        range: '#39a3f4',
        independent: true,
      },
    },
    style: {
      lineWidth: 2,
    },
    legend: false,
  };
  return (viewOptions) => {
    const { coordinate = {} } = viewOptions;
    const {
      data = {},
      encode = {},
      scale = {},
      style = {},
      animate = {},
      ...rest
    } = options;

    const { measuresData, targetData, rangesData } = dataTransform(
      data,
      encode,
    );
    const isTranspose = coordinate?.transform?.some(
      (tran) => tran.type === 'transpose',
    );
    return [
      deepMix({}, PUBLIC_OPTIONS, DEFAULT_RANGES_OPTIONS, {
        data: rangesData,
        encode: subObject(encode, 'ranges'),
        scale: subObject(scale, 'ranges'),
        style: subObject(style, 'ranges'),
        animate: maybeAnimation(animate, 'ranges'),
        ...rest,
      }),
      deepMix({}, PUBLIC_OPTIONS, DEFAULT_MEASURES_OPTIONS, {
        data: measuresData,
        encode: subObject(encode, 'measures'),
        scale: subObject(scale, 'measures'),
        style: subObject(style, 'measures'),
        animate: maybeAnimation(animate, 'measures'),
        ...rest,
      }),
      deepMix({}, PUBLIC_OPTIONS, DEFAULT_TARGET_OPTIONS, {
        data: targetData,
        encode: {
          shape: isTranspose ? 'line' : 'hyphen',
          ...subObject(encode, 'target'),
        },
        scale: subObject(scale, 'target'),
        style: subObject(style, 'target'),
        animate: maybeAnimation(animate, 'target'),
        ...rest,
      }),
    ];
  };
};

Bullet.props = {};
