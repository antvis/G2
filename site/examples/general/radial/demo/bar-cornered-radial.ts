import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.coordinate({ type: 'radial', endAngle: Math.PI });

chart
  .interval()
  .data({
    // Data is collected by the end of 2022.11.09
    value: [
      { name: 'G', star: 814 },
      { name: 'G2', star: 11425 },
      { name: 'G2Plot', star: 2320 },
      { name: 'S2', star: 968 },
      { name: 'F2', star: 7346 },
      { name: 'L7', star: 2888 },
      { name: 'G6', star: 9314 },
      { name: 'X6', star: 3985 },
      { name: 'AVA', star: 1151 },
    ],
    transform: [{ type: 'sortBy', fields: [['star', true]] }],
  })
  .encode('x', 'name')
  .encode('y', 'star')
  .scale('y', { type: 'sqrt' })
  .encode('color', 'name')
  .encode('size', 40)
  .style('radius', 20)
  .label({
    text: 'star',
    position: 'outside',
    autoRotate: true,
    rotateToAlignArc: true,
    dx: 4,
  })
  .axis('x', { title: false })
  .axis('y', false)
  .animate('enter', { type: 'waveIn', duration: 1000 });

chart.render();
