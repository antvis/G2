import { getCoordinate } from '../../../../src/dependents';
import Element from '../../../../src/geometry/element';
import { getSmoothViolinPath } from '../../../../src/geometry/shape/util/get-path-points';
import ViolinShapeFactory from '../../../../src/geometry/shape/violin';
import { getTheme } from '../../../../src/theme';
import { createCanvas, createDiv } from '../../../util/dom';
import '../../../../src/geometry/shape/violin/smooth';

const Theme = getTheme('default');
const Rect = getCoordinate('rect');

describe('Violin smooth shape', () => {
  const div = createDiv();
  const canvas = createCanvas({
    container: div,
    width: 100,
    height: 100,
  });
  const rectCoord = new Rect({
    start: { x: 0, y: 0 },
    end: { x: 100, y: 100 },
  });
  ViolinShapeFactory.coordinate = rectCoord;
  ViolinShapeFactory.theme = Theme.geometries.schema;

  const element = new Element({
    shapeFactory: ViolinShapeFactory,
    container: canvas.addGroup(),
  });

  it('getShapePoints', () => {
    const points = ViolinShapeFactory.getShapePoints('smooth', {
      // 小提琴中心点的 x 坐标
      x: 0,
      // 小提琴的实际最大宽度
      size: 1,
      // @ts-ignore 核密度函数估算出来的密度
      _size: [1, 2, 3, 4],
      // 核密度函数进行估算的采样点
      y: [0.2, 0.5, 0.12, 0.88],
    });
    expect(points).toEqual([
      // 顺时针，从右上角到左上角。
      // 右半边部分
      { isMin: false, isMax: true, x: 0.5, y: 0.88 },
      { isMin: false, isMax: false, x: 0.375, y: 0.12 },
      { isMin: false, isMax: false, x: 0.25, y: 0.5 },
      { isMin: true, isMax: false, x: 0.125, y: 0.2 },
      // 左半边部分
      { isMin: true, isMax: false, x: -0.125, y: 0.2 },
      { isMin: false, isMax: false, x: -0.25, y: 0.5 },
      { isMin: false, isMax: false, x: -0.375, y: 0.12 },
      { isMin: false, isMax: true, x: -0.5, y: 0.88 },
    ]);
  });

  it('draw', () => {
    const points = ViolinShapeFactory.getShapePoints('smooth', {
      // 小提琴中心点的 x 坐标
      x: 0,
      // 小提琴的实际最大宽度
      size: 1,
      // @ts-ignore 核密度函数估算出来的密度
      _size: [1, 2, 3, 4],
      // 核密度函数进行估算的采样点
      y: [0.2, 0.5, 0.12, 0.88],
    });
    const shape = ViolinShapeFactory.drawShape(
      'smooth',
      {
        x: 14,
        y: 14,
        points,
        color: 'red',
        defaultStyle: {
          ...Theme.geometries.polygon.polygon.default.style,
        },
      },
      element.container
    );

    expect(shape.attr('fill')).toBe('red');

    // 预期的路径是 getSmoothViolinPath() 后做坐标转换，这个函数在 get-path-points-spec.ts 有单测了。
    const expectedPath = getSmoothViolinPath([
      // 顺时针，从右上角到左上角。
      // 右半边部分
      { x: 0.5, y: 0.88 },
      { x: 0.375, y: 0.12 },
      { x: 0.25, y: 0.5 },
      { x: 0.125, y: 0.2 },
      // 左半边部分
      { x: -0.125, y: 0.2 },
      { x: -0.25, y: 0.5 },
      { x: -0.375, y: 0.12 },
      { x: -0.5, y: 0.88 },
    ]).map((pathCommand: any) =>
      pathCommand.map((v) => {
        if (typeof v === 'string') return v.toUpperCase();
        if (typeof v === 'number') return v * 100; // 根据 rectCoord 转换的
        return v;
      })
    );
    expect(shape.attr('path')).toEqual(expectedPath);
  });

  it('getMarker', () => {
    const markerCfg = ViolinShapeFactory.getMarker('smooth', { color: 'red', isInPolar: false });
    expect(markerCfg).toEqual({
      symbol: 'circle',
      style: {
        r: 4,
        fill: 'red',
        stroke: null,
      },
    });
  });
});
