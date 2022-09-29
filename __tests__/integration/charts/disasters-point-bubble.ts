import { G2Spec } from '../../../src';

export function disastersPointBubble(): G2Spec {
  return {
    type: 'point',
    paddingLeft: 150,
    paddingTop: 50,
    data: {
      type: 'fetch',
      value: 'data/disasters.csv',
      transform: [
        {
          type: 'filterBy',
          fields: [['Entity', (d) => d !== 'All natural disasters']],
        },
      ],
    },
    scale: {
      size: { rangeMax: 35 },
      color: { guide: null },
    },
    encode: {
      x: 'Year',
      y: 'Entity',
      size: 'Deaths',
      color: 'Entity',
      shape: 'point',
    },
    style: {
      stroke: 'black',
      opacity: 0.8,
      lineWidth: 1,
    },
  };
}
