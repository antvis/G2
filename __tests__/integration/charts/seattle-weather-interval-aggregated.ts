import { G2Spec } from '../../../src';

export function seattleWeatherIntervalAggregated(): G2Spec {
  return {
    type: 'interval',
    data: {
      type: 'fetch',
      value: 'data/seattle-weather.csv',
    },
    transform: [
      { type: 'groupX', y: 'count' },
      { type: 'stackY', reverse: true, orderBy: 'series' },
    ],
    encode: {
      x: (d) => new Date(d.date).getMonth(),
      color: 'weather',
    },
    scale: {
      color: {
        domain: ['sun', 'fog', 'drizzle', 'rain', 'snow'],
        range: ['#e7ba52', '#c7c7c7', '#aec7e8', '#1f77b4', '#9467bd'],
      },
    },
  };
}
