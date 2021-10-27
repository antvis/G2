import { Chart } from '../../src';
import { createDiv } from '../util/dom';

describe('Element with states failed to animate', () => {
  const data = [
    { type: '一线城市', value: 0.19 },
    { type: '二线城市', value: 0.21 },
    { type: '三线城市', value: 0.27 },
    { type: '四线及以下', value: 0.33 },
  ];
  const chart = new Chart({
    container: createDiv(),
    autoFit: true,
    height: 500,
  });
  chart.data(data);
  chart.coordinate('theta', {
    radius: 0.75,
  });
  const interval = chart
    .interval()
    .adjust('stack')
    .position('value')
    .state({
      active: {
        style: {
          stroke: '#000',
        },
      },
    });
  chart.render();

  it('normal', () => {
    interval.elements[1].setState('active', true);
    // 动画中，状态样式没变化
    expect(interval.elements[1].shape.attr('stroke')).not.toEqual('#000');
    // 2s 动画结束了，状态样式变化了
    setTimeout(() => {
      expect(interval.elements[1].shape.attr('stroke')).toEqual('#000');
    }, 2000);
  });
});
