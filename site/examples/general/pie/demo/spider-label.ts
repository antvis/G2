/**
 * A recreation of this demo: https://nivo.rocks/pie/
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  width: 500,
  height: 400,
});

chart.coordinate({ type: 'theta', innerRadius: 0.25, outerRadius: 0.8 });

chart
  .interval()
  .data([
    { id: 'c', value: 526 },
    { id: 'sass', value: 220 },
    { id: 'php', value: 325 },
    { id: 'elixir', value: 561 },
    { id: 'rust', value: 54 },
  ])
  .transform({ type: 'stackY' })
  .encode('y', 'value')
  .encode('color', 'id')
  .scale('color', {
    range: ['#e8c1a0', '#f47560', '#f1e15b', '#e8a838', '#61cdbb'],
  })
  .label({
    text: 'value',
    fontWeight: 'bold',
    offset: 14,
  })
  .label({
    text: 'id',
    position: 'spider',
    connectorDistance: 0,
    fontWeight: 'bold',
    textBaseline: 'bottom',
    textAlign: (d) => (['c', 'sass'].includes(d.id) ? 'end' : 'start'),
    dy: -4,
  })
  .style('radius', 4)
  .style('stroke', '#fff')
  .style('lineWidth', 2)
  .animate('enter', { type: 'waveIn' })
  .legend(false);

chart.render();
