import { G2Spec } from '../../../src';

export function population2015IntervalDonut(): G2Spec {
  return {
    type: 'interval',
    height: 640,
    data: {
      type: 'fetch',
      value: 'data/population2015.csv',
    },
    transform: [{ type: 'stackY' }],
    coordinate: [{ type: 'theta', innerRadius: 0.6 }],
    scale: {
      color: {
        guide: null,
        palette: 'spectral',
        offset: (t) => t * 0.8 + 0.1,
      },
    },
    encode: {
      y: 'value',
      color: 'name',
    },
    style: {
      stroke: 'white',
      inset: 1,
      radius: 10,
    },
    labels: [
      { text: 'name', fontSize: 10, fontWeight: 'bold' },
      {
        text: (d, i, data) => (i < data.length - 3 ? d.value : ''),
        fontSize: 9,
        dy: '0.75em',
      },
    ],
  };
}
