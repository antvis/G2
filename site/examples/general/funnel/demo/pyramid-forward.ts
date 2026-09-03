import { Chart } from '@antv/g2';

const data = [
  { text: '顶层', value: 5 },
  { text: '中上层', value: 10 },
  { text: '中等', value: 20 },
  { text: '中下层', value: 25 },
  { text: '底层', value: 40 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  coordinate: {
    transform: [{ type: 'transpose' }],
  },
  data: data,
  children: [
    {
      type: 'interval',
      encode: {
        x: 'text',
        y: 'value',
        color: 'text',
        shape: 'pyramid',
      },
      transform: [{ type: 'symmetryY' }],
      scale: {
        x: { paddingOuter: 0, paddingInner: 0 },
        color: { type: 'ordinal' },
      },
      labels: [
        {
          text: (d) => d.text,
          position: 'inside',
        },
        {
          text: (d) => d.value + '%',
          position: 'inside',
          style: { dy: 15 },
        },
      ],
      style: {
        reverse: true,
      },
      axis: false,
    },
  ],
});

chart.render();
