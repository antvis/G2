import { createCanvas, createDiv } from '../../util/dom';
import { getKeyPointsOfShape, isIntersect } from '../../../src/util/graphics';
import { rotate } from '../../../src/util/transform';

describe('graphics', () => {
  const canvas = createCanvas({
    container: createDiv(),
    width: 400,
    height: 400,
  });

  const rectShape = canvas.addShape({
    type: 'rect',
    attrs: {
      x: 10,
      y: 10,
      width: 50,
      height: 50,
      fill: 'red',
    },
  });
  canvas.draw();

  it('get key points of shape', () => {
    const keyPoints = getKeyPointsOfShape(rectShape);
    expect(keyPoints).toEqual([
      [10, 10],
      [60, 10],
      [60, 60],
      [10, 60],
    ]);
  });

  it('get key points of shape with rotate', () => {
    rectShape.rotateAtPoint(10, 10, -Math.PI / 2);
    const keyPoints = getKeyPointsOfShape(rectShape);
    // 浮点数精度误差
    expect(keyPoints.map((point) => [Math.floor(point[0]), Math.floor(point[1])])).toEqual([
      [10, -40],
      [60, -40],
      [60, 10],
      [10, 10],
    ]);

    rectShape.rotateAtPoint(10, 10, (Math.PI / 4) * 3);
    rectShape.attr('rotate', Math.PI / 4);
    const keyPoints1 = getKeyPointsOfShape(rectShape);
    const r = 50 * Math.cos(Math.PI / 4);
    // 浮点数精度误差
    expect(keyPoints1).toEqual([
      [10.000000000000002, 9.999999999999998],
      [10 + r, 45.35533905932737],
      [10.000000000000007, 10 + 2 * r],
      [-25.35533905932737, 10 + r],
    ]);
  });

  const rect0 = canvas.addShape({
    type: 'rect',
    attrs: {
      x: 10,
      y: 100,
      width: 50,
      height: 50,
      fill: 'yellow',
    },
  });
  const rect1 = canvas.addShape({
    type: 'rect',
    attrs: {
      x: 70,
      y: 100,
      width: 50,
      height: 50,
      fill: 'lightgreen',
    },
  });

  it('isIntersect', () => {
    expect(isIntersect(rect0, rect1)).toBeFalsy();

    rect0.translate(22, 0);
    expect(isIntersect(rect0, rect1)).not.toBeFalsy();

    rect0.resetMatrix();
    expect(isIntersect(rect0, rect1)).toBeFalsy();

    rect0.attr('rotate', -Math.PI / 8);
    rotate(rect0, -Math.PI / 8);
    expect(isIntersect(rect0, rect1)).not.toBeFalsy();

    rect0.resetMatrix();
    expect(isIntersect(rectShape, rect1)).toBeFalsy();

    rotate(rect0, -Math.PI / 8);
    rect0.attr('rotate', -Math.PI / 8);
    rotate(rect1, Math.PI / 8);
    rect1.attr('rotate', Math.PI / 8);
    expect(isIntersect(rect0, rect1)).not.toBeFalsy();

    rect0.resetMatrix();
    rotate(rect0, Math.PI / 8);
    rect0.attr('rotate', Math.PI / 8);
    // 平行
    expect(isIntersect(rect0, rect1)).toBeFalsy();
  });

  afterAll(() => {
    rectShape.destroy();
    canvas.destroy();
  });
});
