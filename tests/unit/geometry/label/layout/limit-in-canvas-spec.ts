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
    // mock
    const text1 = canvas.addShape({
      type: 'text',
      attrs: {
        x: 10,
        y: -3,
        text: '12345',
        fill: 'red',
      }
    });
    const text2 = canvas.addShape({
      type: 'text',
      attrs: {
        x: -3,
        y: 10,
        text: '12345',
        fill: 'red',
      }
    });
    const text3 = canvas.addShape({
      type: 'text',
      attrs: {
        x: 110,
        y: 10,
        text: '12345',
        fill: 'red',
      }
    });
    const text4 = canvas.addShape({
      type: 'text',
      attrs: {
        x: 90,
        y: 10,
        text: '1111111111',
        fill: 'red',
      }
    });
    const text5 = canvas.addShape({
      type: 'text',
      attrs: {
        x: 50,
        y: 100,
        text: '222',
        fill: 'red',
      }
    });
    const text6 = canvas.addShape({
      type: 'text',
      attrs: {
        x: 50,
        y: 95,
        text: '222',
        fill: 'red',
      }
    });
    const text7 = canvas.addShape({
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

    expect(canvas.getCanvasBBox().minX).toBeLessThan(0);

    // @ts-ignore
    limitInCanvas(canvas.getChildren(), [], region);
    canvas.draw();
    expect(canvas.getChildren().length).toBe(7);
    expect(canvas.getCanvasBBox().minX).toBe(0);
    expect(canvas.getCanvasBBox().minY).toBe(0);
    expect(canvas.getCanvasBBox().maxX).toBe(100);
    expect(canvas.getCanvasBBox().maxY).toBe(100);
  });

  afterAll(() => {
    canvas.destroy();
    removeDom(div);
  });
});
