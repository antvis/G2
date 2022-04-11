import { Chart } from '@antv/g2';

const data = [
  { type: '微博', value: 93.33 },
  { type: '其他', value: 6.67 },
  { type: '论坛', value: 4.77 },
  { type: '网站', value: 1.44 },
  { type: '微信', value: 1.12 },
  { type: '客户端', value: 1.05 },
  { type: '新闻', value: 0.81 },
  { type: '视频', value: 0.39 },
  { type: '博客', value: 0.37 },
  { type: '报刊', value: 0.17 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
  height: 500,
});

chart.coordinate('theta', {
  radius: 0.75,
});

chart.data(data);

chart.tooltip({
  showTitle: false,
  showMarkers: false,
});

chart
  .interval()
  .position('value')
  .color('type')
  .label('type*value', {
    layout: [{ type: 'pie-spider' }, { type: 'limit-in-plot', cfg: { action: 'ellipsis'/** 或 translate */ } }, ],
    labelHeight: 20,
    content: (obj) => `${obj.type} (${obj.value})`,
    labelLine: {
      style: {
        lineWidth: 0.5,
      },
    },
  })
  .adjust('stack');

chart.interaction('element-active');

chart.render();
