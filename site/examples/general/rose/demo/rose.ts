import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  width: 720,
  height: 720,
});

chart.coordinate({ type: 'polar' });

chart
  .interval()
  .transform({ type: 'groupX', y: 'sum' })
  .data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/87b2ff47-2a33-4509-869c-dae4cdd81163.csv',
  })
  .encode('x', 'year')
  .encode('y', 'people')
  .scale('y', { type: 'sqrt' })
  .axis('y', {
    titleSpacing: 28,
    labelFormatter: '~s',
    tickCount: 5,
    tickFilter: (d, i) => i !== 0,
    direction: 'right',
  })
  .animate('enter', { type: 'waveIn' })
  .tooltip({ channel: 'y', valueFormatter: '~s' });

chart.render();
