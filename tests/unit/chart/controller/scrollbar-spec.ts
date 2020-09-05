import { Chart } from '../../../../src';
import { createDiv, removeDom } from '../../../util/dom';
import { salesBySubCategory, subSalesBySubCategory, subSalesByArea } from '../../../data/sales';
import { COMPONENT_TYPE } from '../../../../src/constant';
import { delay } from '../../../util/delay';

describe('Scrollbar', () => {
  const container = createDiv();

  it.only('scrollbar /w interval horizontal', async () => {
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
    chart.interval().position('subCategory*sales').label('sales');

    chart.render();
    // @ts-ignore
    window.__chart__ = chart;

    await delay(1);

    const coordinateBBox = chart.coordinateBBox;
    const [scrollbar] = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.OTHER);
    const scrollbarBBox = scrollbar.component.getLayoutBBox();
    const [xAxis] = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.AXIS);
    const xAxisBBox = xAxis.component.getLayoutBBox();

    // initial state
    expect(scrollbarBBox.height).toBe(8);
    expect(scrollbarBBox.width).toBe(coordinateBBox.width);
    expect(xAxisBBox.maxY).toBe(392);
    expect(scrollbar.component.get('trackLen')).toBe(coordinateBBox.width);
    // @ts-ignore
    expect(chart.filteredData.length).toBe(14);

    // change data
    chart.changeData(salesBySubCategory.slice(1));
  });

  it('scrollbar /w interval vertical', () => {
    const chart = new Chart({
      container,
      height: 500,
      width: 400,
    });
    chart.data(salesBySubCategory);
    chart.option('scrollbar', {
      type: 'vertical',
      // animate: false,
    });
    chart.scale('sales', {
      nice: true,
      formatter: (v) => `${Math.floor(v / 10000)}万`,
    });
    chart.coordinate().transpose();
    chart.interval().position('subCategory*sales').label('sales');

    chart.render();
    // @ts-ignore
    window.__chart__ = chart;
  });

  it('scrollbar /w grouped interval horizontal', () => {
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
    // @ts-ignore
    window.__chart__ = chart;
  });

  it('scrollbar /w grouped vertical horizontal', () => {
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
    // @ts-ignore
    window.__chart__ = chart;
  });

  afterAll(() => {
    // removeDom(container);
  });
});
