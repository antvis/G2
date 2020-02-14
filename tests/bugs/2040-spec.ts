import { Chart } from '../../src';
import { createDiv, removeDom } from '../util/dom';
import DIAMOND from '../../examples/data/diamond.json';

describe('#2040', () => {
  let chart;
  const container = createDiv()
  it('jitter point', () => {
    DIAMOND.forEach(obj => {
      // @ts-ignore
      obj.type = '1';
    });
    chart = new Chart({
      container,
      width: 400,
      height: 300,
      padding: [40, 100, 80, 80]
    });
    chart.data(DIAMOND);
    chart.scale('type', {
      range: [0, 1]
    });
    chart.scale('type', {
      range: [0, 1]
    });
    chart.coordinate('polar');
    chart.legend(false);
    chart.axis('clarity', {
      grid: {
        alignTick: false,
        line: {
          style: {
            lineDash: [0, 0]
          },
        },
      },
    });
    const point = chart
      .point()
      .adjust('jitter')
      .position('clarity*type')
      .color('clarity')
      .shape('circle')
      .style({
        fillOpacity: 0.65,
      })
    chart.render();

    expect(point.elements.length).toBe(DIAMOND.length);
  });

  afterAll(() => {
    chart.destroy();
    removeDom(container);
  });
});
