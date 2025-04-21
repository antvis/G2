import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container' });

chart.options({
  type: 'view',
  autoFit: true,
  paddingRight: 10,
  data: [
    { month: '一月', rank: 200 },
    { month: '二月', rank: 160 },
    { month: '三月', rank: 100 },
    { month: '四月', rank: 80 },
    { month: '五月', rank: 99 },
    { month: '六月', rank: 36 },
    { month: '七月', rank: 40 },
    { month: '八月', rank: 20 },
    { month: '九月', rank: 12 },
    { month: '十月', rank: 15 },
    { month: '十一月', rank: 6 },
    { month: '十二月', rank: 1 },
  ],
  scale: {
    y: {
      nice: true,
      tickMethod: () => [0, 50, 100, 170, 199],
    },
  },
  axis: {
    y: {
      labelFormatter: (d) => `第${200 - d}名`,
    },
  },
  children: [
    {
      type: 'area',
      encode: { x: (d) => d.month, y: (d) => 200 - d.rank, shape: 'smooth' },
      style: { opacity: 0.2 },
      axis: { y: { labelFormatter: '~s', title: false } },
      style: {
        fill: 'l(270) 0:#ffffff 0.9:#7ec2f3 1:#1890ff',
        fillOpacity: 0.2,
      },
      tooltip: false,
    },
    {
      type: 'line',
      encode: { x: (d) => d.month, y: (d) => 200 - d.rank, shape: 'smooth' },
      interaction: {
        tooltip: {
          render: (event, { title, items }) => `
<div style="display: flex; align-items: center;">
  <span>${title}：第</span>
  <h2
    style="
        margin-left: 8px;
        margin-right: 8px;
        margin-top:4px;
        font-size: 18px;
        line-height: 36px;
        font-weight: 500px"
  >
    ${200 - items[0].value}
  </h2>
  <span>名</span>
</div>
          `,
        },
      },
      style: {
        lineWidth: 2,
      },
    },
  ],
});

chart.render();
