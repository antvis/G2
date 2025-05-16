// 从源码中引入G2
import { Chart } from '../src/index';

const chart = new Chart({ container: 'container' });

const option = {
  type: 'view',
  children: [
    {
      type: 'interval',
      data: [
        {
          '5af4d578-b243-4cfd-96f8-ad7a21069e82': '2025-05-13',
          '1299bee1-f723-470c-91d3-1358c19e9e8c': 10400628.99,
        },
      ],
      encode: {
        x: '5af4d578-b243-4cfd-96f8-ad7a21069e82',
        y: '1299bee1-f723-470c-91d3-1358c19e9e8c',
      },
      labels: [
        {
          text: '1299bee1-f723-470c-91d3-1358c19e9e8c',
          position: 'inside',
          fill: '#000',
        },
      ],
    },
  ],
};

chart.options(option);
chart.render();

setTimeout(() => {
  // 很奇怪，只触发了一次render
  // 因为上一次 render 被 clear 一直没被 resolve，所以下一次被饿死了 
  chart.clear();
  chart.options(option);
  chart.render();
}, 100);
