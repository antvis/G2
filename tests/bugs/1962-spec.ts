import { Chart } from '../../src';
import { createDiv } from '../util/dom';

// G2Plot 1881
describe('#1881', () => {
  it('tooltip clear', () => {
    const chart = new Chart({
      container: createDiv(),
      width: 400,
      height: 300,
      autoFit: false,
    });

    chart.data([
      { city: '杭州', sale: 100, category: '电脑' },
      { city: '广州', sale: 30, category: '电脑' },
      { city: '上海', sale: 110, category: '电脑' },
      { city: '呼和浩特', sale: 40, category: '电脑' },
      { city: '上海', sale: 200, category: '鼠标' },
      { city: '呼和浩特', sale: 10, category: '鼠标' },
      { city: '杭州', sale: 40, category: '鼠标' },
      { city: '广州', sale: 90, category: '鼠标' },
    ]);

    chart.line().position('city*sale').color('category');
    chart.render();
    const elements = chart.geometries[0].elements
    const bbox = elements[elements.length - 1].getBBox();
    chart.showTooltip({ x: bbox.maxX, y: bbox.maxY })
    const tooltipController = chart.getController('tooltip');
    expect(tooltipController.visible).toBeTruthy();
    // @ts-ignore
    expect(tooltipController.items.length).toBe(1);
    // @ts-ignore
    expect(tooltipController.title).toBe('呼和浩特');
    tooltipController.clear();
    // @ts-ignore
    expect(tooltipController.items).toBe(null);
    // @ts-ignore
    expect(tooltipController.title).toBe(null);
  });
  it('tooltip destroy', () => {
    const chart = new Chart({
      container: createDiv(),
      width: 400,
      height: 300,
      autoFit: false,
    });

    chart.data([
      { city: '杭州', sale: 100, category: '电脑' },
      { city: '广州', sale: 30, category: '电脑' },
      { city: '上海', sale: 110, category: '电脑' },
      { city: '呼和浩特', sale: 40, category: '电脑' },
      { city: '上海', sale: 200, category: '鼠标' },
      { city: '呼和浩特', sale: 10, category: '鼠标' },
      { city: '杭州', sale: 40, category: '鼠标' },
      { city: '广州', sale: 90, category: '鼠标' },
    ]);

    chart.line().position('city*sale').color('category');
    chart.render();
    const elements = chart.geometries[0].elements
    const bbox = elements[elements.length - 1].getBBox();
    chart.showTooltip({ x: bbox.maxX, y: bbox.maxY })
    const tooltipController = chart.getController('tooltip');
    expect(tooltipController.visible).toBeTruthy();
    // @ts-ignore
    expect(tooltipController.items.length).toBe(1);
    // @ts-ignore
    expect(tooltipController.title).toBe('呼和浩特');
    tooltipController.destroy();
    // @ts-ignore
    expect(tooltipController.items).toBe(null);
    // @ts-ignore
    expect(tooltipController.title).toBe(null);
    // @ts-ignore
    expect(tooltipController.yCrosshair).toBe(null);
  });
});
