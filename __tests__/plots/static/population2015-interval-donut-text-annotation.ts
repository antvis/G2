import { G2Spec } from '../../../src';

export function population2015IntervalDonutTextAnnotation(): G2Spec {
  return {
    type: 'view',
    height: 640,
    padding: 0,
    coordinate: { type: 'theta', innerRadius: 0.6 },
    children: [
      {
        type: 'interval',
        data: {
          type: 'fetch',
          value: 'data/population2015.csv',
        },
        transform: [{ type: 'stackY' }],
        scale: {
          color: {
            palette: 'spectral',
            offset: (t) => t * 0.8 + 0.1,
          },
        },
        legend: false,
        encode: {
          y: 'value',
          color: 'name',
        },
      },
      {
        type: 'text',
        style: {
          text: 'Donut',
          // Relative position.
          x: '50%',
          y: '50%',
          fontSize: 40,
          textAlign: 'center',
          fontWeight: 'bold',
        },
      },
      {
        type: 'text',
        style: {
          text: 'chart',
          // Absolute position.
          x: (640 - 32) / 2,
          y: 360,
          fontSize: 20,
          textAlign: 'center',
          fontWeight: 'bold',
        },
      },
    ],
  };
}
