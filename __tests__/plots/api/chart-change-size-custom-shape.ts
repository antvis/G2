import { Chart, register } from '../../../src';

export function chartChangeSizeCustomShape(context) {
  const { container, canvas } = context;

  const button = document.createElement('button');
  button.innerText = 'Update Size';
  button.style.display = 'block';
  container.appendChild(button);

  const div = document.createElement('div');
  container.appendChild(div);

  register('shape.interval.triangle', (style, context) => {
    const { document } = context;
    return (P, value, defaults) => {
      const { color: defaultColor } = defaults;
      const [p0, p1, p2, p3] = P;
      const pm = [(p0[0] + p1[0]) / 2, p0[1]];
      const { color = defaultColor } = value;
      const group = document.createElement('g');
      const polygon = document.createElement('polygon', {
        style: {
          ...style,
          fill: color,
          points: [pm, p2, p3],
        },
      });
      group.appendChild(polygon);
      return group;
    };
  });

  const chart = new Chart({
    container: div,
    canvas,
  });

  chart
    .interval()
    .data([
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Infantry', sold: 220 },
      { genre: 'Logistics', sold: 330 },
      { genre: 'Other', sold: 150 },
    ])
    .encode('x', 'genre')
    .encode('y', 'sold')
    .encode('color', 'genre')
    .style('shape', 'triangle')
    .animate(false);

  const finished = chart.render();

  button.onclick = () => {
    chart.changeSize(400, 300);
  };

  return { chart, button, finished };
}
