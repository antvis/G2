import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

const colors = {
  ranges: ['#ffebee', '#fff3e0', '#e8f5e8'],
  measures: '#1890ff',
  target: '#ff4d4f',
};

// 转换数据结构
const transformedData = [
  { title: '项目进度', value: 40, level: '差' },
  { title: '项目进度', value: 30, level: '良' },
  { title: '项目进度', value: 30, level: '优' },
];

const data = [
  { title: '项目进度', value: 60, type: '实际进度' },
  { title: '项目进度', value: 80, type: '目标进度' },
];

chart.options({
  type: 'view',
  coordinate: { transform: [{ type: 'transpose' }] },
  children: [
    {
      type: 'interval',
      data: transformedData,
      encode: { x: 'title', y: 'value', color: 'level' },
      transform: [{ type: 'stackY' }],
      scale: {
        color: {
          domain: ['差', '良', '优'],
          range: colors.ranges,
        },
      },
      style: { maxWidth: 30 },
    },
    {
      type: 'interval',
      data: {
        value: data,
        transform: [{ type: 'filter', callback: (d) => d.type === '实际进度' }],
      },
      encode: { x: 'title', y: 'value', color: colors.measures },
      style: { maxWidth: 16 },
    },
    {
      type: 'point',
      data: {
        value: data,
        transform: [{ type: 'filter', callback: (d) => d.type === '目标进度' }],
      },
      encode: {
        x: 'title',
        y: 'value',
        shape: 'line',
        color: colors.target,
        size: 8,
      },
      axis: { y: { grid: true, title: '进度 (%)' }, x: { title: false } },
    },
  ],
});
chart.render();
