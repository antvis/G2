/**
 * A recreation of this demo: https://www.highcharts.com.cn/demo/highcharts/variwide
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  width: 1000,
});

chart
  .interval()
  .data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/90873879-09d7-4842-a493-03fb560267bc.csv',
  })
  .transform({ type: 'flexX', field: 'gdp' })
  .encode('x', 'country')
  .encode('y', 'value')
  .encode('color', 'country')
  .axis('y', { labelFormatter: '~s' })
  .tooltip(['value', 'gdp']);

chart.render();
