import { getCoordinate } from '../../../../src/dependents';
import Element from '../../../../src/geometry/element';
import ViolinShapeFactory from '../../../../src/geometry/shape/violin';
import { getTheme } from '../../../../src/theme/';
import { createCanvas, createDiv } from '../../../util/dom';
import '../../../../src/geometry/shape/violin/hollow';

const Theme = getTheme('default');
const Rect = getCoordinate('rect');

describe('Violin hollow shape', () => {
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
    const points = ViolinShapeFactory.getShapePoints('hollow', {
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
    const points = ViolinShapeFactory.getShapePoints('hollow', {
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
      'hollow',
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

    expect(shape.attr('stroke')).toBe('red');
    expect(shape.attr('path')).toEqual([
      // 顺时针，从右上角到左上角。
      // 右半边部分
      ['M', 50, 88],
      ['L', 37.5, 12],
      ['L', 25, 50],
      ['L', 12.5, 20],
      // 左半边部分
      ['L', -12.5, 20],
      ['L', -25, 50],
      ['L', -37.5, 12],
      ['L', -50, 88],
      // 结束
      ['L', 50, 88],
      ['Z'],
    ]);
  });

  it('getMarker', () => {
    const markerCfg = ViolinShapeFactory.getMarker('hollow', { color: 'red', isInPolar: false });
    expect(markerCfg).toEqual({
      symbol: 'circle',
      style: {
        r: 4,
        fill: null,
        stroke: 'red',
      },
    });
  });
});
