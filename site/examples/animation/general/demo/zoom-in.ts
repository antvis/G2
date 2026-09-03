import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
  insetLeft: 30,
});

chart.options({
  type: 'view',
  children: [
    {
      type: 'point',
      data: {
        type: 'fetch',
        value:
          'https://gw.alipayobjects.com/os/antvdemo/assets/data/bubble.json',
      },
      encode: {
        x: 'GDP',
        y: 'LifeExpectancy',
        color: 'continent',
        size: 'Population',
        shape: 'point',
      },
      scale: {
        size: { range: [4, 65] },
        y: { domain: [65, 90] },
      },
      style: {
        fillOpacity: 0.3,
        lineWidth: 1,
      },
      legend: {
        size: false,
      },
      animate: {
        enter: { type: 'zoomIn', duration: 1000 },
      },
    },
  ],
});

chart.render();
