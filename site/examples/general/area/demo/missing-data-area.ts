import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container' });

chart.options({
  type: 'area',
  autoFit: true,
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/aapl.json',
  },
  encode: {
    x: (d) => new Date(d.date),
    // Mock missing data. Set NaN from Jan. to Mar.
    y: (d) => (new Date(d.date).getUTCMonth() <= 3 ? NaN : d.close),
  },
  style: {
    connect: true,
    // 配置connector样式
    connectFill: 'grey',
    connectFillOpacity: 0.15,
    // 配置area样式
    fill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff',
    opacity: 0.9,
    stroke: 'yellow',
  },
});

chart.render();
