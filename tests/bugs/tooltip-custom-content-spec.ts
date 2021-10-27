import { Chart } from '../../src';
import { createDiv, removeDom } from '../util/dom';

/**
 * 解决第二次 showTooltip() 时， 设置 customContent: undefined 无法变回 tooltip 模版的问题
 *
 * 原因：在 tooltip 的 update() 中，设置 customContent 会销毁原来的 container，因此无法变回 tooltip 模版
 * 为什么会呈现 旧值：tooltip.show() 中 customContent 由 tooltip.container 获取。但在此之前的 tooltip.update() 中没有成功更新 tooltip.container
 *
 * 暂时解法：避免大改 component 的 update() 逻辑
 * 在 g2 层解：第二次调用 showTooltip() 的时候，如果之前设置过 customContent
 * 就在 clear 方法中清空 tooltip -> null, 保证下次是重新生成的，以变回模版
 */

describe('tooltip: customContent', () => {
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
    customContent: (name: string, data: any[]) => {
      return `
          <div class="g2-tooltip-custom-title">Title: ${name}</div>
          <ul class="g2-tooltip-custom-list">
            ${data.map((item) => `<li class="g2-tooltip-list-custom-item">Custom Value: ${item.value}<li>`).join('')}
          </ul>
        `;
    },
  });
  chart.interval().position('月份*月均降雨量').color('name').adjust('dodge');
  chart.render();

  it('showTooltip', () => {
    const point = chart.getXY({ name: 'London', 月份: 'Mar.', 月均降雨量: 39.3 });
    chart.showTooltip(point);

    const tooltipDom = container.getElementsByClassName('g2-tooltip');
    expect(tooltipDom.length).toBe(1);
    // 保证内容自定义了
    expect(tooltipDom[0].getElementsByClassName('g2-tooltip-custom-title')[0].innerHTML).toBe(`Title: Mar.`);
    const tooltipList = tooltipDom[0].getElementsByClassName('g2-tooltip-custom-list')[0];
    expect(tooltipList.getElementsByClassName('g2-tooltip-list-custom-item')[0].innerHTML).toBe('Custom Value: 39.3');
    expect(tooltipList.getElementsByClassName('g2-tooltip-list-custom-item')[1].innerHTML).toBe('Custom Value: 34.5');
  });

  it('tooltip: customContent: undefined', () => {
    chart.clear();
    chart.data(data);
    chart.tooltip({
      follow: true,
      shared: true,
      customContent: undefined, // 变回模版
    });
    chart.interval().position('月份*月均降雨量').color('name').adjust('dodge');
    chart.render();

    const point = chart.getXY({ name: 'London', 月份: 'Mar.', 月均降雨量: 39.3 });
    chart.showTooltip(point);
    const tooltipDom = container.getElementsByClassName('g2-tooltip');
    expect(tooltipDom.length).toBe(1);
    // expect(tooltipDom[0].getElementsByClassName('g2-tooltip-title')[0].innerHTML).toBe(`Mar.`);
    const tooltipList = tooltipDom[0].getElementsByClassName('g2-tooltip-list')[0];

    const item0 = tooltipList.getElementsByClassName('g2-tooltip-list-item')[0];
    expect(item0.getElementsByClassName('g2-tooltip-name')[0].innerHTML).toBe('London');
    expect(item0.getElementsByClassName('g2-tooltip-value')[0].innerHTML).toBe('39.3');

    const item1 = tooltipList.getElementsByClassName('g2-tooltip-list-item')[1];
    expect(item1.getElementsByClassName('g2-tooltip-name')[0].innerHTML).toBe('Berlin');
    expect(item1.getElementsByClassName('g2-tooltip-value')[0].innerHTML).toBe('34.5');
  });

  afterAll(() => {
    chart.destroy();
    removeDom(container);
  });
});
