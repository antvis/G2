import { Chart } from '@antv/g2';

const labelFormatter = (d) => Math.abs(d) + (d < 0 ? 'BC' : d > 0 ? 'AC' : '');
const left = (d) => d.end > -1500 && d.start > -3000;

const chart = new Chart({
  container: 'container',
  width: 900,
  height: 1000,
});

chart.coordinate({ transform: [{ type: 'transpose' }] });

chart
  .interval()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/world-history.json',
  })
  .transform({ type: 'sortX', by: 'y' })
  .transform({ type: 'sortColor', by: 'y', reducer: 'min' })
  .axis('y', [
    {
      tickCount: 5,
      labelFormatter,
      grid: null,
      title: null,
    },
    {
      position: 'top',
      labelFormatter,
      title: null,
    },
  ])
  .axis('x', false)
  .encode('x', 'civilization')
  .encode('y', ['start', 'end'])
  .encode('color', 'region')
  .scale('color', { palette: 'set2' })
  .label({
    text: 'civilization',
    position: (d) => (left(d) ? 'left' : 'right'),
    textAlign: (d) => (left(d) ? 'end' : 'start'),
    dx: (d) => (left(d) ? -5 : 5),
    fontSize: 10,
  })
  .tooltip([
    { name: 'start', field: 'start', valueFormatter: labelFormatter },
    { name: 'end', field: 'end', valueFormatter: labelFormatter },
  ]);

chart.render();
