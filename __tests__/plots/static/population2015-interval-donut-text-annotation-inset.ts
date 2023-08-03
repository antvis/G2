import { G2Spec } from '../../../src';

export function population2015IntervalDonutTextAnnotationInset(): G2Spec {
  return {
    type: 'view',
    height: 640,
    padding: 0,
    inset: 50,
    coordinate: { type: 'theta', innerRadius: 0.6 },
    style: {
      viewFill: '#4e79a7',
      plotFill: '#f28e2c',
      mainFill: '#e15759',
      contentFill: '#76b7b2',
    },
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
          x: 640 / 2 - 16,
          y: 360,
          fontSize: 20,
          textAlign: 'center',
          fontWeight: 'bold',
        },
      },
    ],
  };
}
