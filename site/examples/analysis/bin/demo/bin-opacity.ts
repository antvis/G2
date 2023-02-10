import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart
  .rect()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/athletes.json',
  })
  .encode('x', 'weight')
  .encode('y', 'height')
  .encode('color', 'sex')
  .legend({ color: { itemMarker: 'square' } })
  .transform({ type: 'bin', opacity: 'count' })
  .style('inset', 0.5);

chart.render();
