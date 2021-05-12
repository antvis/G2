import { Chart } from '../../../../src/index';
import { createDiv } from '../../../util/dom';

describe('axis top', () => {
  it('top config', async () => {
    const data = [
      { name: 'London', 月份: 'Jan.', 月均降雨量: 18.9 },
      { name: 'London', 月份: 'Feb.', 月均降雨量: 28.8 },
      { name: 'London', 月份: 'Mar.', 月均降雨量: 39.3 },
      { name: 'Berlin', 月份: 'Jan.', 月均降雨量: 12.4 },
      { name: 'Berlin', 月份: 'Feb.', 月均降雨量: 23.2 },
      { name: 'Berlin', 月份: 'Mar.', 月均降雨量: 34.5 },
    ];

    const chart = new Chart({
      container: createDiv(),
      height: 500,
      width: 600,
      autoFit: false,
      padding: 48,
    });

    chart.data(data);

    chart.interval().position('月份*月均降雨量').color('name').adjust('dodge');

    chart.axis('月份', {
      top: true,
      grid: {},
    })

    chart.render();

    // axis 和 grid 创建到 foregroundGroup 中
    // @ts-ignore
    expect(chart.foregroundGroup.getChildren()[0].getChildren()[0].get('name')).toBe('grid');
    // @ts-ignore
    expect(chart.foregroundGroup.getChildren()[1].getChildren()[0].get('name')).toBe('axis');

    chart.destroy();
  });
});
