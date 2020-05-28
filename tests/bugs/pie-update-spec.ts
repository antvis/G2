import { Chart, getEngine, registerShape } from '../../src';
import { getSectorPath } from '../../src/util/graphics';
import { createDiv } from '../util/dom';
const G = getEngine('canvas');

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
    const diameter = chart.getCoordinate().getRadius() * 2;
    expect(width).toBeCloseTo(diameter);
    expect(height).toBeCloseTo(diameter);
  });

  it('getSectorPath', () => {
    const path = getSectorPath(200, 140, 104.99999475, 1.3180245040922702, 2.834655440308032, 0);
    expect(path.length).toBe(5);
  });

  it('pie with group label', (done) => {
    const data = [
      { sex: '男', sold: 0.45 },
      { sex: '女', sold: 0.55 },
    ];

    const chart = new Chart({
      container: createDiv(),
      width: 400,
      height: 300,
      padding: [20, 30, 30, 20],
    });

    chart.coordinate('theta', {
      radius: 0.8,
    });

    chart.data(data);

    chart
      .interval()
      .adjust('stack')
      .position('sold')
      .color('sex', ['#1890ff', '#f04864'])
      .label('sold', {
        content: (obj) => {
          const group = new G.Group({});
          group.addShape({
            type: 'image',
            attrs: {
              x: 0,
              y: 0,
              width: 40,
              height: 50,
              img: obj.sex === '男' ?
                'https://gw.alipayobjects.com/zos/rmsportal/oeCxrAewtedMBYOETCln.png' :
                'https://gw.alipayobjects.com/zos/rmsportal/mweUsJpBWucJRixSfWVP.png',
            },
          });

          group.addShape({
            type: 'text',
            attrs: {
              x: 20,
              y: 54,
              text: obj.sex,
              textAlign: 'center',
              textBaseline: 'top',
              fill: obj.sex === '男' ? '#1890ff' : '#f04864',
            },
          });
          return group;
        }
      });
    chart.render();

    chart.filter('sex', (val) => val === '男');
    chart.render(true);

    setTimeout(() => {
      const interval = chart.geometries[0];
      const labelContainer = interval.labelsContainer;
      expect(labelContainer.getCount()).toBe(1);

      done();
    }, 500);
  });
});
