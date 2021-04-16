import { Chart } from '../../src';
import { createDiv } from '../util/dom';

describe('574', () => {
  it('574', () => {
    const data = [
      { type: '一线城市', value: 20 },
      { type: '二线城市', value: 0 },
      { type: '三线城市', value: 10 },
    ];
    const chart = new Chart({
      container: createDiv(),
      width: 600,
      height: 300,
      autoFit: true,
    });
    chart.data(data);

    chart.coordinate('theta', {
      radius: 0.75,
    });

    chart.interval().adjust('stack').position('value').color('type', ['blue', 'green', 'yellow']);
    chart.render();
    const fn = jest.fn();
    chart.geometries[0].elements[2].shape.animate = fn;
    chart.changeData([
      { type: '一线城市', value: 20 },
      { type: '三线城市', value: 10 },
    ]);
    expect(fn).not.toBeCalled();
    chart.changeData([
      { type: '一线城市', value: 20 },
      { type: '三线城市', value: 15 },
    ]);
    expect(fn).toBeCalled();
    chart.destroy();
  });
});
