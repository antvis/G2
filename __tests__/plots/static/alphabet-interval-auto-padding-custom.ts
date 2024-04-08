import { Rect, Text } from '@antv/g';
import { G2Spec } from '../../../src';

export function alphabetIntervalAutoPaddingCustom(): G2Spec {
  return {
    type: 'interval',
    transform: [{ type: 'sortX', by: 'y', reverse: true }],
    data: {
      type: 'fetch',
      value: 'data/alphabet.csv',
    },
    encode: {
      x: 'letter',
      y: 'frequency',
      color: 'steelblue',
    },
    axis: {
      y: {
        labelFormatter: (d) => {
          const width = 60;
          const height = 15;
          const rect = new Rect({
            style: { x: -width, y: -height / 2, height, width, fill: 'red' },
          });
          const text = new Text({
            style: {
              x: -width / 2,
              text: d + '',
              fontSize: 12,
              textBaseline: 'middle',
              textAlign: 'center',
            },
          });
          rect.appendChild(text);
          return rect;
        },
      },
      x: {
        labelFormatter: (d) => {
          const width = 60;
          const height = 15;
          const rect = new Rect({
            style: { x: 0, y: -height / 2, height, width, fill: 'red' },
          });
          const text = new Text({
            style: {
              x: width / 2,
              text: d + '',
              fontSize: 12,
              textBaseline: 'middle',
              textAlign: 'center',
            },
          });
          rect.appendChild(text);
          return rect;
        },
      },
    },
    viewStyle: {
      viewFill: '#4e79a7',
      plotFill: '#f28e2c',
      mainFill: '#e15759',
      contentFill: '#76b7b2',
    },
  };
}
