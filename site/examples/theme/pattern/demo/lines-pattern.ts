/**
 * A recreation of this demo: https://nivo.rocks/pie/
 */
import { Chart } from '@antv/g2';
import { lines } from '@antv/g-pattern';

const chart = new Chart({
  container: 'container',
  width: 500,
  height: 400,
});

chart.coordinate({ type: 'theta', innerRadius: 0.25, outerRadius: 0.8 });

const colors = ['#e8c1a0', '#f47560', '#f1e15b', '#e8a838', '#61cdbb'];

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
  .label({
    text: 'id',
    position: 'outside',
    fontWeight: 'bold',
  })
  .style('radius', 6)
  .style('stroke', '#fff')
  .style('lineWidth', 4)
  .style('fill', (_, idx) => {
    return {
      image: lines({
        backgroundColor: colors[idx],
        backgroundOpacity: 0.65,
        stroke: colors[idx],
        lineWidth: 4,
        spacing: 5,
      }),
      repetition: 'repeat',
      transform: 'rotate(30)',
    };
  })
  .legend(false);

chart.render();
