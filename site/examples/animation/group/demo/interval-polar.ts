/**
 * A recreation of this demo: https://canisjs.github.io/canis-editor/index.html?exmp=nightingale_1
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.coordinate({ type: 'polar' });

chart
  .interval()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/deaths.json',
  })
  .transform({ type: 'stackY' })
  .transform({ type: 'stackEnter', groupBy: ['color', 'x'], duration: 2000 })
  .encode('x', 'Month')
  .encode('y', 'Death')
  .encode('color', 'Type')
  .scale('y', {
    type: 'sqrt',
  })
  .animate('enter', { type: 'waveIn' })
  .axis('y', false);

chart.render();
