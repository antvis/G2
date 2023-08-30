/**
 * A recreation of this demo: https://observablehq.com/@d3/radial-stacked-bar-chart
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  width: 800,
  height: 800,
});

const colors = [
  '#98abc5',
  '#8a89a6',
  '#7b6888',
  '#6b486b',
  '#a05d56',
  '#d0743c',
  '#ff8c00',
];

chart.coordinate({ type: 'polar', innerRadius: 0.4 });

chart
  .interval()
  .data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/d582a447-2057-4a74-97ed-1d73a5459ea4.csv',
    transform: [
      {
        type: 'fold',
        fields: [
          'Under 5 Years',
          '5 to 13 Years',
          '14 to 17 Years',
          '18 to 24 Years',
          '25 to 44 Years',
          '45 to 64 Years',
          '65 Years and Over',
        ],
        key: 'Age',
        value: 'Population',
      },
    ],
  })
  .transform({ type: 'stackY' })
  .encode('x', 'State')
  .encode('y', 'Population')
  .encode('color', 'Age')
  .scale('color', { range: colors })
  .legend('color', { position: 'center', display: 'grid', gridCol: 1 })
  .scale('y', { type: 'sqrt' })
  .axis('y', {
    labelFormatter: '~s',
    tickFilter: (_, i) => i !== 0,
    direction: 'center',
  })
  .axis('x', { position: 'inner' })
  .animate('enter', { type: 'waveIn' });

chart.render();
