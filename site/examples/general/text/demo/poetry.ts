import { Chart } from '@antv/g2';

const words =
  `This Is Just To Say\nWilliam Carlos Williams, 1934\n\nI have eaten\nthe plums\nthat were in\nthe icebox\n\nand which\nyou were probably\nsaving\nfor breakfast\n\nForgive me\nthey were delicious\nso sweet\nand so cold`
    .split('\n')
    .map((d) => ({ text: d }));

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  children: [
    {
      type: 'text',
      data: words,
      encode: {
        x: 0.5,
        y: (_, idx) => idx,
        text: 'text',
        color: (_, idx) => idx,
        opacity: (_, idx) => idx,
      },
      scale: {
        y: { type: 'point' },
        color: { offset: (t) => 1 - t },
      },
      style: {
        textAlign: 'center',
        textBaseline: 'middle',
        fontSize: 16,
      },
      axis: false,
      legend: false,
    },
  ],
});

chart.render();
