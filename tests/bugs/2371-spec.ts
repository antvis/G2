import { Chart } from '../../src';
import { createDiv } from '../util/dom';

describe('2371', () => {
  it('2371', () => {
    const data = [
      { type: '一线城市', value: 0.19 },
      { type: '二线城市', value: 0.21 },
      { type: '三线城市', value: 0.27 },
      { type: '四线及以下', value: 0.33 },
    ];
    const chart = new Chart({
      container: createDiv(),
      width: 400,
      height: 300,
    });
    chart.data(data);
    chart.coordinate('theta', {
      radius: 0.75,
      innerRadius: 0.4
    });
    chart.tooltip(false);
    chart.filter('type', val => false);
    chart
      .interval()
      .adjust('stack')
      .position('value')
      .color('type')
      .style({ opacity: 0.4 })
      .label('type');


    expect(() => {
      chart.render();
    }).not.toThrow();
  });
});
