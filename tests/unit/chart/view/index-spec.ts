import * as _ from '@antv/util';
import 'jest-extended';
import { Chart, View } from '../../../../src';
import { Canvas, Group } from '../../../../src/dependents';
import { createCanvas, createDiv } from '../../../util/dom';

const data = [
  { city: '杭州', sale: 100, category: '电脑' },
  { city: '广州', sale: 30, category: '电脑' },
  { city: '上海', sale: 200, category: '鼠标' },
  { city: '呼和浩特', sale: 10, category: '鼠标' },
];

describe('View', () => {
  const div = createDiv();

  const canvas = createCanvas({
    container: div,
  });

  const backgroundGroup = canvas.addGroup();
  const middleGroup = canvas.addGroup();
  const foregroundGroup = canvas.addGroup();

  const view = new View({
    parent: null,
    canvas,
    foregroundGroup,
    middleGroup,
    backgroundGroup,
    padding: 5,
  });

  it('constructor', () => {
    expect(view.canvas).toBeInstanceOf(Canvas);
    // @ts-ignore
    expect(view.backgroundGroup).toBeInstanceOf(Group);
    // @ts-ignore
    expect(view.middleGroup).toBeInstanceOf(Group);
    // @ts-ignore
    expect(view.foregroundGroup).toBeInstanceOf(Group);
  });

  it('region', () => {
    view.render();
    // region -> view bbox
    expect({
      x: view.viewBBox.x,
      y: view.viewBBox.y,
      width: view.viewBBox.width,
      height: view.viewBBox.height,
    }).toEqual({
      x: 5,
      y: 5,
      width: 790,
      height: 590,
    });
  });

  it('data', () => {
    view.data(data);

    expect(view.getOptions().data).toEqual(data);
  });

  it('axis', () => {
    view.axis(false);
    expect(view.getOptions().axes).toBe(false);
  });

  it('legend', () => {
    view.legend(false);
    expect(view.getOptions().legends).toBe(false);
  });

  it('tooltip', () => {
    view.tooltip(false);
    expect(view.getOptions().tooltip).toBe(false);

    view.tooltip({
      showTitle: false,
    });

    expect(view.getOptions().tooltip).toEqual({
      showTitle: false,
    });
  });

  it('filter', () => {
    view.filter('sale', (sale: number) => sale <= 150);
    view.filter('city', (city: string) => city.length <= 2);

    expect(_.size(view.getOptions().filters)).toEqual(2);

    // @ts-ignore
    view.filterData();

    // @ts-ignore
    expect(view.filteredData).toEqual([
      { city: '杭州', sale: 100, category: '电脑' },
      { city: '广州', sale: 30, category: '电脑' },
    ]);
  });

  it('coordinate', () => {
    view.createCoordinate();
    expect(view.getCoordinate().type).toEqual('rect');

    let c = view.coordinate('theta');
    expect(c.type).toEqual('theta');

    c = view.coordinate('rect');
    expect(c.type).toEqual('rect');

    expect(view.getCoordinate().getWidth()).toEqual(790);
    expect(view.getCoordinate().getHeight()).toEqual(590);
  });

  it('animate', () => {
    // @ts-ignore 默认执行动画
    expect(view.options.animate).toBe(true);
    view.animate(false);
    // @ts-ignore
    expect(view.options.animate).toBe(false);
  });

  it('geometry', () => {
    view
      // @ts-ignore
      .polygon()
      .position('city*category')
      .color('sale');

    view.render();
    expect(view.geometries.length).toEqual(1);
    expect(_.size(view.geometries[0].scales)).toEqual(3);
    expect(view.geometries[0].scales.city.ticks).toEqual(['杭州', '广州']);
    expect(view.geometries[0].scales.sale.values).toEqual([100, 30]);
    // @ts-ignore
    expect(view.geometries[0].animateOption).toBe(false);

    expect(view.getCoordinate().getWidth()).toBeWithin(780, 800);
    expect(view.getCoordinate().getHeight()).toBeWithin(580, 600);
  });

  it('component', () => {
    expect(view.getOptions().components.length).toEqual(0);

    view.axis(true);
    view.legend(true);
    view.render();

    expect(view.getOptions().components.length).toEqual(3); // continuous legend to be continue

    const bbox = view.getOptions().components[0].component.getBBox();
    expect(bbox.height).toEqual(45.5);
  });

  it('layout result', () => {
    expect(view.coordinateBBox.x).toBeGreaterThanOrEqual(view.viewBBox.x);
    expect(view.coordinateBBox.y).toBeGreaterThanOrEqual(view.viewBBox.y);
    expect(view.getCoordinate().getWidth()).toBeLessThanOrEqual(view.viewBBox.width);
    expect(view.getCoordinate().getHeight()).toBeLessThanOrEqual(view.viewBBox.height);
  });

  it('getXScale', () => {
    expect(view.getXScale().field).toEqual('city');
  });

  it('getYScales', () => {
    expect(view.getYScales().map((s) => s.field)).toEqual(['category']);
  });

  it('getGroupScales', () => {
    expect(view.getGroupScales().map((s) => s.field)).toEqual([]);
  });

  it('getLegendAttributes', () => {
    expect(
      view
        .getLegendAttributes()
        .map((a) => a.getScale(a.type))
        .map((s) => s.field)
    ).toEqual(['sale']);
  });

  it('changeData', () => {
    const geometries = view.geometries;
    view.changeData([
      ...data,
      { city: '杭州', sale: 40, category: '鼠标' },
      { city: '广州', sale: 90, category: '鼠标' },
    ]);
    // @ts-ignore
    expect(view.filteredData.length).toEqual(4);
    // 几何标记是同一个实例
    expect(geometries[0] === view.geometries[0]).toEqual(true);
  });

  it('getXY', () => {
    const position = view.getXY({ city: '杭州', sale: 40, category: '鼠标' });
    expect(position).toEqual({ x: 230.25, y: 141.125 });
  });

  it('showTooltip', () => {
    let result;
    view.on('tooltip:show', (ev) => {
      result = ev;
    });
    const position = view.getXY({ city: '杭州', sale: 40, category: '鼠标' });
    view.showTooltip(position);

    expect(result).toBeDefined();
    expect(result.items[0].data).toEqual({ city: '杭州', sale: 40, category: '鼠标' });
  });

  it('tooltip:change', () => {
    const fn = jest.fn();
    view.on('tooltip:change', fn);

    view.showTooltip(view.getXY({ city: '杭州', sale: 40, category: '鼠标' }));
    expect(fn).not.toBeCalled();

    view.showTooltip(view.getXY({ city: '广州', sale: 90, category: '鼠标' }));
    expect(fn).toBeCalled();
  });

  it('hideTooltip', () => {
    const fn = jest.fn();
    view.on('tooltip:hide', fn);

    view.hideTooltip();
    expect(fn).toBeCalled();
  });

  it('lockTooltip', () => {
    view.lockTooltip();
    expect(view.getStateManager().getState('_isTooltipLocked')).toBeTrue();
  });

  it('unlockTooltip', () => {
    view.unlockTooltip();
    expect(view.getStateManager().getState('_isTooltipLocked')).toBeFalse();
  });
});
