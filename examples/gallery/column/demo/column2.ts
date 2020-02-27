import { Chart } from '@antv/g2';

const data = [
  { type: '未知', value: 654, percent: 0.02 },
  { type: '17 岁以下', value: 654, percent: 0.02 },
  { type: '18-24 岁', value: 4400, percent: 0.2 },
  { type: '25-29 岁', value: 5300, percent: 0.24 },
  { type: '30-39 岁', value: 6200, percent: 0.28 },
  { type: '40-49 岁', value: 3300, percent: 0.14 },
  { type: '50 岁以上', value: 1500, percent: 0.06 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
  height: 500,
  padding: [50, 20, 50, 20],
});
chart.data(data);
chart.scale('value', {
  alias: '销售额(万)',
});

chart.axis('type', {
  tickLine: {
    alignTick: false,
  },
});
chart.axis('value', false);

chart.tooltip({
  showMarkers: false,
});
chart.interval().position('type*value');
chart.interaction('element-active');

// 添加文本标注
data.forEach((item) => {
  chart
    .annotation()
    .text({
      position: [item.type, item.value],
      content: item.value,
      style: {
        textAlign: 'center',
      },
      offsetY: -30,
    })
    .text({
      position: [item.type, item.value],
      content: (item.percent * 100).toFixed(0) + '%',
      style: {
        textAlign: 'center',
      },
      offsetY: -12,
    });
});
chart.render();
