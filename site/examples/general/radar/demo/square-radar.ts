import { Chart } from '@antv/g2';
const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.coordinate({
  type: 'polar',
  startAngle: (-Math.PI * 3) / 4,
  endAngle: (Math.PI * 5) / 4,
});

chart
  .line()
  .data([
    { item: 'Design', type: 'a', score: 70 },
    { item: 'Development', type: 'a', score: 60 },
    { item: 'Marketing', type: 'a', score: 50 },
    { item: 'Users', type: 'a', score: 40 },
  ])
  .encode('x', 'item')
  .encode('y', 'score')
  .scale('x', {
    padding: 0.5,
    align: 0,
  })
  .scale('y', {
    domainMin: 0,
    domainMax: 80,
  })
  .style({
    zIndex: 0,
    lineWidth: 5,
    lineJoin: 'round',
  })
  .axis('x', {
    grid: true,
    zIndex: 1,
    title: false,
    gridLineWidth: 1,
    gridLineDash: null,
  })
  .axis('y', {
    titleOpacity: '0',
    gridConnect: 'line',
    gridLineWidth: 1,
    gridLineDash: [0, 0],
    gridAreaFill: 'rgba(0, 0, 0, 0.04)',
  });

chart.render();
