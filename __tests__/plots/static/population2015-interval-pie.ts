import { G2Spec } from '../../../src';

export function population2015IntervalPie(): G2Spec {
  return {
    type: 'interval',
    height: 640,
    data: {
      type: 'fetch',
      value: 'data/population2015.csv',
    },
    transform: [{ type: 'stackY' }],
    coordinate: { type: 'theta' },
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
        radius: 0.8,
        fontSize: 10,
        fontWeight: 'bold',
      },
      {
        text: (d, i, data) => (i < data.length - 3 ? d.value : ''),
        radius: 0.8,
        fontSize: 9,
        dy: 12,
      },
    ],
    animate: false,
    viewStyle: {
      viewFill: '#4e79a7',
      plotFill: '#f28e2c',
      mainFill: '#e15759',
      contentFill: '#76b7b2',
    },
  };
}
