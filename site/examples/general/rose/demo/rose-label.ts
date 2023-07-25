import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  width: 720,
  height: 720,
});

chart.coordinate({ type: 'polar', outerRadius: 0.85 });

chart
  .interval()
  .transform({ type: 'groupX', y: 'sum' })
  .data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/87b2ff47-2a33-4509-869c-dae4cdd81163.csv',
  })
  .encode('x', 'year')
  .encode('color', 'year')
  .encode('y', 'people')
  .scale('y', { type: 'sqrt' })
  .scale('x', { padding: 0 })
  .axis(false)
  .label({
    text: 'people',
    position: 'outside',
    formatter: '~s',
    transform: [{ type: 'overlapDodgeY' }],
  })
  .legend({ color: { length: 400, layout: { justifyContent: 'center' } } })
  .animate('enter', { type: 'waveIn' })
  .tooltip({ channel: 'y', valueFormatter: '~s' });

chart.render();
