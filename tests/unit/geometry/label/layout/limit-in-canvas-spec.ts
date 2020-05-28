import { limitInCanvas } from '../../../../../src/geometry/label/layout/limit-in-canvas';
import { createCanvas, createDiv, removeDom } from '../../../../util/dom';

describe('GeometryLabel layout', () => {
  const div = createDiv();
  const canvas = createCanvas({
    container: div,
    width: 100,
    height: 100,
  });

  it('limitInCanvas', () => {
    const group = canvas.addGroup();
    // mock
    const text1 = group.addShape({
      type: 'text',
      attrs: {
        x: 10,
        y: -3,
        text: '12345',
        fill: 'red',
      }
    });
    const text2 = group.addShape({
      type: 'text',
      attrs: {
        x: -3,
        y: 10,
        text: '12345',
        fill: 'red',
      }
    });
    const text3 = group.addShape({
      type: 'text',
      attrs: {
        x: 110,
        y: 10,
        text: '12345',
        fill: 'red',
      }
    });
    const text4 = group.addShape({
      type: 'text',
      attrs: {
        x: 90,
        y: 10,
        text: '1111111111',
        fill: 'red',
      }
    });
    const text5 = group.addShape({
      type: 'text',
      attrs: {
        x: 50,
        y: 100,
        text: '222',
        fill: 'red',
      }
    });
    const text6 = group.addShape({
      type: 'text',
      attrs: {
        x: 50,
        y: 95,
        text: '222',
        fill: 'red',
      }
    });
    const text7 = group.addShape({
      type: 'text',
      attrs: {
        x: 50,
        y: 50,
        text: '222',
        fill: 'red',
      }
    });

    const region = {
      x: 0,
      y: 0,
      minX: 0,
      minY: 0,
      maxX: 100,
      maxY: 100,
      width: 100,
      height: 100,
    };

    expect(group.getCanvasBBox().minX).toBeLessThan(0);

    // @ts-ignore
    limitInCanvas([], group.getChildren(), [], region);
    canvas.draw();
    expect(group.getChildren().length).toBe(7);
    expect(group.getCanvasBBox().minX).toBe(0);
    expect(group.getCanvasBBox().minY).toBe(0);
    expect(group.getCanvasBBox().maxX).toBe(100);
    expect(group.getCanvasBBox().maxY).toBe(100);
  });

  afterAll(() => {
    canvas.destroy();
    removeDom(div);
  });
});
