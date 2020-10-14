import { Chart } from '../../../../src';
import { createDiv, removeDom } from '../../../util/dom';
import { salesBySubCategory, subSalesBySubCategory, subSalesByArea } from '../../../data/sales';
import { COMPONENT_TYPE } from '../../../../src/constant';
import { BBox } from '../../../../src/util/bbox';
import { delay } from '../../../util/delay';
import { near } from '../../../util/math';

describe('Scrollbar', () => {
  const container = createDiv();

  it('scrollbar /w interval horizontal', async () => {
    const chart = new Chart({
      container,
      height: 400,
      width: 500,
    });
    chart.animate(false);
    chart.data(salesBySubCategory);
    chart.option('scrollbar', {
      type: 'horizontal',
    });
    chart.scale('sales', {
      nice: true,
      formatter: (v) => `${Math.floor(v / 10000)}万`,
    });
    chart.axis('subCategory', {
      label: {
        autoRotate: false,
      },
    });
    chart.interval().position('subCategory*sales').label('sales');

    chart.render();
    const coordinateBBox = chart.coordinateBBox;

    await delay(1);

    const [scrollbar] = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.SCROLLBAR);
    const scrollbarBBox = scrollbar.component.getLayoutBBox();
    const [xAxis] = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.AXIS);
    const xAxisBBox = xAxis.component.getLayoutBBox();

    // initial state
    expect(scrollbarBBox.height).toBe(8);
    expect(scrollbarBBox.width).toBe(coordinateBBox.width);
    expect(near(xAxisBBox.maxY, 392 - 16)).toBe(true);
    expect(scrollbar.component.get('trackLen')).toBe(coordinateBBox.width);
    // @ts-ignore
    expect(chart.filteredData.length).toBe(14);
  });

  it('scrollbar /w interval vertical', async () => {
    const chart = new Chart({
      container,
      height: 500,
      width: 400,
    });
    chart.data(salesBySubCategory);
    chart.option('scrollbar', {
      type: 'vertical',
    });
    chart.scale('sales', {
      nice: true,
      formatter: (v) => `${Math.floor(v / 10000)}万`,
    });
    chart.coordinate().transpose();
    chart.interval().position('subCategory*sales').label('sales');

    chart.render();
    const coordinateBBox = chart.coordinateBBox;

    await delay(1);

    const [scrollbar] = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.SCROLLBAR);
    const scrollbarBBox = scrollbar.component.getBBox();

    expect(scrollbarBBox.width).toBe(8);
    expect(scrollbarBBox.height).toBe(coordinateBBox.height);
    expect(scrollbar.component.get('trackLen')).toBe(coordinateBBox.height);
    // @ts-ignore
    expect(chart.filteredData.length).toBe(14);
  });

  it('scrollbar /w grouped interval horizontal', async () => {
    const chart = new Chart({
      container,
      height: 400,
      width: 500,
    });
    chart.data(subSalesBySubCategory);
    chart.option('scrollbar', {
      type: 'horizontal',
      categorySize: 32 * 3,
    });
    chart.legend({
      position: 'top',
    });
    chart.scale('sales', {
      nice: true,
      formatter: (v) => `${Math.floor(v / 10000)}万`,
    });
    chart
      .interval()
      .position('subCategory*sales')
      .color('series')
      .adjust({
        type: 'dodge',
      })
      .label('sales');

    chart.render();
    const coordinateBBox = chart.coordinateBBox;

    await delay(1);

    const [scrollbar] = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.SCROLLBAR);
    const scrollbarBBox = scrollbar.component.getLayoutBBox();
    const [xAxis] = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.AXIS);
    const xAxisBBox = xAxis.component.getLayoutBBox();

    expect(scrollbarBBox.height).toBe(8);
    expect(scrollbarBBox.width).toBe(coordinateBBox.width);
    // padding 8 * 2
    expect(near(xAxisBBox.maxY, 392 - 16)).toBe(true);
    expect(scrollbar.component.get('trackLen')).toBe(coordinateBBox.width);
    // @ts-ignore
    expect(chart.filteredData.length).toBe(12);
  });

  it('scrollbar horizontal not overlap with legend', async () => {
    const chart = new Chart({
      container,
      height: 400,
      width: 500,
    });
    chart.data(subSalesBySubCategory);
    chart.option('scrollbar', {
      type: 'horizontal',
      categorySize: 32 * 3,
    });
    chart.legend({
      position: 'bottom',
    });
    chart.scale('sales', {
      nice: true,
      formatter: (v) => `${Math.floor(v / 10000)}万`,
    });
    chart
      .interval()
      .position('subCategory*sales')
      .color('series')
      .adjust({
        type: 'dodge',
      })
      .label('sales');

    chart.render();

    await delay(1);

    const legend = chart.getComponents().filter((co) => co.type === 'legend')[0];
    const legendBBox = BBox.fromObject(legend.component.getBBox());

    const scrollbar = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.SCROLLBAR)[0];
    const scrollbarBBox = BBox.fromObject(scrollbar.component.getBBox());

    // 没有重叠
    expect(legendBBox.collide(scrollbarBBox)).toBe(false);
  });

  it('scrollbar /w grouped vertical horizontal', async () => {
    const chart = new Chart({
      container,
      height: 400,
      width: 500,
    });
    chart.data(subSalesBySubCategory);
    chart.option('scrollbar', {
      type: 'vertical',
      categorySize: 32 * 3,
    });
    chart.legend({
      position: 'top',
    });
    chart.scale('sales', {
      nice: true,
      formatter: (v) => `${Math.floor(v / 10000)}万`,
    });
    chart.coordinate().transpose();
    chart
      .interval()
      .position('subCategory*sales')
      .color('series')
      .adjust({
        type: 'dodge',
      })
      .label('sales');

    chart.render();
    const coordinateBBox = chart.coordinateBBox;

    await delay(1);

    const [scrollbar] = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.SCROLLBAR);
    const scrollbarBBox = scrollbar.component.getBBox();

    expect(scrollbarBBox.width).toBe(8);
    expect(scrollbarBBox.height).toBe(coordinateBBox.height);
    expect(scrollbar.component.get('trackLen')).toBe(coordinateBBox.height);
    // @ts-ignore
    expect(chart.filteredData.length).toBe(9);
  });

  it('scrollbar vertical not overlay with legend', async () => {
    const chart = new Chart({
      container,
      height: 400,
      width: 500,
    });
    chart.data(subSalesBySubCategory);
    chart.option('scrollbar', {
      type: 'vertical',
      categorySize: 32 * 3,
    });
    chart.legend({
      position: 'right',
    });
    chart.scale('sales', {
      nice: true,
      formatter: (v) => `${Math.floor(v / 10000)}万`,
    });
    chart.coordinate().transpose();
    chart
      .interval()
      .position('subCategory*sales')
      .color('series')
      .adjust({
        type: 'dodge',
      })
      .label('sales');

    chart.render();

    await delay(1);

    const legend = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.LEGEND)[0];
    const legendBBox = BBox.fromObject(legend.component.getBBox());

    const scrollbar = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.SCROLLBAR)[0];
    const scrollbarBBox = BBox.fromObject(scrollbar.component.getBBox());

    // 没有重叠
    expect(legendBBox.collide(scrollbarBBox)).toBe(false);
  });

  it('scrollbar update after changeData', async () => {
    const chart = new Chart({
      container,
      height: 400,
      width: 360,
    });
    chart.animate(false);
    chart.data(salesBySubCategory);
    chart.axis('subCategory', {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    });
    chart.option('scrollbar', {
      type: 'horizontal',
    });
    chart.scale('sales', {
      nice: true,
      formatter: (v) => `${Math.floor(v / 10000)}万`,
    });
    chart.interval().position('subCategory*sales').label('sales');

    chart.render();
    await delay(500);
    chart.changeData(salesBySubCategory.slice(1));
    const coordinateBBox = chart.coordinateBBox;
    await delay(1);

    const [scrollbar] = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.SCROLLBAR);
    const scrollbarBBox = scrollbar.component.getLayoutBBox();
    const [xAxis] = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.AXIS);
    const xAxisBBox = xAxis.component.getLayoutBBox();

    // initial state
    expect(scrollbarBBox.height).toBe(8);
    expect(scrollbarBBox.width).toBe(coordinateBBox.width);
    expect(near(xAxisBBox.maxY, 392 - 16)).toBe(true);
    expect(scrollbar.component.get('trackLen')).toBe(coordinateBBox.width);
    // @ts-ignore
    expect(chart.filteredData.length).toBe(9);
  });

  it('scrollbar update after changeSize', async () => {
    const chart = new Chart({
      container,
      height: 400,
      width: 480,
      // autoFit: true,
    });
    chart.animate(false);
    chart.data(salesBySubCategory);
    chart.axis('subCategory', {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    });
    chart.option('scrollbar', {
      type: 'horizontal',
    });
    chart.scale('sales', {
      nice: true,
      formatter: (v) => `${Math.floor(v / 10000)}万`,
    });
    chart.interval().position('subCategory*sales').label('sales');

    chart.render();
    await delay(500);
    chart.changeSize(360, 400);
    const coordinateBBox = chart.coordinateBBox;
    await delay(1);

    const [scrollbar] = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.SCROLLBAR);
    const scrollbarBBox = scrollbar.component.getLayoutBBox();

    // initial state
    expect(scrollbarBBox.height).toBe(8);
    expect(scrollbar.component.get('trackLen')).toBe(coordinateBBox.width);
    // @ts-ignore
    expect(chart.filteredData.length).toBe(9);
  });

  afterAll(() => {
    // removeDom(container);
  });
});
