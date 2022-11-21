import { Chart, register } from '@antv/g2';

register('palette.customPalette', () => [
  '#1677FF',
  '#39C8AE',
  '#C7B1FB',
  '#F58773',
  '#FEAA4A',
  '#ED6DC6',
  '#00875B',
  '#765CE7',
  '#65799B',
  '#C4CD2A',
]);

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.theme({
  defaultCategory10: 'customPalette',
  defaultCategory20: 'customPalette',
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
