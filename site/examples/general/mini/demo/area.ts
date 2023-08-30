import { Chart } from '@antv/g2';

const data = [
  264, 417, 438, 887, 309, 397, 550, 575, 563, 430, 525, 592, 492, 467, 513,
  546, 983, 340, 539, 243, 226, 192,
];

const chart = new Chart({
  container: 'container',
  width: 480,
  height: 80,
});

chart.data(data);

chart
  .area()
  .encode('x', (_, idx) => idx)
  .encode('y', (d) => d)
  .encode('shape', 'smooth')
  .scale('y', { zero: true })
  .style('fill', 'linear-gradient(-90deg, white 0%, darkgreen 100%)')
  .style('fillOpacity', 0.6)
  .animate('enter', { type: 'fadeIn' })
  .axis(false);

chart.interaction('tooltip', {
  render: (e, { title, items }) => items[0].value,
});

chart.render();
