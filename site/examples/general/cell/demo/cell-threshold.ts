import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  width: 900,
  height: 340,
});

chart.options({
  type: 'view',
  children: [
    {
      type: 'cell',
      data: {
        type: 'fetch',
        value:
          'https://gw.alipayobjects.com/os/bmw-prod/89c20fe8-0c6f-46c8-b36b-4cb653dba8ed.json',
        transform: [{ type: 'map', callback: (d) => ({ salary: d }) }],
      },
      scale: {
        color: {
          type: 'threshold',
          domain: [10000, 100000],
          range: ['#eee', 'pink', 'red'],
        },
      },
      encode: {
        y: (_, i) => (i % 5) + 1,
        x: (_, i) => ((i / 5) | 0) + 1,
        color: 'salary',
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
