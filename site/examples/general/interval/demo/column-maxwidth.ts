import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart
  .interval()
  .data([{ letter: 'A', frequency: 120 }])
  .encode('x', 'letter')
  .encode('y', 'frequency')
  .scale('x', { padding: 0.5 })
  // .style('minWidth', 500)
  .style('maxWidth', 200);

chart.render();
