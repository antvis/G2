import { Chart } from '@antv/g2';
import * as d3 from 'd3-hierarchy';

const layout = (data) => {
  const root = d3.hierarchy(data);
  root.count();
  d3.treemap().size([1, 1])(root);
  return root
    .descendants()
    .map((d) =>
      Object.assign(d, {
        x: [d.x0, d.x1, d.x1, d.x0],
        y: [d.y0, d.y0, d.y1, d.y1],
      }),
    )
    .filter((d) => d.height === 0);
};
const name = (d) => {
  const { name } = d.data;
  return name.length > 5 ? name.slice(0, 4) + '...' : name;
};

const chart = new Chart({
  container: 'container',
  autoFit: true,
  paddingLeft: 4,
  paddingBottom: 4,
  paddingRight: 4,
});

chart
  .data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/5155ef81-db23-49f3-b72b-d436a219d289.json',
    transform: [{ type: 'custom', callback: layout }],
  })
  .legend(false);

chart
  .polygon()
  .encode('x', 'x')
  .encode('y', 'y')
  .encode('size', 'r')
  .encode('color', (d) => d.parent.data.name)
  .tooltip({
    title: '',
    items: [(d) => d.parent.data.name],
  })
  .scale('x', { domain: [0, 1] })
  .scale('y', { domain: [0, 1], range: [0, 1] })
  .scale('size', { type: 'identity' })
  .axis(false);

chart
  .text()
  .data({
    transform: [
      {
        type: 'filter',
        callback: (d) => d.height === 0,
      },
    ],
  })
  .encode('x', (d) => d.x[0])
  .encode('y', (d) => d.y[0])
  .encode('text', name)
  .style('dy', 15)
  .style('dx', 5)
  .style('fill', 'black')
  .style('textAlign', 'start')
  .style('fontSize', 12);

chart.render();
