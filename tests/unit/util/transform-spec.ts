import { getIdentityMatrix, rotate, translate, zoom } from '../../../src/util/transform';
import { createCanvas, createDiv } from '../../util/dom';

describe('transform', () => {
  const canvas = createCanvas({
    container: createDiv(),
    width: 200,
    height: 200,
  });
  const shape = canvas.addShape({
    type: 'rect',
    attrs: {
      x: 10,
      y: 10,
      width: 60,
      height: 100,
      fill: 'red',
    }
  });
  canvas.draw()

  it('rotate', () => {
    rotate(shape, Math.PI * 0.25);
    expect(shape.getMatrix()).toEqual([0.7071067811865476, 0.7071067811865475, 0, -0.7071067811865475, 0.7071067811865476, 0, 10, -4.142135623730951, 1]);
  });

  it('translate', () => {
    shape.resetMatrix();
    translate(shape, 50, 50);
    expect(shape.getMatrix()).toEqual([1, 0, 0, 0, 1, 0, 50, 50, 1]);
  });

  it('zoom', () => {
    shape.resetMatrix();
    zoom(shape, 0.5);
    expect(shape.getMatrix()).toEqual([0.5, 0, 0, 0, 0.5, 0, 20, 30, 1]);
  });

  it('getIdentityMatrix', () => {
    expect(getIdentityMatrix()).toEqual([1, 0, 0, 0, 1, 0, 0, 0, 1]);
  });
});
