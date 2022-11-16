/**
 * A recreation of this demo: https://vega.github.io/vega-lite/examples/layer_bar_annotations.html
 *
 * We use a range mark to highlight the values beyond a threshold
 */
import { Chart } from '@antv/g2';
import { greatest } from 'd3-array';

function threshold(data) {
  const max = greatest(data, (a, b) => a['Value'] - b['Value']) as any;
  const { Day: x, Value: y } = max;
  return [{ x: [x, x], y: [300, y] }];
}

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart
  .data([
    { Day: 1, Value: 54.8 },
    { Day: 2, Value: 112.1 },
    { Day: 3, Value: 63.6 },
    { Day: 4, Value: 37.6 },
    { Day: 5, Value: 79.7 },
    { Day: 6, Value: 137.9 },
    { Day: 7, Value: 120.1 },
    { Day: 8, Value: 103.3 },
    { Day: 9, Value: 394.8 },
    { Day: 10, Value: 199.5 },
    { Day: 11, Value: 72.3 },
    { Day: 12, Value: 51.1 },
    { Day: 13, Value: 112.0 },
    { Day: 14, Value: 174.5 },
    { Day: 15, Value: 130.5 },
  ])
  .axis('y', { title: false });

chart.interval().encode('x', 'Day').encode('y', 'Value');

chart
  .range()
  .data({ transform: [{ type: 'custom', callback: threshold }] })
  .encode('x', 'x')
  .encode('y', 'y')
  .encode('color', '#F4664A');

chart.lineY().encode('y', 300).style('stroke', '#000').label({
  text: 'hazardous',
  position: 'right',
  textBaseline: 'bottom',
  dy: -2,
  stroke: '#fff',
});

chart.render();
