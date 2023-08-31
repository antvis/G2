import { Chart } from '@antv/g2';
import { Renderer } from '@antv/g-webgl';

const chart = new Chart({
  container: 'container',
  autoFit: true,
  renderer: new Renderer(),
});

const flex = chart
  .spaceFlex()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/seattle-weather.json',
  })
  .attr('direction', 'col')
  .attr('ratio', [1, 1]);

const flex1 = flex.spaceFlex().attr('direction', 'row').attr('ratio', [1, 1]);

flex1
  .interval()
  .transform({ type: 'groupX', y: 'mean' })
  .encode('x', (d) => new Date(d.date).getUTCMonth())
  .encode('y', 'precipitation');

flex1
  .line()
  .transform({ type: 'groupX', y: 'mean' })
  .encode('x', (d) => new Date(d.date).getUTCMonth())
  .encode('y', 'wind')
  .encode('shape', 'smooth');

const flex2 = flex.spaceFlex().attr('direction', 'row').attr('ratio', [1, 1]);

flex2
  .area()
  .transform({ type: 'groupX', y: 'mean' })
  .encode('x', (d) => new Date(d.date).getUTCMonth())
  .encode('y', ['temp_min', 'temp_max'])
  .encode('shape', 'smooth');

flex2
  .point()
  .transform({ type: 'groupX', y: 'mean' })
  .encode('x', 'temp_min')
  .encode('y', 'temp_max')
  .encode('shape', 'point');

chart.render();
