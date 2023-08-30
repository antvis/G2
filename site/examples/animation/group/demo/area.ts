/**
 * A recreation of this demo: https://canisjs.github.io/canis-editor/index.html?exmp=os_1
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart
  .area()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/os.json',
  })
  .encode('x', 'Year')
  .encode('y', 'Share')
  .encode('color', 'OperatingSystem')
  .encode('shape', 'smooth')
  .transform({ type: 'stackEnter', groupBy: 'color', duration: 5000 })
  .transform({ type: 'stackY', orderBy: 'value' })
  .animate('enter', { type: 'growInX' });

chart.render();
