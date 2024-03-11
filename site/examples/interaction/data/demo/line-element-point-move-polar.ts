import { Chart } from '@antv/g2';

const data = [
  { item: 'Design', type: 'a', score: 70 },
  { item: 'Design', type: 'b', score: 30 },
  { item: 'Development', type: 'a', score: 60 },
  { item: 'Development', type: 'b', score: 70 },
  { item: 'Marketing', type: 'a', score: 50 },
  { item: 'Marketing', type: 'b', score: 60 },
  { item: 'Users', type: 'a', score: 40 },
  { item: 'Users', type: 'b', score: 50 },
  { item: 'Test', type: 'a', score: 60 },
  { item: 'Test', type: 'b', score: 70 },
  { item: 'Language', type: 'a', score: 70 },
  { item: 'Language', type: 'b', score: 50 },
  { item: 'Technology', type: 'a', score: 50 },
  { item: 'Technology', type: 'b', score: 40 },
  { item: 'Support', type: 'a', score: 30 },
  { item: 'Support', type: 'b', score: 40 },
  { item: 'Sales', type: 'a', score: 60 },
  { item: 'Sales', type: 'b', score: 40 },
  { item: 'UX', type: 'a', score: 50 },
  { item: 'UX', type: 'b', score: 60 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.coordinate({ type: 'polar' });

chart
  .data(data)
  .scale('x', { padding: 0.5, align: 0 })
  .scale('y', { tickCount: 5, domainMax: 80 })
  .interaction({
    legendFilter: false,
    elementPointMove: true,
  })
  .axis('x', {
    grid: true,
    gridStrokeWidth: 1,
    tick: false,
    gridLineDash: [0, 0],
  })
  .axis('y', {
    zIndex: 1,
    title: false,
    gridConnect: 'line',
    gridStrokeWidth: 1,
    gridLineDash: [0, 0],
  });

chart
  .area()
  .encode('x', 'item')
  .encode('y', 'score')
  .encode('color', 'type')
  .encode('key', 'type')
  .style('fillOpacity', 0.5);

chart
  .line()
  .encode('x', 'item')
  .encode('y', 'score')
  .encode('color', 'type')
  .encode('key', 'type')
  .style('lineWidth', 2);

chart.interaction('tooltip', { crosshairsLineDash: [4, 4] });

chart.render();
