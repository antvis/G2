import { Chart } from '../../src';
import { createDiv } from '../util/dom';

describe('pie update animate', () => {
  it('pie should update other attribute without angle change', () => {
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

    const interval = chart.interval().adjust('stack').position('value').color('type', ['blue', 'green', 'yellow']);
    chart.render();

    const shape = interval.elements[0].shape;

    interval.color('type', ['#ff0000']);
    chart.render(true);
    expect(shape.attr('fill')).toEqual('#ff0000');

    chart.destroy();
  });
});
