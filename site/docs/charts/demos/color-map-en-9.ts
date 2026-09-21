import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

// 生成示例数据
const rows = ['A', 'B', 'C', 'D', 'E'];
const cols = ['P1', 'P2', 'P3', 'P4', 'P5', 'P6'];
const data = [];

rows.forEach((row) => {
  cols.forEach((col) => {
    const value = Math.floor(Math.random() * 100);
    const baseline = 50;
    data.push({
      row,
      col,
      value,
      diff: value - baseline,
      performance: value >= baseline ? '达标' : '不达标',
    });
  });
});
console.log('data', data);

chart.options({
  type: 'view',
  autoFit: true,
  data,
  children: [
    {
      type: 'cell',
      encode: {
        x: 'col',
        y: 'row',
        color: 'diff',
      },
      style: {
        inset: 2,
      },
      labels: [
        {
          text: 'value',
          style: {
            fill: (d) => (Math.abs(d.diff) > 25 ? '#fff' : '#000'),
            textAlign: 'center',
            fontWeight: 'bold',
          },
        },
      ],
    },
  ],
  scale: {
    color: {
      type: 'threshold',
      domain: [0],
      range: ['#2B83BA', '#D7191C'],
    },
  },
  tooltip: {
    title: (d) => `${d.row}-${d.col}`,
    items: [
      { field: 'value', name: '数值' },
      { field: 'diff', name: '与基准差异' },
      { field: 'performance', name: '达标状态' },
    ],
  },
  legend: false,
  interaction: [{ type: 'tooltip' }, { type: 'elementHighlight' }],
});

chart.render();
