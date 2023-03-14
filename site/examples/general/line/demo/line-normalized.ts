import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
  autoFit: true,
  paddingLeft: 50,
});

chart
  .line()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/indices.json',
  })
  .transform({ type: 'normalizeY', basis: 'first', groupBy: 'color' })
  .encode('x', (d) => new Date(d.Date))
  .encode('y', 'Close')
  .encode('color', 'Symbol')
  .scale('y', { type: 'log' })
  .axis('y', { title: '↑ Change in price (%)' })
  .label({
    text: 'Symbol',
    selector: 'last',
    style: {
      fontSize: 10,
    },
  })
  .tooltip({ channel: 'y', valueFormatter: '.1f' });

chart.render();
