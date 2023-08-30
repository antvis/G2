import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart
  .interval()
  .data([
    { name: 'MODIFY', value: 138, washaway: 0.21014492753623193 },
    { name: 'PRERELEASE', value: 109, washaway: 0.5596330275229358 },
    { name: 'RELEASING', value: 48, washaway: 0 },
  ])
  .encode('x', 'name')
  .encode('y', 'value')
  .encode('color', 'name')
  .encode('size', 80)
  .style('radiusTopLeft', 10)
  .style('radiusTopRight', 20)
  .style('radiusBottomRight', 30)
  .style('radiusBottomLeft', 40);

chart.render();
