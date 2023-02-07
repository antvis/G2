import { Circle } from '@antv/g';
import { income } from '../../data/income';

function point(style) {
  const { x, y, ...rest } = style;
  return new Circle({
    style: {
      cx: x,
      cy: y,
      ...rest,
    },
  });
}

export function incomePointCircle() {
  return {
    type: 'view',
    children: [
      {
        type: 'point',
        data: income,
        encode: {
          x: 'm',
          y: 'f',
        },
        axis: {
          x: { labelFormatter: '~s' },
          y: { labelFormatter: '~s' },
        },
      },
      {
        type: 'shape',
        style: {
          x: '80%',
          y: '80%',
          r: 30,
          fill: 'red',
          render: point,
        },
      },
    ],
  };
}
