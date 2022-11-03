import { Chart } from '@antv/g2';

const text =
  `This Is Just To Say\nWilliam Carlos Williams, 1934\n\nI have eaten\nthe plums\nthat were in\nthe icebox\n\nand which\nyou were probably\nsaving\nfor breakfast\n\nForgive me\nthey were delicious\nso sweet\nand so cold`.split(
    '\n',
  );

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.data(text);

chart
  .text()
  .encode('x', 0.5)
  .encode('y', (_, idx) => idx)
  .encode('text', (v) => v)
  // .encode('color', (v) => v)
  .scale('x', { domain: [0, 1] })
  .scale('y', { type: 'band' })
  .style('textAlign', 'center')
  .style('textBaseline', 'middle')
  .style('fontSize', 16)
  .style('opacity', (_, idx, arr) => idx / arr.length + 0.3)
  .axis(false)
  .legend(false);

chart.render();
