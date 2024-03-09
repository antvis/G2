import { Chart } from '@antv/g2';

const data = [
  { type: '1-3秒', value: 0.16 },
  { type: '4-10秒', value: 0.125 },
  { type: '11-30秒', value: 0.2 },
  { type: '1-3分', value: 0.2 },
  { type: '3-10分', value: 0.05 },
  { type: '10-30分', value: 0.01 },
  { type: '30+分', value: 0.015 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
  theme: 'dark',
});

chart.data(data).coordinate({ type: 'radial', innerRadius: 0.35 });

chart
  .interval()
  .encode('x', 'type')
  .encode('y', 0.2)
  .style('fill', '#202020')
  .state({
    active: { strokeWidth: 0 },
  })
  .tooltip(false);

chart
  .interval()
  .encode('x', 'type')
  .encode('y', 'value')
  .encode('color', [
    (val) => (val.type === '10-30分' || val.type === '30+分' ? 'high' : 'low'),
  ])
  .scale('color', { range: ['#5B8FF9', '#ff4d4f'] })
  .style('radius', 20)
  .tooltip([
    (item) => ({
      name: item.type,
      value: item.value,
    }),
  ])
  .axis(false)
  .legend(false)
  .state({
    active: { stroke: '#fff', strokeWidth: 1 },
  })
  .interaction('elementHighlight');

chart
  .image()
  .style('x', '50%')
  .style('y', '50%')
  .style('width', 100)
  .style('height', 80)
  .encode(
    'src',
    'https://gw.alipayobjects.com/mdn/rms_ef85c6/afts/img/A*0DYiQKP08cQAAAAAAAAAAAAAARQnAQ',
  )
  .tooltip(false);

chart.render();
