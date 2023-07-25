import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  width: 100,
  height: 100,
});

chart.coordinate({ type: 'theta' });

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
  .style('radius', 4)
  .style('stroke', '#fff')
  .style('lineWidth', 1)
  .animate('enter', { type: 'waveIn' })
  .axis(false)
  .legend(false);

chart.interaction('tooltip', {
  render: (e, { title, items }) => items[0].value,
});

chart.render();
