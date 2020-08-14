import { Chart } from '../../src';
import { createDiv } from '../util/dom';

describe('Tooltip Share', () => {
  let chart;
  it('default, share false', () => {
    const data = [
      { name: 'London', 月份: 'Jan.', 月均降雨量: 18.9 },
      { name: 'London', 月份: 'Feb.', 月均降雨量: 28.8 },
      { name: 'London', 月份: 'Mar.', 月均降雨量: 39.3 },
      { name: 'London', 月份: 'Apr.', 月均降雨量: 81.4 },
      { name: 'London', 月份: 'May', 月均降雨量: 47 },
      { name: 'London', 月份: 'Jun.', 月均降雨量: 20.3 },
      { name: 'London', 月份: 'Jul.', 月均降雨量: 24 },
      { name: 'London', 月份: 'Aug.', 月均降雨量: 35.6 },
      { name: 'Berlin', 月份: 'Jan.', 月均降雨量: 12.4 },
      { name: 'Berlin', 月份: 'Feb.', 月均降雨量: 23.2 },
      { name: 'Berlin', 月份: 'Mar.', 月均降雨量: 34.5 },
      { name: 'Berlin', 月份: 'Apr.', 月均降雨量: 99.7 },
      { name: 'Berlin', 月份: 'May', 月均降雨量: 52.6 },
      { name: 'Berlin', 月份: 'Jun.', 月均降雨量: 35.5 },
      { name: 'Berlin', 月份: 'Jul.', 月均降雨量: 37.4 },
      { name: 'Berlin', 月份: 'Aug.', 月均降雨量: 42.4 },
    ];

    chart = new Chart({
      container: createDiv(),
      width: 400,
      height: 300,
    });

    chart.data(data);
    chart.scale('月均降雨量', {
      nice: true,
    });

    chart
      .line()
      .position('月份*月均降雨量')
      .color('name')
      .adjust([
        {
          type: 'dodge',
          marginRatio: 1 / 32,
        },
      ])
      .tooltip('月份*月均降雨量');

    chart.render();

    const tooltipItems = chart.getTooltipItems(chart.getXY({ name: 'Berlin', 月份: 'Jan.', 月均降雨量: 12.4 }));
    expect(tooltipItems.length).toBe(2);
    expect(tooltipItems[0].name).toBe('月份');
    expect(tooltipItems[1].name).toBe('月均降雨量');
    expect(tooltipItems[0].value).toBe('Jan.');
    expect(tooltipItems[1].value).toBe('12.4');
  });

  it('share true', () => {
    const data = [
      { name: 'London', 月份: 'Jan.', 月均降雨量: 18.9 },
      { name: 'London', 月份: 'Feb.', 月均降雨量: 28.8 },
      { name: 'London', 月份: 'Mar.', 月均降雨量: 39.3 },
      { name: 'London', 月份: 'Apr.', 月均降雨量: 81.4 },
      { name: 'London', 月份: 'May', 月均降雨量: 47 },
      { name: 'London', 月份: 'Jun.', 月均降雨量: 20.3 },
      { name: 'London', 月份: 'Jul.', 月均降雨量: 24 },
      { name: 'London', 月份: 'Aug.', 月均降雨量: 35.6 },
      { name: 'Berlin', 月份: 'Jan.', 月均降雨量: 12.4 },
      { name: 'Berlin', 月份: 'Feb.', 月均降雨量: 23.2 },
      { name: 'Berlin', 月份: 'Mar.', 月均降雨量: 34.5 },
      { name: 'Berlin', 月份: 'Apr.', 月均降雨量: 99.7 },
      { name: 'Berlin', 月份: 'May', 月均降雨量: 52.6 },
      { name: 'Berlin', 月份: 'Jun.', 月均降雨量: 35.5 },
      { name: 'Berlin', 月份: 'Jul.', 月均降雨量: 37.4 },
      { name: 'Berlin', 月份: 'Aug.', 月均降雨量: 42.4 },
    ];

    chart = new Chart({
      container: createDiv(),
      width: 400,
      height: 300,
    });

    chart.data(data);
    chart.scale('月均降雨量', {
      nice: true,
    });
    chart.tooltip({
      shared: true,
    });

    chart
      .line()
      .position('月份*月均降雨量')
      .color('name')
      .adjust([
        {
          type: 'dodge',
          marginRatio: 1 / 32,
        },
      ])
      .tooltip('月份*月均降雨量');

    chart.render();

    const tooltipItems = chart.getTooltipItems(chart.getXY({ name: 'Berlin', 月份: 'Jan.', 月均降雨量: 12.4 }));
    expect(tooltipItems.length).toBe(4);
  });

  afterEach(() => {
    chart.destroy();
  });
});
