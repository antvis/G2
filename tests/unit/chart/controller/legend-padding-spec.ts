import { COMPONENT_TYPE } from '../../../../src/constant';
import { Chart } from '../../../../src/index';
import { createDiv } from '../../../util/dom';

describe('Legend', () => {
  let chart: Chart;
  it('padding', () => {
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
    });

    chart.interval().position('月份*月均降雨量').color('name').adjust('dodge');
    chart.render();

    const legends = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.LEGEND);

    expect(legends[0].component.get('padding')).toEqual([8, 8, 8, 8]); // 主题默认 8
    expect(legends[0].component.getBBox().maxX).toBeLessThan(600 - 7);
  });

  it('update padding', () => {
    chart.legend('name', {
      position: 'right',
      padding: [16, 16, 16, 16],
    });

    chart.render(true);

    const legends = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.LEGEND);

    expect(legends[0].component.get('padding')).toEqual([16, 16, 16, 16]); // 主题默认 8
    expect(legends[0].component.getBBox().maxX).toBeLessThan(600 - 15);
  });

  afterAll(() => {
    chart.destroy();
  });
});
