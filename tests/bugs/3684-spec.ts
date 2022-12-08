import { Chart } from '../../src';
import { createDiv } from '../util/dom';

describe('3684', () => {
  it('3684', () => {
    const chart = new Chart({
      container: createDiv(),
      height: 100,
      width: 100,
    });

    chart.data([
      { type: '分类一', value: 1 },
      { type: '分类二', value: 100000000000 }, 
    ]);

    chart.coordinate('theta', {
      radius: 0.75
    });

    chart.legend(false);

    chart
      .interval()
      .adjust('stack')
      .position('value')
      .color('type')
      .style({ opacity: 0.4, stroke: 'red' })

    chart.render();
  });
});
