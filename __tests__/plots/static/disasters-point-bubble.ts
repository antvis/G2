import { G2Spec } from '../../../src';

export function disastersPointBubble(): G2Spec {
  return {
    type: 'point',
    insetTop: 30,
    insetLeft: 30,
    data: {
      type: 'fetch',
      value: 'data/disasters.csv',
      transform: [
        {
          type: 'filter',
          callback: (d) => d.Entity !== 'All natural disasters',
        },
      ],
    },
    scale: { size: { rangeMax: 35 } },
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
    viewStyle: {
      viewFill: '#4e79a7',
      plotFill: '#f28e2c',
      mainFill: '#e15759',
      contentFill: '#76b7b2',
    },
  };
}
