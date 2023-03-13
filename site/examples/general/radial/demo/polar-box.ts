import { Chart } from '@antv/g2';

const data = [
  { x: 'Oceania', y: [1, 9, 16, 22, 24] },
  { x: 'East Europe', y: [1, 5, 8, 12, 16] },
  { x: 'Australia', y: [1, 8, 12, 19, 26] },
  { x: 'South America', y: [2, 8, 12, 21, 28] },
  { x: 'North Africa', y: [1, 8, 14, 18, 24] },
  { x: 'North America', y: [3, 10, 17, 28, 30] },
  { x: 'West Europe', y: [1, 7, 10, 17, 22] },
  { x: 'West Africa', y: [1, 6, 8, 13, 16] },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.coordinate({ type: 'polar', innerRadius: 0.2 });

chart
  .box()
  .data(data)
  .encode('x', 'x')
  .encode('y', 'y')
  .encode('color', 'x')
  .scale('x', { paddingInner: 0.6, paddingOuter: 0.3 })
  .scale('y', { zero: true })
  .style('stroke', 'black')
  .axis('y', { tickCount: 5 })
  .tooltip({ channel: 'y', name: 'min' })
  .tooltip({ channel: 'y1', name: 'q1' })
  .tooltip({ channel: 'y2', name: 'q2' })
  .tooltip({ channel: 'y3', name: 'q3' })
  .tooltip({ channel: 'y4', name: 'max' })
  .legend(false);

chart.render();
