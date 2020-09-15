import { Chart } from '../../../src';
import { createDiv } from '../../util/dom';

describe('Views option', () => {
  it('views', () => {
    const chart = new Chart({
      autoFit: false,
      container: createDiv(),
      width: 400,
      height: 400,
      options: {
        views: [{
          id: 'bar-0',
          options: {
            data: [
              { x: 'A', y: 10 },
              { x: 'B', y: 15 },
              { x: 'C', y: 40 },
            ],
            geometries: [{
              type: 'interval',
              position: {
                fields: ['x', 'y'],
              },
            }],
          },
        }, {
          id: 'line-1',
          options: {
            data: [
              { x: 'A', y1: 10 },
              { x: 'B', y1: 15 },
              { x: 'C', y1: 40 },
            ],
            geometries: [{
              type: 'line',
              position: {
                fields: ['x', 'y1']
              },
              size: {
                values: [2],
              },
            }],
            axes: {
              y1: {
                position: 'right',
              }
            }
          }
        }],
      },
    });

    chart.render();

    expect(chart.views.length).toBe(2);
    expect(chart.views[0].id).toBe('bar-0');
    expect(chart.views[1].id).toBe('line-1');

  });
});
