/**
 * A recreation of this demo: https://nivo.rocks/storybook/?path=/docs/bar--diverging-stacked
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  paddingLeft: 40,
});

chart
  .interval()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/nivo-gain-lost.json',
    transform: [
      {
        type: 'fold',
        fields: [
          'gained <= 100$',
          'gained > 100$',
          'lost > 100$',
          'lost <= 100$',
        ],
        as: ['key', 'value'],
      },
    ],
  })
  .transform([{ type: 'stackY' }])
  .encode('x', 'user')
  .encode('y', 'value')
  .encode('color', 'key')
  .scale('x', { padding: 0.2 })
  .scale('y', { domainMin: -100, domainMax: 100 })
  .scale('color', {
    range: ['#97e3d5', '#61cdbb', '#e25c3b', '#f47560'],
    guide: { title: false },
  })
  .label({
    text: 'value',
    position: 'inside',
    fill: '#000',
    fontSize: 10,
    formatter: (v) => (v ? `${v}%` : ''),
    transform: [{ type: 'dodgeY' }],
  })
  .axis('y', {
    position: 'right',
    title: false,
    tickFormatter: (v) => `${v}%`,
  });

chart
  .lineY()
  .data([0])
  .style('lineWidth', 2)
  .style('stroke', '#e25c3b')
  .style('strokeOpacity', 1);

chart
  .text()
  .data([
    { x: 0, y: 0.2, text: 'lost' },
    { x: 0, y: 0.75, text: 'gain' },
  ])
  .encode('text', 'text')
  .encode('x', 'x')
  .encode('y', 'y')
  .encode('color', 'text')
  .axis('x', false)
  .axis('y', false)
  .scale('x', { domain: [0, 1], independent: true })
  .scale('y', { domain: [0, 1], independent: true })
  .scale('color', { range: ['#e25c3b', '#61cdbb'], independent: true })
  .style('fontWeight', 'bold')
  .style('dy', -10)
  .style('transform', 'rotate(-90)')
  .legend(false);

chart.render();
