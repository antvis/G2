import { Chart } from '../../src';
import { createDiv } from '../util/dom';

describe('2849', () => {
  it('2849', () => {
    const chart = new Chart({
      container: createDiv(),
      autoFit: false,
      width: 400,
      height: 400,
      syncViewPadding: true,
      options: {
        views: [
          {
            options: {
              data: [{ x: 'A', y: 10 }, { x: 'B', y: 15 }, { x: 'C', 'y': 40 }],
              scales: { y: { nice: true } },
              geometries: [
                { type: 'interval', position: { fields: ['x', 'y'] } }
              ]
            }
          },
          {
            options: {
              data: [{ x: 'A', y1: 23 }, { x: 'B', y1: 40 }, { x: 'C', y1: 100 }],
              geometries: [
                { type: 'line', position: { fields: ['x', 'y1'] }, size: { values: [2] } }
              ],
              axes: { x: false, y1: { position: 'right' } }
            }
          }
        ],
      }
    });

    chart.render();

    // 不会创建多份 controller
    expect(chart.views[0].controllers.length).toBe(6);
  })
});
