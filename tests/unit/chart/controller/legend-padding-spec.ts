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

    let legends = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.LEGEND);

    expect(legends[0].component.get('padding')).toEqual([0, 8, 0, 8]); // 主题垂直默认 8
    expect(legends[0].component.getBBox().maxX).toBeLessThan(600 - 7);

    chart.legend('name', {
      position: 'left',
    });
    chart.render();

    legends = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.LEGEND);
    expect(legends[0].component.get('padding')).toEqual([0, 8, 0, 8]); // 主题垂直默认 8

    chart.legend('name', {
      position: 'top',
    });
    chart.render();

    legends = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.LEGEND);
    expect(legends[0].component.get('padding')).toEqual([8, 0, 8, 0]); // 主题水平默认 8

    chart.legend('name', {
      position: 'bottom',
    });
    chart.render();

    legends = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.LEGEND);
    expect(legends[0].component.get('padding')).toEqual([8, 0, 8, 0]); // 主题水平默认 8
  });

  it('update padding', () => {
    chart.legend('name', {
      position: 'right',
      padding: [16, 16, 16, 16],
    });

    chart.render(true);

    const legends = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.LEGEND);

    expect(legends[0].component.get('padding')).toEqual([16, 16, 16, 16]);
    expect(legends[0].component.getBBox().maxX).toBeLessThan(600 - 15); // 右侧大于 15px padding
    expect(legends[0].component.getBBox().minX).toBeGreaterThan(500);

    chart.legend('name', {
      position: 'bottom',
      padding: [16, 16, 16, 16],
    });

    chart.render(true);

    expect(legends[0].component.get('padding')).toEqual([16, 16, 16, 16]);
    expect(legends[0].component.getBBox().minX).toBeLessThan(300);
    expect(legends[0].component.getBBox().maxY).toBeLessThan(500 - 15); // 最底部大于 15px padding
  });

  afterAll(() => {
    chart.destroy();
  });
});
