/**
 * A recreation of this demo: https://observablehq.com/@d3/radial-area-chart
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  width: 954,
  height: 954,
});

chart.data({
  type: 'fetch',
  value: 'https://assets.antv.antgroup.com/g2/seasonal-weather.json',
  transform: [
    {
      type: 'map',
      callback: (d) => ({
        ...d,
        date: new Date(d.date),
      }),
    },
  ],
});

chart.coordinate({ type: 'polar', innerRadius: 0.4 });

chart
  .axis('y', {
    zIndex: 1,
    direction: 'center',
    title: null,
    labelFormatter: (d, i, array) =>
      i === array.length - 1 ? `${d}°F` : `${d}`,
    labelStroke: '#fff',
    labelLineWidth: 5,
  })
  .axis('x', {
    grid: true,
    position: 'inner',
  })
  .scale('x', { utc: true });

chart
  .area()
  .encode('x', 'date')
  .encode('y', ['minmin', 'maxmax'])
  .style('fill', 'lightsteelblue')
  .style('fillOpacity', 0.2);

chart
  .area()
  .encode('x', 'date')
  .encode('y', ['min', 'max'])
  .style('fill', 'steelblue')
  .style('fillOpacity', 0.2);

chart
  .line()
  .encode('x', 'date')
  .encode('y', 'avg')
  .style('stroke', 'steelblue')
  .style('lineWidth', 1.5)
  .tooltip({ channel: 'y', valueFormatter: '.1f' });

chart.render();
