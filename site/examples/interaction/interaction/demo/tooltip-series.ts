import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
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
  .encode('title', (d) => d.Date.toLocaleString())
  .axis('y', { title: '↑ Change in price (%)' })
  .label({
    text: 'Symbol',
    selector: 'last',
    fontSize: 10,
  });

chart.interaction({
  type: 'tooltip',
  item: ({ value }) => ({ value: value.toFixed(1) }),
});

chart.render();
