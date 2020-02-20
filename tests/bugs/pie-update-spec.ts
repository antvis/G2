import { Chart } from '../../src';
import { getSectorPath } from '../../src/util/graphics';
import { createDiv } from '../util/dom';

describe('Pie update animation', () => {
  it('pie shape path should not be changed.', (done) => {
    const data = [
      { item: '事例一', count: 40, percent: 0.4 },
      { item: '事例二', count: 21, percent: 0.21 },
      { item: '事例三', count: 17, percent: 0.17 },
      { item: '事例四', count: 13, percent: 0.13 },
      { item: '事例五', count: 9, percent: 0.09 },
    ];

    const chart = new Chart({
      container: createDiv(),
      width: 400,
      height: 300,
    });

    chart.coordinate('theta', {
      radius: 0.75,
    });

    chart.data(data);
    const interval = chart
      .interval()
      .position('percent')
      .color('item')
      .adjust('stack');
    chart.render();
    chart.changeData([
      { item: '事例一', count: 40, percent: 0.62 },
      { item: '事例二', count: 21, percent: 0.21 },
      { item: '事例三', count: 17, percent: 0.17 },
    ]);

    setTimeout(() => {
      const shape = interval.elements[0].shape;
      const commands = shape.attr('path').map((eachCommand) => {
        return eachCommand[0];
      });
      expect(commands).toEqual(['M', 'L', 'A', 'L', 'Z']);
      done();
    }, 600);
  });

  it('recheck', () => {
    const data = [
      { item: '事例一', count: 40, percent: 0.4 },
      { item: '事例二', count: 21, percent: 0.21 },
      { item: '事例三', count: 17, percent: 0.17 },
      { item: '事例四', count: 13, percent: 0.13 },
      { item: '事例五', count: 9, percent: 0.09 },
    ];

    const chart = new Chart({
      container: createDiv(),
      width: 400,
      height: 300,
      padding: 0,
    });

    chart.animate(false);

    chart.coordinate('theta');

    chart.data(data);
    chart.legend(false);
    chart
      .interval()
      .position('percent')
      .color('item')
      .adjust('stack');
    chart.render();

    chart.filter('item', () => false);
    chart.render(true);

    chart.filter('item', (obj) => {
      return obj === '事例四'
    });
    chart.render(true);

    const elements = chart.geometries[0].elements;
    expect(elements.length).toBe(1);

    const { width, height } = elements[0].shape.getBBox();
    // @ts-ignore
    const diameter = chart.getCoordinate().getRadius() * 2;
    expect(width).toBeCloseTo(diameter);
    expect(height).toBeCloseTo(diameter);
  });

  it('getSectorPath', () => {
    const path = getSectorPath(200, 140, 104.99999475, 1.3180245040922702, 2.834655440308032, 0);
    expect(path.length).toBe(5);
  });
});
