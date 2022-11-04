import type { G2Spec } from '@/spec';

export function seattleWeatherPoint1d(): G2Spec {
  return {
    type: 'point',
    height: 120,
    data: {
      type: 'fetch',
      value: 'data/seattle-weather.csv',
    },
    encode: {
      x: 'precipitation',
      shape: 'hollow',
      size: 4,
    },
  };
}
