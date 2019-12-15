import { COMPONENT_TYPE } from '../../../../src/constant';
import { Chart } from '../../../../src/index';
import { createDiv } from '../../../util/dom';

describe('Legend', () => {
  it('category', () => {
    const container = createDiv();
    const chart = new Chart({
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
  });

  it('continuous color', () => {
    const container = createDiv();
    const chart = new Chart({
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
  });

  it('continuous size', () => {
    const container = createDiv();
    const chart = new Chart({
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
  });
});
