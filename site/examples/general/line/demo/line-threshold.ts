/**
 * A recreation of this demo: https://observablehq.com/@d3/threshold-encoding
 */
import { Chart } from '@antv/g2';
import { median } from 'd3-array';

fetch('https://assets.antv.antgroup.com/g2/temperatures2.json')
  .then((res) => res.json())
  .then((data) => {
    const medianValue = median(data, (d) => d.value);

    const chart = new Chart({
      container: 'container',
      autoFit: true,
    });

    chart
      .line()
      .data(data)
      .scale('y', { nice: true })
      .scale('x', { utc: true })
      .scale('color', {
        type: 'threshold',
        domain: [medianValue],
        range: ['black', 'red'],
      })
      .encode('x', (d) => new Date(d.date))
      .encode('y', 'value')
      .encode('shape', 'hvh')
      .encode('color', 'value')
      .encode('series', () => undefined)
      .style('gradient', 'y')
      .style('lineWidth', 1.5)
      .style('lineJoin', 'round')
      .axis('x', { title: 'date' });

    chart.render();
  });
