/**
 * A recreation of this demo: https://canisjs.github.io/canis-editor/index.html?exmp=os_1
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  children: [
    {
      type: 'area',
      data: {
        type: 'fetch',
        value: 'https://assets.antv.antgroup.com/g2/os.json',
      },
      encode: {
        x: 'Year',
        y: 'Share',
        color: 'OperatingSystem',
        shape: 'smooth',
      },
      transform: [
        { type: 'stackEnter', groupBy: 'color', duration: 5000 },
        { type: 'stackY', orderBy: 'value' },
      ],
      animate: {
        enter: { type: 'growInX' },
      },
    },
  ],
});

chart.render();
