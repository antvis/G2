import { size } from '@antv/util';
import 'jest-extended';
import { getEngine, View } from '../../../../src';
import { createCanvas, createDiv } from '../../../util/dom';

const data = [
  { city: '杭州', sale: 100, category: '电脑' },
  { city: '广州', sale: 30, category: '电脑' },
  { city: '上海', sale: 200, category: '鼠标' },
  { city: '呼和浩特', sale: 10, category: '鼠标' },
];

const renderer = 'canvas';

describe('View', () => {
  const div = createDiv();

  const canvas = createCanvas({
    container: div,
    renderer,
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
    visible: false,
  });

  it('constructor', () => {
    expect(view.canvas).toBeInstanceOf(getEngine(renderer).Canvas);
    // @ts-ignore
    expect(view.backgroundGroup).toBeInstanceOf(getEngine(renderer).Group);
    // @ts-ignore
    expect(view.middleGroup).toBeInstanceOf(getEngine(renderer).Group);
    // @ts-ignore
    expect(view.foregroundGroup).toBeInstanceOf(getEngine(renderer).Group);
    expect(view.visible).toBeFalse();
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
      x: 0,
      y: 0,
      width: 800,
      height: 600,
    });
    expect({
      x: view.coordinateBBox.x,
      y: view.coordinateBBox.y,
      width: view.coordinateBBox.width,
      height: view.coordinateBBox.height,
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

  it('source', () => {
    // deperated method
    view.source(data);

    expect(view.getOptions().data).toEqual(data);
  });

  it('axis', () => {
    view.axis(false);
    expect(view.getOptions().axes).toBe(false);
  });

  it('legend', () => {
    view.legend({
      position: 'right',
    });
    expect(view.getOptions().legends).toEqual({
      position: 'right',
    });

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
    expect(size(view.getOptions().filters)).toBe(1);
    expect(view.getOptions().filters.sale).toBeDefined();

    view.filter('sale', null);
    expect(size(view.getOptions().filters)).toBe(0);
    expect(view.getOptions().filters.sale).toBeUndefined();

    view.filter('sale', (sale: number) => sale <= 150);
    view.filter('city', (city: string) => city.length <= 2);

    expect(size(view.getOptions().filters)).toEqual(2);

    // @ts-ignore
    view.doFilterData();

    // @ts-ignore
    expect(view.filteredData).toEqual([
      { city: '杭州', sale: 100, category: '电脑' },
      { city: '广州', sale: 30, category: '电脑' },
    ]);
  });

  it('coordinate', () => {
    // @ts-ignore
    view.createCoordinate();
    expect(view.getCoordinate().type).toEqual('rect');

    let c = view.coordinate({
      type: 'theta',
    });
    expect(c.getOption().type).toEqual('theta');

    c = view.coordinate();
    expect(c.getOption().type).toBe('rect');

    c = view.coordinate('rect');
    expect(c.getOption().type).toEqual('rect');

    view.render();
    expect(view.getCoordinate().getWidth()).toEqual(790);
    expect(view.getCoordinate().getHeight()).toEqual(590);
  });

  it('coord', () => {
    const c = view.coord('rect');
    expect(c.getOption().type).toEqual('rect');
  });

  it('animate', () => {
    // @ts-ignore 默认执行动画
    expect(view.options.animate).toBe(true);
    view.animate(false);
    // @ts-ignore
    expect(view.options.animate).toBe(false);
  });

  it('theme', () => {
    view.theme({ xxx: 1 });

    // @ts-ignore
    expect(view.getTheme().xxx).toBe(1);
    expect(view.getTheme().defaultColor).toBe('#5B8FF9');
  });

  it('geometry', () => {
    view
      .polygon()
      .position('city*category')
      .color('sale');

    view.render();
    expect(view.geometries.length).toEqual(1);
    expect(size(view.geometries[0].scales)).toEqual(3);
    expect(view.geometries[0].scales.city.ticks).toEqual(['杭州', '广州']);
    expect(view.geometries[0].scales.sale.values).toEqual([100, 30, 200, 10]);
    // @ts-ignore
    expect(view.geometries[0].animateOption).toBe(false);

    expect(view.getCoordinate().getWidth()).toBeWithin(780, 800);
    expect(view.getCoordinate().getHeight()).toBeWithin(580, 600);

    expect(view.geometries[0].visible).toBe(false);
    expect(view.foregroundGroup.get('visible')).toBeFalse();
  });

  it('component', () => {
    expect(view.getComponents().length).toEqual(0);

    view.axis(true);
    view.legend(true);
    view.render();

    expect(view.getComponents().length).toEqual(4);
    expect(view.controllers[2].visible).toBe(false);

    const bbox = view.getComponents()[0].component.getBBox();
    expect(bbox.height).toEqual(22.25);
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

  it('getSnapRecords()', () => {
    const point = view.getXY({ city: '杭州', sale: 100, category: '电脑' });
    const snapRecords = view.getSnapRecords(point);

    expect(snapRecords.length).toBe(1);
    expect(snapRecords[0]._origin).toEqual({ city: '杭州', sale: 100, category: '电脑' });
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

  it('show()', () => {
    view.show();
    expect(view.visible).toBe(true);
    expect(view.geometries[0].visible).toBe(true);
    expect(view.controllers[2].visible).toBe(true);
    expect(view.foregroundGroup.get('visible')).toBeTrue();
  });

  it('hide()', () => {
    view.hide();
    expect(view.visible).toBe(false);
    expect(view.geometries[0].visible).toBe(false);
    expect(view.controllers[2].visible).toBe(false);
    expect(view.foregroundGroup.get('visible')).toBe(false);
  });

  it('changeVisible', () => {
    view.changeVisible(false);
    expect(view.visible).toBe(false);

    view.changeVisible(true);
    expect(view.visible).toBe(true);
  });

  it('getXY', () => {
    const position = view.getXY({ city: '杭州', sale: 40, category: '鼠标' });
    expect(position.x).toBe(202.5);
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
    expect(view.isTooltipLocked()).toBeTrue();
    // @ts-ignore
    expect(div.getElementsByClassName('g2-tooltip')[0].style['pointer-events']).toBe('auto');
  });

  it('unlockTooltip', () => {
    view.unlockTooltip();
    expect(view.isTooltipLocked()).toBeFalse();
    // @ts-ignore
    expect(div.getElementsByClassName('g2-tooltip')[0].style['pointer-events']).toBe('none');
  });

  it('filtered group scale values', () => {
    const dom = createDiv();

    const canvas1 = createCanvas({
      container: dom,
      renderer,
    });

    const view1 = new View({
      parent: null,
      canvas: canvas1,
      foregroundGroup: canvas.addGroup(),
      middleGroup: canvas.addGroup(),
      backgroundGroup: canvas.addGroup(),
      padding: 5,
      visible: false,
    });

    view1.data(data);
    view1.filter('category', (category: string) => category === '电脑');
    view1.filter('city', (city: string) => city === '杭州');

    // 测试 filterData API
    expect(view1.filterData([{ city: '杭州', category: '电脑' }, { city: '杭州', category: 'xx' }])).toEqual(
      [{ city: '杭州', category: '电脑' }]
    );

    expect(view1.filterFieldData('city', [{ city: '杭州' }])).toEqual(
      [{ city: '杭州' }]
    );

    const geometry = view1
      .line()
      .position('city*sale')
      .color('category');

    view1.render();

    expect(geometry.scales.category.values).toEqual(['电脑', '鼠标']);
    expect(geometry.scales.city.values).toEqual(['杭州']);

    view1.filter('category', null);
    view1.filter('city', null);
    view1.render(true);

    expect(geometry.scales.category.values).toEqual(['电脑', '鼠标']);
    expect(geometry.scales.city.values).toEqual(['杭州', '广州', '上海', '呼和浩特']);
  });
});
