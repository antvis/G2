import { Chart } from '../../src';
import { createDiv } from '../util/dom';

describe('#2541', () => {
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
  chart.tooltip({
    showMarkers: false,
  });
  const interval = chart
    .interval()
    .adjust('stack')
    .position('value')
    .color('type', ['#063d8a', '#1770d6', '#47abfc', '#38c060'])
    .style({ opacity: 0.4 })
    .state({
      selected: {
        style: {
          stroke: '#000',
        },
      },
    });
  chart.interaction('element-single-selected');

  chart.render();

  it('normal', () => {
    interval.elements[1].setState('selected', true);
    // 设置状态后，延迟渲染
    setTimeout(() => {
      expect(interval.elements[1].shape.attr('stroke')).toEqual('#000');
    }, 0);
  });

  it('change size', () => {
    chart.changeSize(400, 300);
    // 设置状态后，延迟渲染
    setTimeout(() => {
      expect(interval.elements[1].shape.attr('stroke')).toEqual('#000');
    }, 0);
  });

  it('change data', () => {
    chart.changeData(data.map((d, idx) => (idx === 1 ? { ...d, value: 0.1 } : d)));
    // 设置状态后，延迟渲染
    setTimeout(() => {
      expect(interval.elements[1].shape.attr('stroke')).toEqual('#000');
    }, 0);
  
    chart.changeData([
      { type: '一线城市', value: 0.19 },
      { type: '三线城市', value: 0.27 },
      { type: '四线及以下', value: 0.33 },
    ]);
    // 设置状态后，延迟渲染
    setTimeout(() => {
      expect(interval.elements[1].shape.attr('stroke')).not.toEqual('#000');
    }, 0);
  });
});
