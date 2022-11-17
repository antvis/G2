import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.data({
  type: 'fetch',
  value: 'https://assets.antv.antgroup.com/g2/unemployment-by-industry.json',
  transform: [
    {
      type: 'map',
      callback: (d) => ({
        ...d,
        date: new Date(d.date),
      }),
    },
  ],
});

chart
  .area()
  .transform({ type: 'stackY' })
  .transform({ type: 'symmetryY' })
  .encode('x', 'date')
  .encode('y', 'unemployed')
  .encode('color', 'industry');

chart.render();
