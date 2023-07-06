import { G2Spec } from '../../../src';

export function countriesBubbleLegendSize(): G2Spec {
  return {
    type: 'point',
    data: {
      type: 'fetch',
      value: 'data/countries.json',
    },
    encode: {
      x: 'change in female rate',
      y: 'change in male rate',
      size: 'pop',
      color: 'continent',
      shape: 'point',
    },
    scale: {
      color: {
        range: ['#ffd500', '#82cab2', '#193442', '#d18768', '#7e827a'],
      },
      x: { nice: true },
      y: { nice: true },
      size: { range: [4, 30] },
    },
    style: { stroke: '#bbb', fillOpacity: 0.8 },
  };
}
