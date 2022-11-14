import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  width: 600,
  height: 300,
  paddingLeft: 48,
});

const X = new Array(21).fill(0).map((_, idx) => idx + 4);
const Y = [-3, -2, -1, 0, 1, 2, 3];

// Time axis
chart
  .text()
  .data(X.slice(1))
  .encode('x', (v) => v)
  .encode('y', 0)
  .encode('text', (v) => (v < 12 ? `${v}a` : `${v - 12}p`))
  .scale('x', { domain: X })
  .scale('y', { domain: Y })
  .style('fill', 'grey')
  .axis(false);

// South / North label
chart
  .text()
  .data(['South', 'North'])
  .encode('x', 4)
  .encode('y', (_, idx) => (idx == 0 ? -1 : 1))
  .encode('text', (t) => t)
  .scale('x', { domain: X })
  .scale('y', { domain: Y })
  .style('textAlign', 'right')
  .axis(false);

// NLB
chart
  .text()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/caltrain.json',
  })
  .transform([{ type: 'stackY' }])
  .encode('x', (d) => Number(d.hours))
  .encode('y', (d) => (d.orientation === 'S' ? -1 : 1))
  .encode('color', 'type')
  .encode('text', (d) => d.minutes.padStart(2, '0'))
  .scale('x', { domain: X })
  .scale('y', { domain: Y })
  .scale('color', { range: ['currentColor', 'peru', 'brown'] })
  .style('stroke', 'transparent');

chart.render();
