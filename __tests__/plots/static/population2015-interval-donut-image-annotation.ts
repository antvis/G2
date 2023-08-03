import { G2Spec } from '../../../src';

export function population2015IntervalDonutImageAnnotation(): G2Spec {
  return {
    type: 'view',
    height: 640,
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
        type: 'image',
        style: {
          src: 'data/firefox.png',
          x: '50%',
          y: '50%',
          width: 100,
          height: 100,
        },
      },
      {
        type: 'image',
        style: {
          src: 'data/chrome.png',
          x: 302,
          y: 400,
          width: 50,
          height: 50,
        },
      },
    ],
  };
}
