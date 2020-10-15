import { Chart } from '../../src';
import { createDiv } from '../util/dom';

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

    chart.annotation().text({
      position: ['50%', '50%'],
      content: 'test',
    });

    chart.render();

    chart.on('plot:mouseenter', () => {
      chart.getController('annotation').clear(true);

      chart.annotation().text({
        position: ['50%', '70%'],
        content: 'test1',
      });

      chart.render(true);
    });

    chart.on('plot:mouseleave', () => {
      chart.getController('annotation').clear(true);
      chart.render(true);
    });

    // 防止事件内存泄露
    // @ts-ignore
    expect(chart.geometries[0]._events).toEqual({});

    chart.changeSize(500, 400);

    // @ts-ignore
    expect(chart.geometries[0]._events).toEqual({});

    // regionFilter 不知道怎么去断言！

    chart.emit('plot:mouseenter', {});

    expect(chart.getController('annotation').getComponents().length).toEqual(1);
    // @ts-ignore
    expect(chart.getController('annotation').option.length).toEqual(1);

    chart.emit('plot:mouseleave', {});
    expect(chart.getController('annotation').getComponents().length).toEqual(0);
    // @ts-ignore
    expect(chart.getController('annotation').option.length).toEqual(0);
  })
});
