import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  width: 600,
  height: 470,
  type: 'view',
  children: [
    {
      type: 'point',
      data: {
        type: 'fetch',
        value:
          'https://gw.alipayobjects.com/os/basement_prod/6b4aa721-b039-49b9-99d8-540b3f87d339.json',
      },
      encode: { x: 'height', y: 'weight', color: 'gender' },
    },
    { type: 'rangeY', data: [{ y: [54, 72] }], encode: { y: 'y' } },
  ],
});

chart.render();
