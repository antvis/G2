/**
 * A recreation of this demo: https://nivo.rocks/pie/
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  width: 500,
  height: 400,
  paddingLeft: 50,
});

// Apply dark theme.
chart.theme({ type: 'dark' });

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
  .label({
    text: 'value',
    fontWeight: 'bold',
    offset: 14,
  })
  .label({
    text: 'id',
    position: 'spider',
    fontWeight: 'bold',
    textBaseline: 'bottom',
    textAlign: (d) => (['c', 'sass'].includes(d.id) ? 'end' : 'start'),
    dy: -4,
    connectorDistance: 0,
  })
  .style('radius', 4)
  .style('inset', 1)
  .animate('enterType', 'waveIn')
  .animate('enterDuration', 1000)
  .legend(false);

chart.render();
