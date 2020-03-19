import { Chart } from '../../src';
import { createDiv } from '../util/dom';

describe('#2157', () => {
  const chart = new Chart({
    container: createDiv(),
    width: 400,
    height: 300,
    options: {
      data: [
        { genre: 'Sports', sold: 275 },
        { genre: 'Strategy', sold: 115 },
        { genre: 'Action', sold: 120 },
        { genre: 'Shooter', sold: 350 },
        { genre: 'Other', sold: 150 },
      ],
      scales: {
        genre: { alias: '游戏种类' },
        sold: { alias: '销售量' },
      },
      geometries: [
        {
          type: 'interval',
          position: 'genre*sold',
          color: 'genre',
        },
      ],
      interactions: [{ type: 'active-region' }],
    },
  });

  chart.render();

  it('updateOptions', () => {
    chart.updateOptions({
      geometries: [
        {
          type: 'line',
          position: 'genre*sold',
        },
      ],
    });

    chart.render();

    const geometries = chart.geometries;
    expect(geometries.length).toBe(1);
    expect(geometries[0].type).toBe('line');
    expect(geometries[0].getAttribute('color')).toBeUndefined();
  });
});
