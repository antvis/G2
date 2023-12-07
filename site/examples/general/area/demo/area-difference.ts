import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.data({
  type: 'fetch',
  value: 'https://assets.antv.antgroup.com/g2/temperature-compare.json',
});

chart
  .area()
  .data({
    transform: [
      {
        type: 'fold',
        fields: ['New York', 'San Francisco'],
        key: 'city',
        value: 'temperature',
      },
    ],
  })
  .transform([{ type: 'diffY' }]) // Diff the 2 area shape.
  .encode('x', (d) => new Date(d.date))
  .encode('y', 'temperature')
  .encode('color', 'city')
  .encode('shape', 'hvh');
// .scale('color', { range: ['#67a9cf', '#ef8a62'] });

chart
  .line()
  .encode('x', (d) => new Date(d.date))
  .encode('y', 'San Francisco')
  .encode('shape', 'hvh')
  .style('stroke', '#000')
  .tooltip(false);

chart.render();
