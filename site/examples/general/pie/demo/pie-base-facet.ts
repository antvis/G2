import { Chart } from '@antv/g2';

const data = [
  { type: '男性', percent: 56.4, color: '#0a9afe' },
  { type: '女性', percent: 43.6, color: '#f0657d' },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

const facetRect = chart
  .facetRect()
  .data(data)
  .encode('x', 'type')
  .axis(false)
  .legend(false)
  .view()
  .attr('frame', false)
  .coordinate({ type: 'theta', innerRadius: 0.5, outerRadius: 0.8 });

facetRect
  .interval()
  .encode('y', 100)
  .scale('y', { zero: true })
  .style('fill', '#e8e8e8')
  .tooltip(false)
  .animate(false);

facetRect
  .interval()
  .encode('y', 'percent')
  .encode('color', 'color')
  .scale('color', { type: 'identity' })
  .tooltip((data) => ({
    name: data.type,
    value: data.percent,
  }))
  .animate('enter', { type: 'waveIn', duration: 1000 });

facetRect
  .text()
  .encode('text', 'type')
  .style('textAlign', 'center')
  .style('textBaseline', 'middle')
  .style('fontSize', 20)
  .style('color', '#8c8c8c')
  .style('x', '50%')
  .style('y', '50%')
  .style('dy', -20);

facetRect
  .text()
  .encode('text', 'percent')
  .style('textAlign', 'center')
  .style('textBaseline', 'middle')
  .style('fontSize', 30)
  .style('fontWeight', 500)
  .style('color', '#000')
  .style('x', '50%')
  .style('y', '50%')
  .style('dy', 20);

chart.render();
