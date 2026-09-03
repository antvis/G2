import { Chart } from '@antv/g2';

// 模拟数据
const data = [];
const groups = ['WT', 'KO'];
const hours = 72;
const baseValues = {
  WT: 2.0,
  KO: 2.3,
};

for (let i = 0; i < hours; i++) {
  const time = `${i}h`;
  groups.forEach((group) => {
    const fluctuation = Math.random() * 0.4 - 0.2;
    data.push({
      time,
      group,
      logFPKM: baseValues[group] + Math.sin(i / 10) * 0.3 + fluctuation, // 模拟趋势变化
    });
  });
}

const chart = new Chart({
  container: 'container',
  autoFit: true,
  height: 600,
  padding: [50, 50, 50, 50],
});

chart.options({
  type: 'view',
  data: data,
  coordinate: {
    type: 'helix',
    startAngle: 0.2 * Math.PI,
    endAngle: 6.5 * Math.PI,
    innerRadius: 0.1,
  },
  children: [
    {
      type: 'interval',
      encode: {
        x: 'time',
        y: 'group',
        color: 'logFPKM',
      },
      scale: {
        color: {
          type: 'linear',
          range: ['#fff', '#ec4839'],
        },
      },
      tooltip: {
        title: 'time',
        items: [
          { field: 'group', name: '组别' },
          {
            field: 'logFPKM',
            name: 'log(FPKM)',
            valueFormatter: (value) => value.toFixed(2),
          },
        ],
      },
      animate: {
        enter: {
          type: 'fadeIn',
          duration: 1000,
        },
      },
    },
  ],
});

chart.render();
