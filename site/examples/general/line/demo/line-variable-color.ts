/**
 * A recreation of this demo: https://observablehq.com/@d3/variable-color-line
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  children: [
    {
      type: 'line',
      data: {
        type: 'fetch',
        value: 'https://assets.antv.antgroup.com/g2/temperatures1.json',
      },
      scale: {
        y: { nice: true },
        color: {
          domain: ['CLR', 'FEW', 'SCT', 'BKN', 'OVC', 'VV '],
          range: [
            'deepskyblue',
            'lightskyblue',
            'lightblue',
            '#aaaaaa',
            '#666666',
            '#666666',
          ],
        },
      },
      encode: {
        x: (d) => new Date(d.date),
        y: 'value',
        shape: 'hvh',
        color: 'condition',
        series: () => 'a',
      },
      style: {
        gradient: 'x',
        lineWidth: 2,
      },
      axis: {
        x: { title: 'date' },
      },
    },
  ],
});

chart.render();
