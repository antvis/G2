import { Chart } from '../../../src';

describe('API and Options', () => {
  it('', () => {
    const chart = new Chart({});

    chart.options({
      type: 'interval',
      data: [
        { genre: 'Sports', sold: 275 },
        { genre: 'Strategy', sold: 115 },
        { genre: 'Action', sold: 120 },
        { genre: 'Shooter', sold: 350 },
        { genre: 'Other', sold: 150 },
      ],
      encode: {
        x: 'genre',
        y: 'sold',
      },
    });
  });
});
