/**
 * A recreation of one of these demos: https://observablehq.com/@observablehq/plot-group?collection=@observablehq/plot
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  height: 120,
});

chart.coordinate({ transform: [{ type: 'transpose' }] });

chart
  .interval()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/penguins.json',
  })
  .transform({ type: 'groupColor', y: 'count' })
  .transform({ type: 'stackY' })
  .transform({ type: 'normalizeY' })
  .axis('y', { labelFormatter: '.0%' })
  .encode('color', 'sex')
  .label({ text: 'sex', position: 'inside' })
  .tooltip({ channel: 'y', valueFormatter: '.0%' });

chart.render();
