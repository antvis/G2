import { Chart } from '../../../src';
import { createDiv, removeDom } from '../../util/dom';

describe('Label option', () => {
  const div = createDiv();
  let chart;
  it('pie', () => {
    chart = new Chart({
      container: div,
      autoFit: false,
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
        coordinate: {
          type: 'polar',
          actions: [['transpose']]
        },
        scales: {
          genre: { alias: '游戏种类' },
          sold: { alias: '销售量' },
        },
        geometries: [
          {
            type: 'interval',
            position: '1*sold',
            color: 'genre',
            adjust: 'stack',
            label: {
              fields: ['sold'],
            }
          },
        ],
        interactions: [{ type: 'active-region' }],
      },
    });
    chart.render();

    // @ts-ignore
    expect(chart.geometries[0].getLabelType()).toBe('pie');
  });

  afterAll(() => {
    chart.destroy();
    removeDom(div);
  });
});
