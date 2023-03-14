import { G2Spec } from '../../../src';

export function bulletSpace(): G2Spec {
  return {
    type: 'spaceFlex',
    children: [
      {
        type: 'bullet',
        data: [
          {
            title: 'Revenue',
            ranges: [150, 225, 300],
            measures: [220, 270],
            target: [250],
          },
        ],
      },
      {
        type: 'bullet',
        data: [
          {
            title: 'Profit',
            ranges: [20, 25, 60],
            measures: [21, 23],
            target: [55],
          },
        ],
      },
      {
        type: 'bullet',
        data: [
          {
            title: 'Order Size',
            ranges: [350, 500, 600],
            measures: [100, 320],
            target: [550],
          },
        ],
      },
      {
        type: 'bullet',
        data: [
          {
            title: 'Satisfaction',
            ranges: [1400, 2000, 2600],
            measures: [1000, 1650],
            target: [2100],
          },
        ],
      },
    ],
  };
}
