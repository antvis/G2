import { Chart } from '../../../src';
import { createDiv, removeDom } from '../../util/dom';

describe('Events options', () => {
  const div = createDiv();
  let chart;
  it('events', () => {
    const clickFn = jest.fn();
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
        geometries: [
          {
            type: 'interval',
            position: 'genre*sold',
            color: 'genre',
          },
        ],
        events: {
          'interval:click': () => clickFn(),
        }
      },
    });
    chart.render();

    chart.emit('interval:click');
    expect(clickFn).toBeCalled();
  });

  afterAll(() => {
    chart.destroy();
    removeDom(div);
  });
});
