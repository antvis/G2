/**
 * A recreation of this demo: https://vega.github.io/vega-lite/examples/bar_diverging_stack_transform.html
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

const types = [
  'Strongly disagree',
  'Disagree',
  'Neither agree nor disagree',
  'Agree',
  'Strongly agree',
];
const colors = ['#c30d24', '#f3a583', '#cccccc', '#94c6da', '#1770ab'];

chart.coordinate({ transform: [{ type: 'transpose' }] });

chart
  .interval()
  .data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/82c97016-0f99-433b-ab21-9ecf14244610.csv',
  })
  .transform({ type: 'stackY' })
  .encode('x', 'question')
  .encode('color', 'type')
  .encode('y', (d) =>
    d.type === 'Disagree' || d.type === 'Strongly disagree'
      ? -d.percentage
      : d.type === 'Neither agree nor disagree'
      ? -d.percentage / 2
      : +d.percentage,
  )
  .scale('y', { nice: true })
  .scale('color', { domain: types, range: colors });

chart.render();
