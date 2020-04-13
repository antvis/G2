import { Chart } from '../../../../src/index';
import { createDiv, removeDom } from '../../../util/dom';

describe('Tooltip', () => {
  const container = createDiv();
  let chart = new Chart({
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
    follow: true,
    shared: true,
    showCrosshairs: true,
    showMarkers: true,
    domStyles: {
      'g2-tooltip': {
        border: '1px solid #000',
        boxShadow: null,
      },
    },
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

    const tooltip = chart.getController('tooltip');
    // @ts-ignore
    expect(tooltip.tooltip.get('visible')).toBe(true);
    // @ts-ignore
    expect(tooltip.tooltip.get('x')).toBe(point.x);
    // @ts-ignore
    expect(tooltip.tooltip.get('y')).toBe(point.y);

    // @ts-ignore
    const markerGroup = tooltip.tooltipMarkersGroup;
    expect(markerGroup.getChildren().length).toBe(2);

    const foregroundGroup = chart.foregroundGroup;
    expect(foregroundGroup.getChildren().length).toBe(5);

    // 延迟生成
    const tooltipDom = container.getElementsByClassName('g2-tooltip')[0];
    // @ts-ignore
    expect(tooltipDom.style.border).toBe('1px solid rgb(0, 0, 0)');
    // @ts-ignore
    expect(tooltipDom.style.boxShadow).toBe('');
    // @ts-ignore
    expect(tooltipDom.style.backgroundColor).toBe(
      chart.getTheme().components.tooltip.domStyles['g2-tooltip'].backgroundColor
    );
  });

  it('tooltip change', () => {
    // 内容没有发生变化，但是位置更新了
    const changeEvent = jest.fn();
    chart.on('tooltip:change', changeEvent);
    const point = chart.getXY({ name: 'London', 月份: 'Mar.', 月均降雨量: 39.3 });
    chart.showTooltip({
      x: point.x + 10,
      y: point.y + 20,
    });
    expect(changeEvent).not.toBeCalled();

    const tooltip = chart.getController('tooltip');
    // @ts-ignore
    expect(tooltip.tooltip.get('x')).toBe(point.x + 10);
    // @ts-ignore
    expect(tooltip.tooltip.get('y')).toBe(point.y + 20);
  });

  it('hideTooltip', () => {
    const fn = jest.fn();
    chart.on('tooltip:hide', fn);

    chart.hideTooltip();
    expect(fn).toBeCalled();

    const tooltip = chart.getController('tooltip');
    // @ts-ignore
    expect(tooltip.tooltip.get('visible')).toBe(false);

    // @ts-ignore
    const markerGroup = tooltip.tooltipMarkersGroup;
    expect(markerGroup.get('visible')).toBe(false);
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
    expect(foregroundGroup.getChildren().length).toBe(5);

    const tooltipDom = container.getElementsByClassName('g2-tooltip');
    expect(tooltipDom.length).toBe(1);
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

  it('shared tooltip items with diffrent titles', () => {
    chart.destroy();
    chart = new Chart({
      container,
      autoFit: false,
      width: 400,
      height: 300,
    });
    chart.coordinate('rect');
    chart.data([
      { year: '1991', value: 3 },
      { year: '1992', value: 4 },
      { year: '1993', value: 3.5 },
      { year: '1994', value: 5 },
      { year: '1995', value: 4.9 },
      { year: '1996', value: 6 },
      { year: '1997', value: 7 },
      { year: '1998', value: 9 },
      { year: '1999', value: 13 },
    ]);
    chart.scale('value', {
      min: 0,
    });
    chart.scale('year', {
      range: [0, 1],
    });
    chart.tooltip({
      showCrosshairs: true,
      shared: true,
      follow: true,
    });
    chart.line().position('year*value');
    chart
      .point()
      .position('year*value')
      .size(4)
      .shape('circle')
      .style({
        stroke: '#fff',
        lineWidth: 1,
      });
    chart.render();

    // 构造两个数据点之间的位置
    const point1 = chart.getXY({ year: '1998', value: 9 });
    const point2 = chart.getXY({ year: '1999', value: 13 });
    const point = {
      x: (point2.x - point1.x) * 0.45 + point1.x,
      y: (point2.y - point1.y) * 0.4 + point1.y,
    };
    const tooltipItems = chart.getTooltipItems(point);
    expect(tooltipItems.length).toBe(1);
    expect(tooltipItems[0].title).toBe('1998');
    expect(tooltipItems[0].value).toBe('9');

    chart.showTooltip(point);
    // @ts-ignore
    expect(chart.getController('tooltip').tooltip.get('x')).toBe(point.x);
    // @ts-ignore
    expect(chart.getController('tooltip').tooltip.get('y')).toBe(point.y);
  });

  it('view with multiple geometry overlap', () => {
    chart.destroy();
    chart = new Chart({
      container,
      autoFit: false,
      width: 400,
      height: 300,
    });
    chart.data([
      { year: '1991', value: 3, value1: 34 },
      { year: '1992', value: 4, value1: 3 },
      { year: '1993', value: 3.5, value1: 14 },
      { year: '1994', value: 5, value1: 9 },
      { year: '1995', value: 4.9, value1: 17 },
    ]);
    chart.scale('value', {
      min: 0,
      max: 10,
    });
    chart.tooltip({
      showCrosshairs: true,
    });
    chart
      .point()
      .position('year*value')
      .size(4)
      .shape('circle');
    chart
      .point()
      .position('year*value1')
      .size(5)
      .shape('triangle');
    chart.render();

    // 构造两个数据点之间的位置
    const point = chart.getXY({ year: '1993', value: 3.5, value1: 14 });
    const tooltipItems = chart.getTooltipItems(point);
    expect(tooltipItems.length).toBe(1);
    expect(tooltipItems[0].title).toBe('1993');
    expect(tooltipItems[0].value).toBe('14');
  });

  afterAll(() => {
    chart.destroy();
    removeDom(container);
  });
});

describe('Multiple views tooltip', () => {
  const container = createDiv();
  const expectData = [
    { value: 100, name: '展现' },
    { value: 80, name: '点击' },
    { value: 60, name: '访问' },
    { value: 40, name: '咨询' },
    { value: 30, name: '订单' },
  ];
  const actualData = [
    { value: 80, name: '展现' },
    { value: 50, name: '点击' },
    { value: 30, name: '访问' },
    { value: 10, name: '咨询' },
    { value: 5, name: '订单' },
  ];
  const chart = new Chart({
    container,
    autoFit: false,
    width: 400,
    height: 300,
  });
  chart
    .coordinate('rect')
    .transpose()
    .scale(1, -1);
  chart.axis(false);
  chart.legend(false);
  chart.tooltip({
    showTitle: false,
    showMarkers: false,
    shared: true,
  });

  const expectView = chart.createView();
  expectView.data(expectData);
  expectView
    .interval()
    .adjust('symmetric')
    .position('name*value')
    .color('name', ['#0050B3', '#1890FF', '#40A9FF', '#69C0FF', '#BAE7FF'])
    .shape('pyramid');

  const actualView = chart.createView();
  actualView.data(actualData);
  actualView
    .interval()
    .adjust('symmetric')
    .position('name*value')
    .color('name', ['#0050B3', '#1890FF', '#40A9FF', '#69C0FF', '#BAE7FF'])
    .shape('pyramid');

  chart.render();

  it('showTooltip', () => {
    const position = expectView.getXY({ value: 60, name: '访问' });
    const tooltipItems = chart.getTooltipItems(position);

    expect(tooltipItems.length).toBe(2);
  });

  it('view.tooltip(false)', () => {
    expectView.tooltip(false);

    const position = expectView.getXY({ value: 60, name: '访问' });
    const tooltipItems = chart.getTooltipItems(position);

    expect(tooltipItems.length).toBe(1);
  });

  afterAll(() => {
    chart.destroy();
    removeDom(container);
  });
});

describe('geometry.tooltip()', () => {
  const container = createDiv();
  const chart = new Chart({
    container,
    width: 400,
    height: 300,
  });
  chart.data([
    { year: '1991', value: 3 },
    { year: '1992', value: 4 },
    { year: '1993', value: 3.5 },
    { year: '1994', value: 5 },
    { year: '1995', value: 4.9 },
  ]);
  chart.scale('value', {
    min: 0,
    max: 10,
  });
  chart
    .point()
    .position('year*value')
    .size(4)
    .shape('circle')
    .tooltip('year*value');
  chart.render();

  it('tooltip items', () => {
    const point = chart.getXY({ year: '1994', value: 5 });
    const tooltipItems = chart.getTooltipItems(point);

    expect(tooltipItems.length).toBe(2);
  });

  afterAll(() => {
    chart.destroy();
    removeDom(container);
  });
});

describe('showContent', () => {
  const container = createDiv();
  const data = [
    { year: '2001', population: 41.8 },
    { year: '2002', population: 38 },
    { year: '2003', population: 33.7 },
    { year: '2004', population: 30.7 },
    { year: '2005', population: 25.8 },
    { year: '2006', population: 31.7 },
    { year: '2007', population: 33 },
    { year: '2008', population: 46 },
    { year: '2009', population: 38.3 },
    { year: '2010', population: 28 },
    { year: '2011', population: 42.5 },
    { year: '2012', population: 30.3 },
  ];

  const chart = new Chart({
    container,
    width: 400,
    height: 300,
  });

  chart.data(data);
  chart.scale('population', {
    nice: true,
  });
  chart.coordinate('polar', {
    innerRadius: 0.4,
  });
  chart.axis(false);
  chart.legend(false);
  chart.tooltip({
    showContent: false,
    showCrosshairs: true,
    crosshairs: {
      line: {
        style: {
          lineDash: [2],
        },
      },
      text: {
        position: 'end',
        offset: 5,
        autoRotate: true,
        style: {
          fontSize: 14,
        },
      },
      textBackground: null,
    },
  });
  chart
    .interval()
    .position('year*population')
    .color('year')
    .size(100);
  chart.render();

  it('showContent: false', () => {
    const point = chart.getXY({ year: '2004', population: 30.7 });
    chart.showTooltip(point);

    const tooltip = chart.getController('tooltip');
    // @ts-ignore
    expect(tooltip.tooltip).toBeUndefined();
    const tooltipDom = container.getElementsByClassName('g2-tooltip');
    expect(tooltipDom.length).toBe(0);
  });

  afterAll(() => {
    chart.destroy();
    removeDom(container);
  });
});

describe('tooltip change', () => {
  const data = [
    { year: '1991', value: 15468 },
    { year: '1992', value: 16100 },
    { year: '1993', value: 15900 },
    { year: '1994', value: 17409 },
    { year: '1995', value: 17000 },
    { year: '1996', value: 31056 },
    { year: '1997', value: 31982 },
    { year: '1998', value: 32040 },
    { year: '1999', value: 33233 },
  ];
  const chart = new Chart({
    container: createDiv(),
    width: 400,
    height: 300,
  });

  chart.data(data);
  chart.tooltip({
    showCrosshairs: true,
    shared: true,
  });
  chart.area().position('year*value');

  chart.render();

  it('tooltip follow cursor', () => {
    const point = chart.getXY({ year: '1996', value: 31056 });
    chart.showTooltip({
      x: point.x,
      y: point.y + 30,
    });

    const tooltip = chart.getController('tooltip');
    // @ts-ignore
    const items = tooltip.items;
    expect(items.length).toBe(1);
    expect(items[0].data).toEqual({ year: '1996', value: 31056 });
    // @ts-ignore
    expect(tooltip.tooltip.get('x')).toBe(point.x);
    // @ts-ignore
    expect(tooltip.tooltip.get('y')).toBe(point.y + 30);

    // crosshairs not follow
    // @ts-ignore
    const crosshairs = tooltip.xCrosshair;
    expect(crosshairs.get('start').x).toBe(items[0].x);
  });

  it('tooltip position change, but not content', () => {
    const changeEvent = jest.fn();
    chart.on('tooltip:change', changeEvent);
    const point = chart.getXY({ year: '1996', value: 31056 });
    chart.showTooltip(point);

    expect(changeEvent).not.toBeCalled();
    const tooltip = chart.getController('tooltip');
    // @ts-ignore
    expect(tooltip.tooltip.get('x')).toBe(point.x);
    // @ts-ignore
    expect(tooltip.tooltip.get('y')).toBe(point.y);

    // @ts-ignore
    const markerGroup = tooltip.tooltipMarkersGroup;
    expect(markerGroup.getChildren()[0].attr('x')).toBe(point.x);
    expect(markerGroup.getChildren()[0].attr('y')).toBe(point.y);
  });

  it('tooltip content change', () => {
    const changeEvent = jest.fn();
    chart.on('tooltip:change', changeEvent);
    const point = chart.getXY({ year: '1993', value: 15900 });
    chart.showTooltip(point);

    expect(changeEvent).toBeCalled();
    const tooltip = chart.getController('tooltip');
    // @ts-ignore
    expect(tooltip.tooltip.get('x')).toBe(point.x);
    // @ts-ignore
    expect(tooltip.tooltip.get('y')).toBe(point.y);

    // @ts-ignore
    const markerGroup = tooltip.tooltipMarkersGroup;
    expect(markerGroup.getChildren()[0].attr('x')).toBe(point.x);
    expect(markerGroup.getChildren()[0].attr('y')).toBe(point.y);

    // crosshairs not follow
    // @ts-ignore
    const crosshairs = tooltip.xCrosshair;
    // @ts-ignore
    expect(crosshairs.get('start').x).toBe(tooltip.items[0].x);
  });
});
