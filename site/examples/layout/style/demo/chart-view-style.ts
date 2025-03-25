import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container' });

chart.options({
  viewStyle: {
    // 配置图表的视图区域的样式
    viewFill: '#DCEEFE',
    viewRadius: 20,

    // 配置图表的绘制区域的样式
    plotFill: '#fff',
    plotFillOpacity: 0.45,
    plotStroke: 'yellow',
    plotLineWidth: 4,

    // 配置图表的主区域的样式
    mainFill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff',
    mainFillOpacity: 0.75,

    // 配置图表的内容区域的样式
    contentFill: 'l(90) 0:#ffadad 0.5:#ffd6a5 1:#fdffb6',
    contentShadowColor: '#5d5d5d',
    contentShadowBlur: 40,
    contentShadowOffsetX: 5,
    contentShadowOffsetY: 5,
  },
  type: 'area',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/aapl.json',
  },
  encode: {
    x: (d) => new Date(d.date),
    y: 'close',
  },
  axis: false,
  style: {
    fill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff',
    fillOpacity: 0.9,
  },
  height: 350,
  width: 700,
  margin: 30,
  padding: 20,
  inset: 15,
  legend: false,
});

chart.render();
