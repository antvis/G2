import { G2Spec } from '../../../src';

export function vaccinesCellScaleRelationAutoPaddingTickFilter(): G2Spec {
  return {
    type: 'view',
    width: 1152,
    height: 780,
    padding: 'auto',
    data: {
      type: 'fetch',
      value: 'data/vaccines.csv',
    },
    style: {
      viewFill: '#4e79a7',
      plotFill: '#f28e2c',
      mainFill: '#e15759',
      contentFill: '#76b7b2',
    },
    axis: {
      x: {
        tickFilter: (d) => d % 10 === 0,
        position: 'top',
      },
      y: {
        labelAutoRotate: false,
      },
    },
    scale: {
      color: {
        palette: 'puRd',
        relations: [
          [(d) => d === null, '#eee'],
          [0, '#fff'],
        ],
      },
    },
    children: [
      {
        type: 'cell',
        encode: {
          x: 'year',
          y: 'name',
          color: 'value',
        },
        style: {
          inset: 0.5,
        },
      },
      {
        type: 'lineX',
        data: [1963],
        style: {
          stroke: 'black',
        },
        labels: [
          {
            text: '1963',
            position: 'bottom',
            dy: 3,
            fontSize: 10,
            textBaseline: 'top',
          },
          {
            text: 'Measles vaccine introduced',
            position: 'bottom',
            textBaseline: 'top',
            fontSize: 10,
            fontWeight: 'bold',
            dy: 12,
          },
        ],
      },
    ],
  };
}
