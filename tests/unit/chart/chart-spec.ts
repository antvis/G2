import { Chart, getEngine, LAYER } from '../../../src/';
import { VIEW_LIFE_CIRCLE } from '../../../src/constant';
import { CITY_SALE } from '../../util/data';
import { createDiv } from '../../util/dom';

import 'jest-extended';

describe('Chart', () => {
  const div = createDiv();

  const chart = new Chart({
    container: div,
    width: 800,
    height: 600,
    padding: 5,
    appendPadding: 5,
    autoFit: false,
    visible: false,
  });

  chart.data(CITY_SALE);
  chart.scale({
    city: { key: true },
    sale: { key: true },
  });

  chart
    .interval()
    .position('city*sale')
    .color('category');

  it('constructor', () => {
    expect(chart.autoFit).toBe(false);
    expect(chart.localRefresh).toBe(true);
    expect(chart.width).toEqual(800);
    expect(chart.height).toEqual(600);
    expect(chart.canvas).toBeInstanceOf(getEngine(chart.renderer).Canvas);

    expect(chart.getLayer(LAYER.BG)).toBeInstanceOf(getEngine(chart.renderer).Group);
    expect(chart.getLayer(LAYER.MID)).toBeInstanceOf(getEngine(chart.renderer).Group);
    expect(chart.getLayer(LAYER.FORE)).toBeInstanceOf(getEngine(chart.renderer).Group);

    chart.render();
    // region -> view bbox
    expect({
      x: chart.viewBBox.x,
      y: chart.viewBBox.y,
      width: chart.viewBBox.width,
      height: chart.viewBBox.height,
    }).toEqual({
      x: 0,
      y: 0,
      width: 800,
      height: 600,
    });

    expect({
      x: chart.coordinateBBox.x,
      y: chart.coordinateBBox.y,
      width: chart.coordinateBBox.width,
      height: chart.coordinateBBox.height,
    }).toEqual({
      x: 10,
      y: 10,
      width: 780,
      height: 580,
    });
    expect(chart.interactions.length).not.toBe(0);
  });

  it('render', () => {
    const renderEvent = jest.fn();
    chart.on(VIEW_LIFE_CIRCLE.BEFORE_RENDER, renderEvent);
    chart.on(VIEW_LIFE_CIRCLE.AFTER_RENDER, renderEvent);
    chart.on(VIEW_LIFE_CIRCLE.BEFORE_PAINT, renderEvent);
    chart.on(VIEW_LIFE_CIRCLE.AFTER_PAINT, renderEvent);

    chart.render();
    expect(renderEvent).toBeCalledTimes(4);

    expect(chart.getLayer(LAYER.BG).get('children').length).not.toBe(0);
    expect(chart.getLayer(LAYER.MID).get('children').length).not.toBe(0);
    expect(chart.getLayer(LAYER.FORE).get('children').length).not.toBe(0);
    // @ts-ignore
    expect(chart.wrapperElement.style.display).toBe('none');
    expect(chart.visible).toBe(false);
  });

  it('element id', () => {
    const elementsMap = chart.geometries[0].elementsMap;
    expect(elementsMap).toContainAllKeys([
      '杭州-100', '广州-30', '上海-110', '呼和浩特-40',
      '杭州-40', '广州-90', '上海-200', '呼和浩特-10',
    ]);
  });

  it('show()', () => {
    chart.show();
    expect(chart.visible).toBe(true);
    // @ts-ignore
    expect(chart.wrapperElement.style.display).toBe('');
  });

  it('hide()', () => {
    chart.hide();
    expect(chart.visible).toBe(false);
    // @ts-ignore
    expect(chart.wrapperElement.style.display).toBe('none');
  });

  it('changeSize', () => {
    // @ts-ignore

    let bbox = chart.viewBBox;
    expect({ x: bbox.x, y: bbox.y, width: bbox.width, height: bbox.height }).toEqual({
      x: 0,
      y: 0,
      width: 800,
      height: 600,
    });

    chart.changeSize(700, 600);
    // @ts-ignore
    bbox = chart.viewBBox;
    expect({ x: bbox.x, y: bbox.y, width: bbox.width, height: bbox.height }).toEqual({
      x: 0,
      y: 0,
      width: 700,
      height: 600,
    });

    const elementsMap = chart.geometries[0].elementsMap;
    expect(elementsMap).toContainAllKeys([
      '杭州-100', '广州-30', '上海-110', '呼和浩特-40',
      '杭州-40', '广州-90', '上海-200', '呼和浩特-10',
    ]);
  });

  it('changeVisible', () => {
    chart.changeVisible(false);
    expect(chart.visible).toBe(false);
    // @ts-ignore
    expect(chart.wrapperElement.style.display).toBe('none');
  });

  it('clear', () => {
    const clearEvent = jest.fn();
    chart.on(VIEW_LIFE_CIRCLE.BEFORE_CLEAR, clearEvent);
    chart.on(VIEW_LIFE_CIRCLE.AFTER_CLEAR, clearEvent);

    chart.clear();
    expect(clearEvent).toBeCalledTimes(2);

    // @ts-ignore
    expect(chart.filteredData).toEqual([]);
    // @ts-ignore
    expect(chart.scalePool.scales.size).toBe(0);
    expect(!!chart.getCoordinate()).toBe(false);

    // @ts-ignore
    // expect(chart.viewEventCaptureRect).not.toBeUndefined();
    expect(chart.getLayer(LAYER.BG).get('children').length).toBe(3);
    expect(chart.getLayer(LAYER.MID).get('children').length).toBe(1);
    expect(chart.getLayer(LAYER.FORE).get('children').length).toBe(4);
  });

  it('destroy', () => {
    const destroyEvent = jest.fn();
    chart.on(VIEW_LIFE_CIRCLE.BEFORE_DESTROY, destroyEvent);

    chart.destroy();
    expect(chart.getLayer(LAYER.BG).destroyed).toBe(true);
    expect(chart.getLayer(LAYER.MID).destroyed).toBe(true);
    expect(chart.getLayer(LAYER.FORE).destroyed).toBe(true);
    expect(destroyEvent).toBeCalledTimes(1);

    expect(() => { chart.forceFit() }).not.toThrow();
    expect(chart.destroyed).toBe(true);
    expect(chart.canvas.destroyed).toBe(true);
    expect(div.childNodes.length).toBe(0);

    // @ts-ignore
    // expect(chart.viewEventCaptureRect.getParent()).toBeUndefined();
  });
});
