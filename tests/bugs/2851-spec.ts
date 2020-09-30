import { Chart } from '../../src';
import { createDiv } from '../util/dom';
import { delay } from '../util/delay';

describe('2851', () => {
  it('2851', async () => {
    const data = [
      { year: '1951 年', sales: 280 },
      { year: '1952 年', sales: 52 },
      { year: '1956 年', sales: 61 },
      { year: '1957 年', sales: 145 },
      { year: '1958 年', sales: 48 },
      { year: '1959 年', sales: 38 },
      { year: '1960 年', sales: 38 },
      { year: '1962 年', sales: 38 },
    ];

    const chart = new Chart({
      container: createDiv(),
      width: 400,
      height: 300,
      autoFit: true,
    });

    chart.animate(false);
    chart.data(data);

    chart
      .line()
      .position('year*sales');

    chart.annotation().line({
      top: true,
      start: ['min', 100],
      end: ['max', 100],
      style: {
        stroke: 'red',
        lineDash: [2, 2],
      },
    });

    chart.annotation().regionFilter({
      top: true,
      start: ['min', 100],
      end: ['max', 0],
      color: '#f5222d'
    });

    chart.render();
    // 防止事件内存泄露
    // @ts-ignore
    expect(chart.geometries[0]._events).toEqual({});

    chart.changeSize(500, 400);

    // @ts-ignore
    expect(chart.geometries[0]._events).toEqual({});

    // regionFilter 不知道怎么去断言！
  })
});
