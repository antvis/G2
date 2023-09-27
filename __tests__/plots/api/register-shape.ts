import { Polygon } from '@antv/g';
import { register, Chart } from '../../../src';

export function registerShape(context) {
  const { container, canvas } = context;
  register('shape.interval.triangle', (style) => {
    return (P, value, defaults) => {
      const { color: defaultColor } = defaults;
      const [p0, p1, p2, p3] = P;
      const pm = [(p0[0] + p1[0]) / 2, p0[1]];
      const { color = defaultColor } = value;
      return new Polygon({
        style: {
          ...style,
          fill: color,
          points: [pm, p2, p3],
        },
      });
    };
  });

  const chart = new Chart({ container, canvas });

  chart.data([
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ]);

  chart
    .interval()
    .encode('x', 'genre')
    .encode('y', 'sold')
    .encode('color', 'genre')
    .encode('shape', 'triangle');

  const finished = chart.render();
  return { finished };
}
