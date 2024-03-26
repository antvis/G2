import { G2Spec } from '../../../src';

export function marketIntervalMarimekkoAutoPaddingFlex(): G2Spec {
  return {
    type: 'interval',
    width: 900,
    height: 800,
    viewStyle: {
      viewFill: '#4e79a7',
      plotFill: '#f28e2c',
      mainFill: '#e15759',
      contentFill: '#76b7b2',
    },
    data: {
      type: 'fetch',
      value: 'data/market.csv',
    },
    transform: [
      { type: 'flexX', reducer: 'sum' },
      { type: 'stackY' },
      { type: 'normalizeY' },
    ],
    scale: { x: { padding: 0 } },
    axis: { y: false },
    encode: {
      x: 'market',
      y: 'value',
      color: 'segment',
    },
    style: {
      inset: 0.5,
    },
    labels: [
      {
        text: 'segment',
        x: 5,
        y: 5,
        textAlign: 'start',
        textBaseline: 'top',
        fontSize: 10,
        fill: '#fff',
      },
      {
        text: 'value',
        x: 5,
        y: 5,
        textAlign: 'start',
        textBaseline: 'top',
        dy: 12,
        fontSize: 10,
        fill: '#fff',
      },
    ],
  };
}
