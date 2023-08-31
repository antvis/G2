/**
 * A recreation of this demo: https://vega.github.io/vega-lite/examples/layer_bar_annotations.html
 *
 * We use a range mark to highlight the values beyond a threshold
 */
import { Chart } from '@antv/g2';

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
  .data({
    transform: [
      {
        type: 'custom',
        callback: (data) => overThreshold(data, 300),
      },
    ],
  })
  .encode('x', 'x')
  .encode('y', 'y')
  .encode('color', '#F4664A');

chart
  .lineY()
  .data([300])
  .style('stroke', '#F4664A')
  .style('lineDash', [3, 3])
  .style('arrow', true)
  .label({
    text: 'hazardous',
    position: 'right',
    textBaseline: 'bottom',
    fill: '#F4664A',
    background: true,
    backgroundFill: '#F4664A',
    backgroundOpacity: 0.25,
  });

chart.render();

// Process data.
function overThreshold(data, threshold) {
  return data
    .filter((d) => d['Value'] >= threshold)
    .map(({ Day: x, Value: y }) => ({ x: [x, x], y: [threshold, y] }));
}
