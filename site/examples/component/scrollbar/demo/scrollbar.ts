import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

// 开启 X 轴方向上的滚动条
chart.options({
  type: 'view',
  children: [
    {
      type: 'line',
      data: {
        type: 'fetch',
        value:
          'https://gw.alipayobjects.com/os/bmw-prod/551d80c6-a6be-4f3c-a82a-abd739e12977.csv',
      },
      encode: {
        x: 'date',
        y: 'close',
      },
      scrollbar: {
        x: {},
        y: { value: 0.2 },
      },
    },
  ],
});

chart.on('afterrender', () => {
  const { canvas } = chart.getContext();
  const { document } = canvas;
  document
    .querySelector('.g2-scrollbar')
    .addEventListener('valuechange', (evt) => {
      console.info(evt.detail);
    });
});

chart.render();
