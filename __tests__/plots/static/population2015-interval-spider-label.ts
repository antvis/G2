import { G2Spec } from '../../../src';

export function population2015IntervalSpiderLabel(): G2Spec {
  return {
    type: 'interval',
    height: 640,
    data: {
      type: 'fetch',
      value: 'data/population2015.csv',
    },
    transform: [{ type: 'stackY' }],
    coordinate: { type: 'theta', outerRadius: 0.8 },
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
    style: {
      stroke: 'white',
    },
    labels: [
      {
        text: 'name',
        position: 'spider',
        edgeDistance: 20,
        connectorDistance: 4,
        offset: 12,
        transform: [{ type: 'overlapDodgeY' }],
      },
    ],
  };
}
