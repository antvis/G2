import { COMPONENT_TYPE } from '../../../../src/constant';
import { Chart } from '../../../../src/index';
import { createDiv } from '../../../util/dom';

describe('Legend', () => {
  let chart;
  it('category', () => {
    const container = createDiv();
    chart = new Chart({
      container,
      height: 500,
      width: 600,
      autoFit: false,
    });
    chart.data([
      { name: 'London', 月份: 'Jan.', 月均降雨量: 18.9 },
      { name: 'London', 月份: 'Feb.', 月均降雨量: 28.8 },
      { name: 'London', 月份: 'Mar.', 月均降雨量: 39.3 },
      { name: 'Berlin', 月份: 'Jan.', 月均降雨量: 12.4 },
      { name: 'Berlin', 月份: 'Feb.', 月均降雨量: 23.2 },
      { name: 'Berlin', 月份: 'Mar.', 月均降雨量: 34.5 },
    ]);

    chart.legend('name', {
      position: 'right',
      reversed: true,
    });

    chart
      .interval()
      .position('月份*月均降雨量')
      .color('name')
      .adjust('dodge');
    chart.render();

    const legends = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.LEGEND);
    expect(legends.length).toBe(1);
    // @ts-ignore
    expect(legends[0].component.getBBox().maxX).toBeLessThanOrEqual(chart.width);
    expect(legends[0].component.get('animate')).toBe(false);
    expect(legends[0].component.get('items')[0].name).toBe('Berlin');
    expect(legends[0].component.get('items')[1].name).toBe('London');
  });

  it('continuous color', () => {
    const container = createDiv();
    chart = new Chart({
      container,
      height: 500,
      width: 600,
      autoFit: false,
    });
    chart.data([
      { name: 'London', 月份: 'Jan.', 月均降雨量: 18.9 },
      { name: 'London', 月份: 'Feb.', 月均降雨量: 28.8 },
      { name: 'London', 月份: 'Mar.', 月均降雨量: 39.3 },
      { name: 'Berlin', 月份: 'Jan.', 月均降雨量: 12.4 },
      { name: 'Berlin', 月份: 'Feb.', 月均降雨量: 23.2 },
      { name: 'Berlin', 月份: 'Mar.', 月均降雨量: 34.5 },
    ]);

    chart
      .interval()
      .position('月份*月均降雨量')
      .color('月均降雨量')
      .adjust('dodge');
    chart.render();

    const legends = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.LEGEND);
    expect(legends.length).toBe(1);
    // @ts-ignore
    expect(legends[0].component.getBBox().maxY).toBeLessThanOrEqual(chart.height);
    expect(legends[0].component.get('animate')).toBe(false);
  });

  it('continuous size', () => {
    const container = createDiv();
    chart = new Chart({
      container,
      height: 500,
      width: 600,
      autoFit: false,
    });
    chart.data([
      { name: 'London', 月份: 'Jan.', 月均降雨量: 18.9 },
      { name: 'London', 月份: 'Feb.', 月均降雨量: 28.8 },
      { name: 'London', 月份: 'Mar.', 月均降雨量: 39.3 },
      { name: 'Berlin', 月份: 'Jan.', 月均降雨量: 12.4 },
      { name: 'Berlin', 月份: 'Feb.', 月均降雨量: 23.2 },
      { name: 'Berlin', 月份: 'Mar.', 月均降雨量: 34.5 },
    ]);

    chart.legend('月均降雨量', {
      position: 'top',
      animate: true,
    });

    chart
      .interval()
      .position('月份*月均降雨量')
      .size('月均降雨量')
      .adjust('dodge');
    chart.render();

    const legends = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.LEGEND);
    expect(legends.length).toBe(1);
    // @ts-ignore
    expect(legends[0].component.getBBox().minX).toBeGreaterThanOrEqual(0);
    expect(legends[0].component.get('animate')).toBe(true);
  });

  it('custom', () => {
      const container = createDiv();
      chart = new Chart({
        container,
        height: 500,
        width: 600,
        autoFit: false,
      });
      chart.data([
        { name: 'London', 月份: 'Jan.', 月均降雨量: 18.9 },
        { name: 'London', 月份: 'Feb.', 月均降雨量: 28.8 },
        { name: 'London', 月份: 'Mar.', 月均降雨量: 39.3 },
        { name: 'Berlin', 月份: 'Jan.', 月均降雨量: 12.4 },
        { name: 'Berlin', 月份: 'Feb.', 月均降雨量: 23.2 },
        { name: 'Berlin', 月份: 'Mar.', 月均降雨量: 34.5 },
      ]);

      chart.legend({
        custom: true,
        items: [
          { name: 'London', value: 'London', marker: { symbol: 'tick', style: { r: 10 } } },
          { name: 'Berlin', value: 'Berlin', marker: { symbol: 'circle', style: { r: 10 } } },
        ],
      });

      chart
        .interval()
        .position('月份*月均降雨量')
        .size('月均降雨量')
        .adjust('dodge');
      chart.render();

    const legends = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.LEGEND);
    expect(legends[0].component.get('items')[0].marker.symbol).toBeInstanceOf(Function);
    expect(legends[0].component.get('items')[1].marker.symbol).toBe('circle');
  });

  it('category legend, use hexagon marker', () => {
      const container = createDiv();
      chart = new Chart({
        container,
        height: 500,
        width: 600,
        autoFit: false,
      });
      chart.data([
        { name: 'London', 月份: 'Jan.', 月均降雨量: 18.9 },
        { name: 'London', 月份: 'Feb.', 月均降雨量: 28.8 },
        { name: 'London', 月份: 'Mar.', 月均降雨量: 39.3 },
        { name: 'Berlin', 月份: 'Jan.', 月均降雨量: 12.4 },
        { name: 'Berlin', 月份: 'Feb.', 月均降雨量: 23.2 },
        { name: 'Berlin', 月份: 'Mar.', 月均降雨量: 34.5 },
      ]);

      chart.legend('name', {
        position: 'right',
        reversed: true,
        marker: {
          symbol: 'hexagon',
        }
      });

      chart
        .interval()
        .position('月份*月均降雨量')
        .color('name')
        .adjust('dodge');
      chart.render();

    const legends = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.LEGEND);
    expect(legends[0].component.get('items')[0].marker.symbol).toBeInstanceOf(Function);
    expect(legends[0].component.get('items')[1].marker.symbol).toBeInstanceOf(Function);
  });

  afterEach(() => {
    chart.destroy();
  });
});
