/**
 * A recreation of this demo: https://observablehq.com/@harrystevens/introducing-d3-regression#quadratic
 */
import { Chart } from '@antv/g2';
import { regressionQuad } from 'd3-regression';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

const regression = regressionQuad()
  .x((d) => d.x)
  .y((d) => d.y)
  .domain([-4, 4]);

chart.options({
  type: 'view',
  data: [
    { x: -3, y: 7.5 },
    { x: -2, y: 3 },
    { x: -1, y: 0.5 },
    { x: 0, y: 1 },
    { x: 1, y: 3 },
    { x: 2, y: 6 },
    { x: 3, y: 14 },
  ],
  children: [
    {
      type: 'point',
      encode: {
        x: 'x',
        y: 'y',
        shape: 'point',
      },
      scale: {
        x: { domain: [-4, 4] },
        y: { domain: [-2, 14] },
      },
      style: {
        fillOpacity: 0.75,
      },
      axis: {
        x: { title: false },
        y: { title: false },
      },
    },
    {
      type: 'line',
      data: {
        transform: [
          {
            type: 'custom',
            callback: regression,
          },
        ],
      },
      encode: {
        x: (d) => d[0],
        y: (d) => d[1],
      },
      style: {
        stroke: '#30BF78',
        lineWidth: 2,
      },
      tooltip: false,
    },
    {
      type: 'lineX',
      data: [0],
    },
    {
      type: 'lineY',
      data: [0],
    },
  ],
});

chart.render();
