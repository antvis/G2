import { Chart } from '../../../src';
import { createDiv, removeDom } from '../../util/dom';

describe('Annotations options', () => {
  const div = createDiv();
  let chart: Chart;
  it('Annotations', () => {
    chart = new Chart({
      container: div,
      autoFit: false,
      width: 400,
      height: 300,
      options: {
        animate: false,
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
        annotations: [{
          type: 'text',
          position: [ 'Action', 120 ],
          content: 'XXXXXXXXXXXXXx',
        }],
      },
    });
    chart.render();

    // @ts-ignore
    expect(chart.getController('annotation').option).toEqual([{
      type: 'text',
      position: ['Action', 120],
      content: 'XXXXXXXXXXXXXx',
    }]);

    chart.updateOptions({
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
      annotations: [{
        type: 'text',
        position: ['Action', 100],
        content: 'XXXXXXXXXXXXXx',
      }],
    });
    chart.render();
    // @ts-ignore
    expect(chart.getController('annotation').option).toEqual([{
      type: 'text',
      position: ['Action', 100],
      content: 'XXXXXXXXXXXXXx',
    }]);
  });

  afterAll(() => {
    chart.destroy();
    removeDom(div);
  });
});
