import { G2Spec } from '../../../src';
import { seriesTooltipSteps } from './utils';

export function aaplAreaMissingDataTranspose(): G2Spec {
  return {
    width: 800,
    type: 'area',
    coordinate: { transform: [{ type: 'transpose' }] },
    data: {
      type: 'fetch',
      value: 'data/aapl.csv',
      transform: [
        {
          type: 'map',
          callback: (d) => ({
            ...d,
            close: d.date.getUTCMonth() <= 3 ? NaN : d.close,
          }),
        },
      ],
    },
    encode: {
      x: 'date',
      y: 'close',
    },
    scale: {
      x: { type: 'time' },
    },
    style: {
      connect: true,
      connectFill: 'grey',
      connectFillOpacity: 0.15,
    },
    tooltip: {
      title: (d) => new Date(d.date).toUTCString(),
    },
  };
}

aaplAreaMissingDataTranspose.steps = seriesTooltipSteps([100, 88]);
