import { Chart } from '../../src';
import { createDiv } from '../util/dom';

describe('2365', () => {
  it('2365', () => {
    const data = [
      { item: 'Design', user: 'a', score: 70 },
      { item: 'Design', user: 'b', score: 30 },
      { item: 'Development', user: 'a', score: 60 },
      { item: 'Development', user: 'b', score: 70 },
      { item: 'Marketing', user: 'a', score: 50 },
      { item: 'Marketing', user: 'b', score: 60 },
      { item: 'Users', user: 'a', score: 40 },
      { item: 'Users', user: 'b', score: 50 },
      { item: 'Test', user: 'a', score: 60 },
      { item: 'Test', user: 'b', score: 70 },
      { item: 'Language', user: 'a', score: 70 },
      { item: 'Language', user: 'b', score: 50 },
      { item: 'Technology', user: 'a', score: 50 },
      { item: 'Technology', user: 'b', score: 40 },
      { item: 'Support', user: 'a', score: 30 },
      { item: 'Support', user: 'b', score: 40 },
      { item: 'Sales', user: 'a', score: 60 },
      { item: 'Sales', user: 'b', score: 40 },
      { item: 'UX', user: 'a', score: 50 },
      { item: 'UX', user: 'b', score: 60 },
    ];
    const chart = new Chart({
      container: createDiv(),
      width: 400,
      height: 300,
    });
    chart.data(data);
    chart.scale('score', {
      min: 0,
      max: 80,
    });
    chart.coordinate('polar', {
      radius: 0.8,
    }).rotate(Math.PI / 3);
    chart.tooltip(false);
    chart.axis('item', {
      line: null,
      tickLine: null,
      grid: {
        line: {
          style: {
            lineDash: null,
          },
        },
      },
    });
    chart.axis('score', {
      line: null,
      tickLine: null,
      grid: {
        line: {
          type: 'line',
          style: {
            lineDash: null,
          },
        },
      },
    });

    chart
      .line()
      .position('item*score')
      .color('user')
      .size(2);

    chart.render();

    const axisComponents = chart.getComponents().filter(item => item.type === 'axis');
    const circleAxis = axisComponents[0].component;

    expect(circleAxis.get('startAngle')).toBeCloseTo(-0.5235987755982991);
    expect(circleAxis.get('endAngle')).toBeCloseTo(5.759586531581287);
  });
});
