import { fixedOverlap, overlap } from '../../../../../src/geometry/label/layout/overlap';
import { removeDom } from '../../../../../src/util/dom';
import { createCanvas, createDiv } from '../../../../util/dom';

describe('GeometryLabel layout', () => {
  const div = createDiv();
  const canvas = createCanvas({
    container: div,
    width: 640,
    height: 480,
  });

  it('fixedOverlap', () => {
    // mock
    const labels = [];
    for (let i = 0; i < 20; i += 1) {
      const label = canvas.addGroup();
      label.addShape({
        type: 'text',
        attrs: {
          text: 'test',
          x: 100,
          y: 100,
          fill: 'red',
        },
      });
      labels.push(label);
    }
    expect(canvas.getChildren().length).toBe(20);

    // @ts-ignore
    fixedOverlap([], labels, [], {});
    canvas.draw();

    expect(canvas.getChildren().length).toBeLessThan(20);
  });

  it('overlap', () => {
    canvas.clear();

    // mock
    const labels = [];
    for (let i = 0; i < 20; i += 1) {
      const label = canvas.addGroup();
      label.addShape({
        type: 'text',
        attrs: {
          text: 'test',
          x: 300,
          y: 300,
          fill: 'red',
        },
      });
      labels.push(label);
    }
    expect(canvas.getChildren().length).toBe(20);

    // @ts-ignore
    overlap([], labels, [], {});
    canvas.draw();

    expect(canvas.getChildren().length).toBe(9);
  });

  afterAll(() => {
    canvas.destroy();
    removeDom(div);
  });
});
