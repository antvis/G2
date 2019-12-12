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

    expect(size(view.getOptions().filters)).toEqual(2);

    // @ts-ignore
    view.filterData();

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

  it('theme', () => {
    view.theme({ xxx: 1 });

    // @ts-ignore
    expect(view.getTheme().xxx).toBe(1);
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
    expect(view.geometries[0].scales.sale.values).toEqual([100, 30]);
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
    expect(view.components[2].visible).toBe(false);

    const bbox = view.getComponents()[0].component.getBBox();
    expect(bbox.height).toEqual(22.5);
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

  it('show()', () => {
    view.show();
    expect(view.visible).toBe(true);
    expect(view.geometries[0].visible).toBe(true);
    expect(view.components[2].visible).toBe(true);
    expect(view.foregroundGroup.get('visible')).toBeTrue();
  });

  it('hide()', () => {
    view.hide();
    expect(view.visible).toBe(false);
    expect(view.geometries[0].visible).toBe(false);
    expect(view.components[2].visible).toBe(false);
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
    expect(position.x).toBe(233.25);
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
  });

  it('unlockTooltip', () => {
    view.unlockTooltip();
    expect(view.isTooltipLocked()).toBeFalse();
  });
});
