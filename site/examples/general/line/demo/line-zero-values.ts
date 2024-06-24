import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart
  .line()
  .data([
    { date: '06-10', count: 0, type: '测试' },
    { date: '06-11', count: 0, type: '测试' },
    { date: '06-12', count: 0, type: '测试' },
    { date: '06-13', count: 0, type: '测试' },
    { date: '06-14', count: 0, type: '测试' },
    { date: '06-15', count: 0, type: '测试' },
    { date: '06-16', count: 0, type: '测试' },
  ])
  .encode('x', 'date')
  .encode('y', 'count')
  .scale('y', {
    domain: [0, 1],
  });

chart.render();
