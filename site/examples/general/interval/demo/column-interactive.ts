/**
 * A recreation of this demo: https://observablehq.com/@d3/bar-chart
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart
  .interval()
  .data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
  })
  .encode('x', 'letter')
  .encode('y', 'frequency')
  .axis('y', { labelFormatter: '.0%' })
  .state('selected', { fill: '#1783FF', stroke: 'black', strokeWidth: 1 })
  .state('unselected', { fill: '#ccc' })
  .interaction('elementSelect'); // 设置高亮交互;

chart.render();
