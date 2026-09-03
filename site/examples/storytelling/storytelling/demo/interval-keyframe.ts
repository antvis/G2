import { Chart } from '@antv/g2';

const sex = [
  { city: 'A', sex: '男', value: 52 },
  { city: 'A', sex: '女', value: 48 },
  { city: 'B', sex: '男', value: 130 },
  { city: 'B', sex: '女', value: 70 },
];
const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'timingKeyframe',
  children: [
    {
      type: 'interval',
      data: sex,
      transform: [{ type: 'groupX', y: 'sum' }],
      encode: {
        x: 'city',
        y: 'value',
        key: 'city',
      },
    },
    {
      type: 'interval',
      data: sex,
      transform: [{ type: 'dodgeX' }],
      encode: {
        x: 'city',
        y: 'value',
        color: 'sex',
        groupKey: 'city',
      },
    },
  ],
});

chart.render();
