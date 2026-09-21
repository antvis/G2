import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'polygon',
  width: 200,
  height: 200,
  paddingTop: 0,
  paddingLeft: 0,
  paddingBottom: 0,
  paddingRight: 0,
  data: [
    { id: 'Big Triangle 1', x: [0, 2, 0], y: [0, 0, 2], area: 2 },
    { id: 'Big Triangle 2', x: [0, -2, 0], y: [0, 0, 2], area: 2 },
    { id: 'Medium Triangle', x: [1, 0, -1], y: [-1, -2, -1], area: 1 },
    { id: 'Small Triangle 1', x: [-2, -1, -1], y: [0, 0, -1], area: 0.5 },
    { id: 'Small Triangle 2', x: [0, 1, 0], y: [0, 0, -1], area: 0.5 },
    { id: 'Square', x: [0, 0, -1, -1], y: [0, -1, -1, 0], area: 1 },
    { id: 'Parallelogram', x: [0, 1, 2, 1], y: [-1, 0, 0, -1], area: 1 },
  ],
  encode: { x: 'x', y: 'y', color: 'area' },
  scale: { x: { domain: [-2, 2] }, y: { domain: [-2, 2] } },
  style: { stroke: '#fff', lineWidth: 2 },
  axis: false,
});

chart.render();
