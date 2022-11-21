import { Chart } from '@antv/g2';

const words =
  `This Is Just To Say\nWilliam Carlos Williams, 1934\n\nI have eaten\nthe plums\nthat were in\nthe icebox\n\nand which\nyou were probably\nsaving\nfor breakfast\n\nForgive me\nthey were delicious\nso sweet\nand so cold`
    .split('\n')
    .map((d) => ({ text: d }));

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart
  .text()
  .data(words)
  .encode('x', 0.5)
  .encode('y', (_, idx) => idx)
  .encode('text', 'text')
  .encode('color', (_, idx) => idx)
  .encode('opacity', (_, idx) => idx)
  .scale('y', { type: 'point' })
  .style('textAlign', 'center')
  .style('textBaseline', 'middle')
  .style('fontSize', 16)
  .scale('color', { offset: (t) => 1 - t })
  .axis(false)
  .legend(false);

chart.render();
