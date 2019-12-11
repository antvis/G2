import { Chart } from '../../../../src/index';
import { createDiv } from '../../../util/dom';

describe('Tooltip', () => {
  const container = createDiv();
  const chart = new Chart({
    container,
    autoFit: false,
    width: 400,
    height: 300,
  });
  chart.data([
    { name: 'London', 月份: 'Jan.', 月均降雨量: 18.9 },
    { name: 'London', 月份: 'Feb.', 月均降雨量: 28.8 },
    { name: 'London', 月份: 'Mar.', 月均降雨量: 39.3 },
    { name: 'Berlin', 月份: 'Jan.', 月均降雨量: 12.4 },
    { name: 'Berlin', 月份: 'Feb.', 月均降雨量: 23.2 },
    { name: 'Berlin', 月份: 'Mar.', 月均降雨量: 34.5 },
  ]);
  chart.axis(false);
  chart.legend(false);
  chart.tooltip({
    triggerOn: 'none',
    shared: true,
    showCrosshairs: true,
    showTooltipMarkers: true,
  });
  chart
    .interval()
    .position('月份*月均降雨量')
    .color('name')
    .adjust('dodge');
  chart.render();

  it('showTooltip', () => {
    let items;
    chart.on('tooltip:show', (e) => {
      items = e.items;
    });

    const point = chart.getXY({ name: 'London', 月份: 'Mar.', 月均降雨量: 39.3 });
    chart.showTooltip(point);

    expect(items.length).toBe(2);
    expect(items[0].data).toEqual({ name: 'London', 月份: 'Mar.', 月均降雨量: 39.3 });

    const tooltip = chart.getComponentPlugin('tooltip');
    // @ts-ignore
    expect(tooltip.tooltip.get('visible')).toBe(true);

    // @ts-ignore
    const markerGroup = tooltip.markerGroup;
    expect(markerGroup.getChildren().length).toBe(2);

    const crosshairs = container.getElementsByClassName('g2-tooltip-crosshair-x');
    expect(crosshairs.length).toBe(1);

    const foregroundGroup = chart.foregroundGroup;
    expect(foregroundGroup.getChildren().length).toBe(4);
  });

  it('hideTooltip', () => {
    const fn = jest.fn();
    chart.on('tooltip:hide', fn);

    chart.hideTooltip();
    expect(fn).toBeCalled();

    const tooltip = chart.getComponentPlugin('tooltip');
    // @ts-ignore
    expect(tooltip.tooltip.get('visible')).toBe(false);

    // @ts-ignore
    const markerGroup = tooltip.markerGroup;
    expect(markerGroup.get('visible')).toBe(false);

    const crosshairs = container.getElementsByClassName('g2-tooltip-crosshair-x');
    // @ts-ignore
    expect(crosshairs[0].style.display).toBe('none');
  });

  it('getTooltipItems', () => {
    const point = chart.getXY({ name: 'Berlin', 月份: 'Mar.', 月均降雨量: 34.5 });

    const items = chart.getTooltipItems(point);
    expect(items.length).toBe(2);

    expect(items[0].title).toBe('Mar.');
    expect(items[0].data).toEqual({ name: 'London', 月份: 'Mar.', 月均降雨量: 39.3 });
    expect(items[1].data).toEqual({ name: 'Berlin', 月份: 'Mar.', 月均降雨量: 34.5 });
  });

  it('clear', () => {
    chart.clear();

    const foregroundGroup = chart.foregroundGroup;
    expect(foregroundGroup.getChildren().length).toBe(1);

    const tooltipDom = container.getElementsByClassName('g2-tooltip');
    expect(tooltipDom.length).toBe(0);
  });

  it('uniq items', () => {
    chart.tooltip({
      shared: true,
    });
    chart.coordinate('polar');
    chart.data([
      { item: 'Design', user: 'a', score: 70 },
      { item: 'Design', user: 'b', score: 30 },
      { item: 'Development', user: 'a', score: 60 },
      { item: 'Development', user: 'b', score: 70 },
      { item: 'Marketing', user: 'a', score: 50 },
      { item: 'Marketing', user: 'b', score: 60 },
      { item: 'Users', user: 'a', score: 40 },
      { item: 'Users', user: 'b', score: 50 },
      { item: 'Test', user: 'a', score: 60 },
      { item: 'Test', user: 'b', score: 70 },
      { item: 'Language', user: 'a', score: 70 },
      { item: 'Language', user: 'b', score: 50 },
      { item: 'Technology', user: 'a', score: 50 },
      { item: 'Technology', user: 'b', score: 40 },
      { item: 'Support', user: 'a', score: 30 },
      { item: 'Support', user: 'b', score: 40 },
      { item: 'Sales', user: 'a', score: 60 },
      { item: 'Sales', user: 'b', score: 40 },
      { item: 'UX', user: 'a', score: 50 },
      { item: 'UX', user: 'b', score: 60 },
    ]);
    chart
      .line()
      .position('item*score')
      .color('user')
      .size(2);
    chart
      .point()
      .position('item*score')
      .color('user')
      .shape('circle')
      .size(4)
      .style({
        stroke: '#fff',
        lineWidth: 1,
        fillOpacity: 1,
      });
    chart
      .area()
      .position('item*score')
      .color('user');
    chart.render();

    const point = chart.getXY({ item: 'Technology', user: 'a', score: 50 });
    const tooltipItems = chart.getTooltipItems(point);
    expect(tooltipItems.length).toBe(2);
  });
});
