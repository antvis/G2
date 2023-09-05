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
  .encode('x', (d) => new Date(d.Date))
  .encode('y', 'Close')
  .encode('color', 'Symbol')
  .encode('key', 'Symbol')
  .encode('title', (d) => d.Date.toLocaleString())
  .axis('y', { title: '↑ Change in price (%)', labelAutoRotate: false })
  .scale('y', { type: 'log' })
  .label({
    text: 'Symbol',
    selector: 'last',
    fontSize: 10,
  });

chart
  .interaction('chartIndex', {
    ruleStroke: '#aaa',
    labelDx: 5,
    labelTextAlign: 'center',
    labelStroke: '#fff',
    labelLineWidth: 5,
    labelFormatter: (d) => `${d.toLocaleDateString()}`,
  })
  .interaction('tooltip', false);

chart.render();
