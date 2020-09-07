import { Chart } from '../../src';
import { createDiv } from '../util/dom';

describe('1265', () => {
  it('1265', () => {
    const data = [
      { name: 'a', time: '10:10', call: 4, waiting: 2, people: 2 },
      { name: 'b', time: '10:10', call: 4, waiting: 21, people: 2 },
      { name: 'a', time: '10:15', call: 2, waiting: 6, people: 3 },
      { name: 'b', time: '10:15', call: 2, waiting: 16, people: 3 },
      { name: 'a', time: '10:20', call: 13, waiting: 2, people: 5 },
      { name: 'b', time: '10:20', call: 13, waiting: 12, people: 5 },
      { name: 'a', time: '10:25', call: 9, waiting: 9, people: 1 },
      { name: 'b', time: '10:25', call: 9, waiting: 19, people: 1 },
    ];
    const chart = new Chart({
      container: createDiv(),
      autoFit: false,
      width: 400,
      height: 300,
      padding: 24,
    });
    chart.data(data);
    chart.line().position('time*people').color('#fdae6b').size(3).shape('smooth');
    chart.render();

    expect(chart.padding).toBe(24);
    expect(chart.coordinateBBox.tl).toEqual({ x: 24, y: 24 });

    chart.clear();

    chart.padding = 48;
    chart.data(data);
    chart.line().position('time*people').color('#fdae6b').size(3).shape('smooth');
    chart.render();

    expect(chart.padding).toBe(48);
    expect(chart.coordinateBBox.tl).toEqual({ x: 48, y: 48 });
  });
});
