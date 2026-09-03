import { Chart } from '@antv/g2';

const data = [
  { type: '1-3秒', value: 0.16 },
  { type: '4-10秒', value: 0.125 },
  { type: '11-30秒', value: 0.2 },
  { type: '1-3分', value: 0.2 },
  { type: '3-10分', value: 0.05 },
  { type: '10-30分', value: 0.01 },
  { type: '30+分', value: 0.015 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
  theme: 'dark',
});

chart.options({
  type: 'view',
  data: data,
  coordinate: { type: 'radial', innerRadius: 0.35 },
  children: [
    {
      type: 'interval',
      encode: {
        x: 'type',
        y: 0.2,
      },
      style: {
        fill: '#202020',
      },
      state: {
        active: { strokeWidth: 0 },
      },
      tooltip: false,
    },
    {
      type: 'interval',
      encode: {
        x: 'type',
        y: 'value',
        color: [
          (val) =>
            val.type === '10-30分' || val.type === '30+分' ? 'high' : 'low',
        ],
      },
      scale: {
        color: { range: ['#5B8FF9', '#ff4d4f'] },
      },
      style: {
        radius: 20,
      },
      tooltip: {
        items: [
          (item) => ({
            name: item.type,
            value: item.value,
          }),
        ],
      },
      axis: false,
      legend: false,
      state: {
        active: { stroke: '#fff', strokeWidth: 1 },
      },
      interaction: {
        elementHighlight: true,
      },
    },
    {
      type: 'image',
      style: {
        x: '50%',
        y: '50%',
        width: 100,
        height: 80,
      },
      encode: {
        src: 'https://gw.alipayobjects.com/mdn/rms_ef85c6/afts/img/A*0DYiQKP08cQAAAAAAAAAAAAAARQnAQ',
      },
      tooltip: false,
    },
  ],
});

chart.render();
