import { Polygon } from '@antv/g';
import { createDiv } from '../../utils/dom';
import { register, Chart } from '@/api';

describe('register', () => {
  it('register(data.[...]) should register data transform', () => {
    register('data.double', (options) => {
      const { field } = options;
      return (data) =>
        data.map((d) => ({
          ...d,
          [field]: d[field] * 2,
        }));
    });

    const chart = new Chart({
      container: createDiv(),
    });

    chart.data({
      value: [
        { genre: 'Sports', sold: 275 },
        { genre: 'Strategy', sold: 115 },
        { genre: 'Action', sold: 120 },
        { genre: 'Shooter', sold: 350 },
        { genre: 'Other', sold: 150 },
      ],
      transform: [{ type: 'double', field: 'sold' }],
    });

    chart
      .interval()
      .encode('x', 'genre')
      .encode('y', 'sold')
      .encode('color', 'genre');

    chart.render();
  });

  it('register(shape.[...]) should register shape', () => {
    register('shape.triangle', (style) => {
      return (P, value, coordinate, theme) => {
        const { defaultColor } = theme;
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

    const chart = new Chart({
      container: createDiv(),
    });

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

    chart.render();
  });
});
