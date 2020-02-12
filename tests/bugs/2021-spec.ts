import { Chart } from '../../src';
import { createDiv, removeDom } from '../util/dom';

describe('#2021', () => {
  let chart;
  const container = createDiv()
  it('Pie chart options', () => {
    chart = new Chart({
      container,
      width: 400,
      height: 300,
      options: {
        data: [
          { type: '分类一', value: 27 },
          { type: '分类二', value: 25 },
          { type: '分类三', value: 18 },
          { type: '分类四', value: 15 },
          { type: '分类五', value: 10 },
          { type: 'Other', value: 5 },
        ],
        coordinate: {
          type: 'polar',
          actions: [
            [ 'transpose' ],
          ],
          cfg: {
            radius: 0.85,
          }
        },
        geometries: [
          {
            type: 'interval',
            position: {
              fields: [ 'value' ],
            },
            color: 'type',
            adjust: [
              { type: 'stack' },
            ],
          },
        ],
      }
    });

    chart.render();

    const xScale = chart.getXScale();
    expect(xScale.type).toBe('identity');
    expect(xScale.values).toEqual(['1']);
  });

  afterAll(() => {
    chart.destroy();
    removeDom(container);
  });
});
