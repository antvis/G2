import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  height: 640,
});

chart.options({
  type: 'view',
  children: [
    {
      type: 'cell',
      data: {
        type: 'fetch',
        value:
          'https://gw.alipayobjects.com/os/bmw-prod/bd287f2c-3e2b-4d0a-8428-6a85211dce33.json',
      },
      scale: {
        color: { type: 'ordinal' },
      },
      encode: {
        x: 'x',
        y: 'y',
        color: 'index',
      },
      style: {
        stroke: '#000',
        inset: 2,
      },
      animate: {
        enter: { type: 'fadeIn' },
      },
    },
  ],
});

chart.render();
