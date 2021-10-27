import { Chart } from '../../src';
import { createDiv, removeDom } from '../util/dom';

describe('foreGroundGroup -> labelsContainer', () => {
  const container = createDiv();
  const data = [
    { name: 'London', 月份: 'Jan.', 月均降雨量: 18.9 },
    { name: 'London', 月份: 'Feb.', 月均降雨量: 28.8 },
    { name: 'London', 月份: 'Mar.', 月均降雨量: 39.3 },
    { name: 'Berlin', 月份: 'Jan.', 月均降雨量: 12.4 },
    { name: 'Berlin', 月份: 'Feb.', 月均降雨量: 23.2 },
    { name: 'Berlin', 月份: 'Mar.', 月均降雨量: 34.5 },
  ];
  const chart = new Chart({
    container,
    autoFit: false,
    width: 400,
    height: 300,
  });
  chart.data(data);
  chart.tooltip({
    follow: true,
    shared: true,
    showCrosshairs: true,
    showMarkers: true,
  });
  chart.interval().position('月份*月均降雨量').color('name').adjust('dodge');
  chart.render();

  it('labelsContianer clear render', () => {
    // 测试 clear + render 几次之后， foreGroundGroup 中的 labelsContianer 是否重复生成，不会溢出
    for (let i = 1; i <= 10; i++) {
      chart.clear();
      chart.data(data);
      chart.tooltip({
        follow: true,
        shared: true,
        showCrosshairs: true,
        showMarkers: true,
      });
      chart.interval().position('月份*月均降雨量').color('name').adjust('dodge');
      chart.render();
    }
    expect(chart.foregroundGroup.getChildren().length).toBe(7);
  });

  afterAll(() => {
    chart.destroy();
    removeDom(container);
  });
});
