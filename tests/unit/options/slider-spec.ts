import { Chart } from '../../../src';
import { createDiv } from '../../util/dom';

describe('Slider option', () => {
  it('slider', () => {
    const chart = new Chart({
      container: createDiv(),
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
        geometries: [
          {
            type: 'interval',
            position: 'genre*sold',
          },
        ],
        slider: {
          start: 0.3,
          end: 0.7,
        }
      },
    });
    chart.render();

    // @ts-ignore
    expect(chart.getController('slider').option).toEqual({
      start: 0.3,
      end: 0.7,
    });
    // @ts-ignore
    expect(chart.getController('slider').slider.component).toBeDefined();
  });
});
