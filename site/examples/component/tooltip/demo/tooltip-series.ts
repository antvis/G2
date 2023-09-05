import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
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
  .axis('y', { title: '↑ Change in price (%)' })
  .tooltip({
    title: (d) => new Date(d.Date).toUTCString(),
    items: [
      (d, i, data, column) => ({
        name: 'Close',
        value: column.y.value[i].toFixed(1),
      }),
    ],
  })
  .label({
    text: 'Symbol',
    selector: 'last',
    fontSize: 10,
  });

chart.render();
