import { Chart } from '../../src';
import { createDiv } from '../util/dom';

import 'jest-extended';

describe('#2141', () => {
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
  chart.animate(false);
  const interval = chart
    .interval()
    .position('percent')
    .adjust('stack')
    .style({
      lineWidth: 1,
      stroke: '#fff'
    });
  chart.render();

  it('render, id uniq', () => {
    // 保证数据同 element 的条数对应
    expect(interval.elements.length).toBe(data.length);
    expect(interval.elementsMap).toContainAllKeys(['1', '1-0-1', '1-0-2', '1-0-3', '1-0-4']);
  });

  it('update', () => {
    const newData = [
      { item: '事例一', count: 40, percent: 0.2 },
      { item: '事例二', count: 21, percent: 0.11 },
      { item: '事例三', count: 17, percent: 0.27 },
      { item: '事例四', count: 13, percent: 0.13 },
      { item: '事例五', count: 9, percent: 0.09 },
      { item: '事例五', count: 9, percent: 0.1 },
    ];
    chart.changeData(newData);

    expect(interval.elements.length).toBe(newData.length);
    expect(interval.elements[1].getData()).toEqual({ item: '事例二', count: 21, percent: 0.11 });
    expect(interval.elementsMap).toContainAllKeys(['1', '1-0-1', '1-0-2', '1-0-3', '1-0-4', '1-0-5']);
  });
});
