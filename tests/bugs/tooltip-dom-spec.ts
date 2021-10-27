import { Chart } from '../../src';
import { createDiv, removeDom } from '../util/dom';

describe('clear + render: checkt tooltip dom', () => {
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

  it('tooltip clear render', () => {
    // 测试 clear + render 几次之后， tooltip dom 是否还是 1 个
    for (let i = 1; i <= 3; i++) {
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
    const point = chart.getXY({ name: 'London', 月份: 'Mar.', 月均降雨量: 39.3 });
    chart.showTooltip(point);
    const tooltipDom = container.getElementsByClassName('g2-tooltip');
    const tooltipGuide = chart.foregroundGroup.findAll((el) => {
      return el.get('name') === 'tooltipGuide';
    });
    // 保证 tooltip dom 只有一个
    expect(tooltipDom.length).toBe(1);
    expect(tooltipGuide.length).toBe(1);
    expect(chart.foregroundGroup.getChildren().length).toBe(8);
  });

  afterAll(() => {
    chart.destroy();
    removeDom(container);
  });
});
