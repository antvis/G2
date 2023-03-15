import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
  autoFit: true,
});

chart
  .gauge()
  .data({
    value: {
      target: 159,
      total: 400,
      name: 'score',
    },
  })
  .scale('color', {
    domain: [100, 200, 400],
    range: ['#F4664A', '#FAAD14', 'green'],
  })
  .style('pointerShape', customPointerShape)
  .style('pinShape', false)
  .style(
    'textContent',
    (target, total) => `得分：${target}\n占比：${(target / total) * 100}%`,
  )
  .legend(false);

chart.render();

function customPointerShape(style) {
  const {
    canvas: { document },
  } = chart.getContext();
  const g = document.createElement('g', {});

  return (points, value, coordinate, theme) => {
    const [cx, cy] = coordinate.getCenter();
    const [x, y] = points[0];

    const line = document.createElement('line', {
      style: {
        x1: x,
        y1: y,
        x2: cx,
        y2: cy,
        stroke: '#30BF78',
        lineWidth: 5,
      },
    });
    g.appendChild(line);
    return g;
  };
}
