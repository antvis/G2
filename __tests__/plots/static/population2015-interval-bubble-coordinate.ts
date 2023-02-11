import { G2Spec } from '../../../src';

export function population2015IntervalBubbleCoordinate(): G2Spec {
  return {
    type: 'view',
    height: 640,
    coordinate: { type: 'theta', innerRadius: 0.3 },
    children: [
      {
        type: 'interval',
        data: {
          type: 'fetch',
          value: 'data/population2015.csv',
        },
        coordinate: { type: 'theta', innerRadius: 0.6 },
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
        coordinate: { innerRadius: 0.8 },
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
    ],
  };
}
