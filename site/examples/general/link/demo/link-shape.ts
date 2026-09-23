/**
 * A recreation of this demo: https://observablehq.com/@observablehq/plot-link?collection=@observablehq/plot
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

const data = [
  { x1: 5, y1: 5, x2: 8, y2: 8, shape: 'link' },
  { x1: 5, y1: 12, x2: 8, y2: 15, shape: 'smooth' },
  { x1: 12, y1: 5, x2: 15, y2: 8, shape: 'vhv' },
  { x1: 12, y1: 12, x2: 15, y2: 15, shape: 'arc' },
];

chart.options({
  type: 'view',
  children: data.map((datum) => ({
    type: 'link',
    data: [datum],
    encode: { x: ['x1', 'x2'], y: ['y1', 'y2'] },
    scale: {
      x: { domainMin: 2, domainMax: 22 },
      y: { domainMin: 4, domainMax: 18 },
    },
    style: {
      arrow: true,
      arrowSize: 10,
      lineWidth: 5,
      stroke: '#1f1aa1',
      shape: datum.shape,
    },
  })),
});

chart.render();
