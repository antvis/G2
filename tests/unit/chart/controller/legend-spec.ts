import { COMPONENT_TYPE, COMPONENT_MAX_VIEW_PERCENTAGE } from '../../../../src/constant';
import { Chart } from '../../../../src/index';
import { createDiv } from '../../../util/dom';

describe('Legend', () => {
  let chart: Chart;
  it('category', () => {
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
      reversed: true,
      title: {
        style: {
          fontSize: 16,
        },
      },
    });

    chart.interval().position('月份*月均降雨量').color('name').adjust('dodge');
    chart.render();

    const legends = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.LEGEND);
    expect(legends.length).toBe(1);
    expect(legends[0].component.getBBox().maxX).toBeLessThanOrEqual(chart.width);
    expect(legends[0].component.get('animate')).toBe(false);
    expect(legends[0].component.get('items')[0].name).toBe('Berlin');
    expect(legends[0].component.get('items')[1].name).toBe('London');
    expect(legends[0].component.get('title').text).toBe('name');
  });

  it('continuous color', () => {
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
    chart.legend({
      title: {
        style: {
          fontSize: 16,
        },
      },
    });

    chart.interval().position('月份*月均降雨量').color('月均降雨量').adjust('dodge');
    chart.render();

    const legends = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.LEGEND);
    expect(legends.length).toBe(1);
    // @ts-ignore
    expect(legends[0].component.getBBox().maxY).toBeLessThanOrEqual(chart.height);
    expect(legends[0].component.get('animate')).toBe(false);
    expect(legends[0].component.get('title').text).toBe('月均降雨量');
  });

  it('continuous size', () => {
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

    chart.legend('月均降雨量', {
      position: 'top',
      animate: true,
    });

    chart.interval().position('月份*月均降雨量').size('月均降雨量').adjust('dodge');
    chart.render();

    const legends = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.LEGEND);
    expect(legends.length).toBe(1);
    // @ts-ignore
    expect(legends[0].component.getBBox().minX).toBeGreaterThanOrEqual(0);
    expect(legends[0].component.get('animate')).toBe(true);
  });

  it('custom', () => {
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

    chart.legend({
      custom: true,
      items: [
        { name: 'London', value: 'London', marker: { symbol: 'tick', style: { r: 10 } } },
        { name: 'Berlin', value: 'Berlin', marker: { symbol: 'circle', style: { r: 10 } } },
      ],
      title: {
        text: '城市',
      },
    });

    chart.interval().position('月份*月均降雨量').size('月均降雨量').adjust('dodge');
    chart.render();

    const legends = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.LEGEND);
    expect(legends[0].component.get('items')[0].marker.symbol).toBeInstanceOf(Function);
    expect(legends[0].component.get('items')[1].marker.symbol).toBe('circle');
    expect(legends[0].component.get('title').text).toBe('城市');
  });

  it('category legend, use hexagon marker', () => {
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
      reversed: true,
      marker: {
        symbol: 'hexagon',
      },
    });

    chart.interval().position('月份*月均降雨量').color('name').adjust('dodge');
    chart.render();

    const legends = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.LEGEND);
    expect(legends[0].component.get('items')[0].marker.symbol).toBeInstanceOf(Function);
    expect(legends[0].component.get('items')[1].marker.symbol).toBeInstanceOf(Function);
  });

  it('legend maxWidth', () => {
    const data = [
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 3500 },
      { genre: 'Other', sold: 150 },
    ];

    chart = new Chart({
      container: createDiv(),
      autoFit: false,
      width: 380,
      height: 300,
    });

    chart.data(data);
    chart.animate(false);
    chart.scale('sold', {
      max: 3600,
      nice: false,
    });
    chart.coordinate().transpose();
    chart.interval().position('genre*sold').color('genre').label('sold');

    chart.render();

    const legend = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.LEGEND)[0].component;

    expect(legend.get('maxWidth')).toBe(chart.viewBBox.width);
    expect(legend.get('maxHeight')).toBe(chart.viewBBox.height * COMPONENT_MAX_VIEW_PERCENTAGE);

    chart.changeSize(300, 300);
    expect(legend.get('flipPage')).toBe(true);
    // @ts-ignore
    expect(legend.totalPagesCnt).toBe(2);
    // @ts-ignore
    expect(legend.pageHeight).toBe(20);
  });

  it('legend align with axis', () => {
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
      position: 'top-left',
    });

    chart.interval().position('月份*月均降雨量').color('name').adjust('dodge');
    chart.render();

    const legend = chart.getController('legend').getComponents()[0].component;
    const legendBBox = legend.getBBox();
    expect(legendBBox.x).toBe(0);
  });

  it('legend margin', () => {
    const container = createDiv();
    chart = new Chart({
      container,
      height: 500,
      width: 600,
      autoFit: false,
      theme: {
        components: {
          legend: {
            margin: [1, 2, 3, 4],
          },
        },
      },
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
      position: 'top-left',
    });

    chart.interval().position('月份*月均降雨量').color('name').adjust('dodge');
    chart.render();

    const legend = chart.getController('legend').getComponents()[0].component;
    const legendBBox = legend.getBBox();
    expect(legendBBox.x).toBe(4);
    expect(legendBBox.y).toBe(1);
  });

  afterAll(() => {
    chart.destroy();
  });
});
