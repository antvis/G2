import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart
  .area()
  .data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/e58c9758-0a09-4527-aa90-fbf175b45925.json',
  })
  .transform({ type: 'stackY', orderBy: 'value' })
  .encode('x', (d) => new Date(d.date))
  .encode('y', 'unemployed')
  .encode('color', 'industry')
  .encode('shape', 'smooth')
  .scale('x', { utc: true })
  .axis('x', { title: 'Date' })
  .axis('y', { labelFormatter: '~s' })
  .legend('color', { size: 72, autoWrap: true, maxRows: 3, cols: 6 });

chart.render();
