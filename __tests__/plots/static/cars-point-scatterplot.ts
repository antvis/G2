import { G2Spec } from '../../../src';

export function carsPointScatterPlot(): G2Spec {
  return {
    type: 'point',
    width: 1152,
    height: 600,
    data: {
      type: 'fetch',
      value: 'data/cars.csv',
    },
    encode: {
      x: 'mpg',
      y: 'hp',
      color: 'steelblue',
    },
    labels: [
      {
        text: 'name',
        stroke: '#fff',
        textAlign: 'start',
        textBaseline: 'middle',
        dx: 10,
        position: 'left',
        fontSize: 10,
        lineWidth: 2,
      },
    ],
  };
}
