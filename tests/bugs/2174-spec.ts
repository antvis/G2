import { Chart } from '../../src';
import { createDiv } from '../util/dom';

describe('#2174, #2175', () => {
  it('tooltip', () => {
    const data = [
      { name: 'London', 月份: 'Jan.', 月均降雨量: 18.9 },
    ];

    const chart = new Chart({
      container: createDiv(),
      width: 400,
      height: 300,
    });

    chart.data(data);
    chart.scale('月均降雨量', {
      nice: true,
    });
    chart.tooltip({
      shared: true
    });

    chart
      .interval()
      .position('月份*月均降雨量');

    chart.render();

    const point = chart.getXY({ name: 'London', 月份: 'Jan.', 月均降雨量: 18.9 });
    // 相同的内容，先展示，再关闭，再展示，tooltip 应该展示
    chart.showTooltip(point);
    const tooltipMarkerGroup = chart.foregroundGroup.findAllByName('tooltipMarkersGroup')[0];
    expect(tooltipMarkerGroup.get('visible')).toBeTruthy();

    chart.hideTooltip();

    chart.showTooltip(point);

    const tooltip = chart.ele.getElementsByClassName('g2-tooltip')[0];
    // @ts-ignore
    expect(tooltip.style.visibility).toBe('visible');
    expect(tooltipMarkerGroup.get('visible')).toBeTruthy();

    // 如果内容为空，tooltip 应该隐藏
    chart.showTooltip({
      x: point.x - 100,
      y: point.y
    });
    // @ts-ignore
    expect(tooltip.style.visibility).toBe('hidden');
    expect(tooltipMarkerGroup.get('visible')).toBeFalsy();
  });
});
