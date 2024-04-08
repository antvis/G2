/**
 * A recreation of this demo: https://canisjs.github.io/canis-editor/index.html?exmp=purchases_1
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.data({
  type: 'fetch',
  value: 'https://assets.antv.antgroup.com/g2/doughnut-purchases.json',
});

chart
  .line()
  .encode('x', 'year')
  .encode('y', 'count')
  .encode('color', 'year')
  .encode('shape', 'smooth')
  .scale('y', { zero: true, nice: true })
  .style('gradient', 'x')
  .style('gradientColor', 'start')
  .animate('enter', { type: 'pathIn', duration: 3000 })
  .axis('y', { labelFormatter: '~s' });

chart
  .point()
  .transform({ type: 'stackEnter' })
  .encode('x', 'year')
  .encode('y', 'count')
  .encode('color', 'year')
  .encode('shape', 'point')
  .animate('enter', { duration: 300 });

chart
  .text()
  .transform({ type: 'stackEnter' })
  .encode('x', 'year')
  .encode('y', 'count')
  .encode('text', 'year')
  .animate('enter', { duration: 300 })
  .style('lineWidth', 5)
  .style('stroke', '#fff')
  .style('textAlign', 'center')
  .style('dy', -8);

chart.render();
