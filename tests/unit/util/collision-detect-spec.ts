import { createCanvas, createDiv } from '../../util/dom';
import { rotate } from '../../../src/util/transform';
import { isIntersect } from '../../../src/util/collision-detect';

describe('collision-detect', () => {
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

  it('判断旋转矩阵是否重叠', () => {
    const box1 = {
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      // 逆时针旋转
      rotation: -Math.PI / 6,
    };
    const box2 = {
      x: 100,
      y: 0,
      width: 100,
      height: 100,
      rotation: 0,
    };
    expect(isIntersect(box1, box2)).toBeTruthy();
    expect(isIntersect({ ...box1, rotation: -Math.PI / 2 }, box2)).not.toBeTruthy();
    expect(isIntersect({ ...box1, rotation: -Math.PI / 2 + Math.PI / 180 }, box2)).toBeTruthy();
    expect(isIntersect({ ...box1, rotation: Math.PI / 6 }, box2)).not.toBeTruthy();
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

  const getBox = (shape, rotation: number = 0) => ({ ...shape.getCanvasBBox(), rotation });

  it('判断旋转矩阵是否重叠: 随机旋转', () => {
    expect(isIntersect(getBox(rect0), getBox(rect1))).toBeFalsy();

    rect0.translate(22, 0);
    expect(isIntersect(getBox(rect0), getBox(rect1))).not.toBeFalsy();

    rect0.resetMatrix();
    expect(isIntersect(getBox(rect0), getBox(rect1))).toBeFalsy();

    let rotation0 = -Math.PI / 8;
    expect(isIntersect(getBox(rect0, rotation0), getBox(rect1))).not.toBeFalsy();
    // 看可视化效果
    rotate(rect0, rotation0);

    rect0.resetMatrix();
    expect(isIntersect(getBox(rect0, 0), getBox(rect1))).toBeFalsy();
    rotate(rect0, 0);

    rect0.resetMatrix();
    rect1.resetMatrix();
    rotation0 = -Math.PI / 4;
    let rotation1 = Math.PI / 4;

    expect(isIntersect(getBox(rect0, rotation0), getBox(rect1, rotation1))).not.toBeFalsy();
    // 看可视化效果
    rotate(rect0, rotation0);
    rotate(rect1, rotation1);

    rect0.resetMatrix();
    rect1.resetMatrix();
    rotation0 = Math.PI / 8;
    rotation1 = Math.PI / 8;
    expect(isIntersect(getBox(rect0, rotation0), getBox(rect1, rotation1))).toBeFalsy();
    // 看可视化效果：平行 （需要在 getCanvasBBox 之后）
    rotate(rect0, rotation0);
    rotate(rect1, rotation1);
  });

  it('判断旋转矩阵是否重叠: 十字架', () => {
    rect0.resetMatrix();
    rect1.resetMatrix();
    rect0.attr('width', 100);
    rect0.attr('height', 10);
    rect0.attr('x', 0);
    rect0.attr('y', 45);
    rect1.attr('width', 10);
    rect1.attr('height', 100);
    rect1.attr('x', 45);
    rect1.attr('y', 0);

    expect(isIntersect(getBox(rect0), getBox(rect1))).not.toBeFalsy();
  });

  it('判断旋转矩阵是否重叠: 包含', () => {
    rect0.resetMatrix();
    rect1.resetMatrix();
    rect0.attr('width', 100);
    rect0.attr('height', 200);
    rect0.attr('x', 0);
    rect0.attr('y', 0);
    rect1.attr('width', 10);
    rect1.attr('height', 10);
    rect1.attr('x', 45);
    rect1.attr('y', 45);

    expect(isIntersect(getBox(rect0), getBox(rect1))).not.toBeFalsy();
  });

  afterAll(() => {
    rectShape.remove(true);
    rect0.remove(true);
    rect1.remove(true);
    canvas.destroy();
  });
});
