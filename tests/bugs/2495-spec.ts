import { Chart } from '../../src/';
import { createDiv } from '../util/dom';
import { COMPONENT_TYPE } from '../../src/constant';

describe('2495', () => {
  it('layout after render twice', () => {
    const data = [
      { x: 'a', y: 1, z: 'z1' },
      { x: 'b', y: 2, z: 'z1' },
      { x: 'c', y: 3, z: 'z1' },
      { x: 'a', y: 4, z: 'z2' },
      { x: 'b', y: 5, z: 'z2' },
      { x: 'c', y: 6, z: 'z2' },
    ];
    const chart = new Chart({
      container: createDiv(),
      width: 600,
      height: 500
    });

    chart.data(data);
    chart
      .line()
      .position('x*y')
      .color('z');

    chart.render();
    chart.render();

    // legend 布局到下方
    expect(chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.LEGEND)[0].component.get('y')).toBeGreaterThan(400);
  });
});
