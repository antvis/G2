import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  children: [
    {
      type: 'interval',
      data: [
        { type: 'Apple', year: '2001', value: 260 },
        { type: 'Orange', year: '2001', value: 100 },
        { type: 'Banana', year: '2001', value: 90 },
        { type: 'Apple', year: '2002', value: 210 },
        { type: 'Orange', year: '2002', value: 150 },
        { type: 'Banana', year: '2002', value: 30 },
      ],
      transform: [{ type: 'stackEnter', groupBy: 'x' }],
      encode: {
        x: 'year',
        y: 'value',
        color: 'type',
        series: 'type',
        enterDuration: 1000,
      },
    },
  ],
});

chart.render();
