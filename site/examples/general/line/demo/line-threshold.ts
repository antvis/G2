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

    chart.options({
      type: 'view',
      children: [
        {
          type: 'line',
          data: data,
          scale: {
            y: { nice: true },
            x: { utc: true },
            color: {
              type: 'threshold',
              domain: [medianValue],
              range: ['black', 'red'],
            },
          },
          encode: {
            x: (d) => new Date(d.date),
            y: 'value',
            shape: 'hvh',
            color: 'value',
            series: () => undefined,
          },
          style: {
            gradient: 'y',
            lineWidth: 1.5,
            lineJoin: 'round',
          },
          axis: {
            x: { title: 'date' },
          },
        },
      ],
    });

    chart.render();
  });
