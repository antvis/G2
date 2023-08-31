import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
  autoFit: true,
});

chart
  .liquid()
  .data({
    value: {
      percent: 0.3,
    },
  })
  .encode('shape', (x, y, width, height) => {
    const path = [];
    const w = Math.min(width, height);

    for (let i = 0; i < 5; i++) {
      path.push([
        i === 0 ? 'M' : 'L',
        (Math.cos(((18 + i * 72) * Math.PI) / 180) * w) / 2 + x,
        (-Math.sin(((18 + i * 72) * Math.PI) / 180) * w) / 2 + y,
      ]);
      path.push([
        'L',
        (Math.cos(((54 + i * 72) * Math.PI) / 180) * w) / 4 + x,
        (-Math.sin(((54 + i * 72) * Math.PI) / 180) * w) / 4 + y,
      ]);
    }
    path.push(['Z']);
    return path;
  })
  .style({
    outline: {
      border: 4,
      distance: 8,
    },
    wave: {
      length: 128,
    },
  });

chart.render();
