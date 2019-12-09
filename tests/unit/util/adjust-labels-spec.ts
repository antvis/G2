import { bboxAdjust, positionAdjust, spiralAdjust } from '../../../src/util/adjust-labels';
import { createCanvas, createDiv } from '../../util/dom';

describe('Adjust labels', () => {
  it('bboxAdjust', () => {
    // mock
    let removedCount = 0;
    function remove() {
      removedCount += 1;
    }

    function attr() {}
    const labels = [
      {
        attr,
        remove,
        getCanvasBBox() {
          return { minX: 10, minY: 10, maxX: 15, maxY: 20 };
        },
        note: 'inner',
      },
      {
        attr,
        remove,
        getCanvasBBox() {
          return { minX: 23, minY: 15, maxX: 25, maxY: 20 };
        },
        note: 'outer',
      },
      {
        attr,
        remove,
        getCanvasBBox() {
          return { minX: 3, minY: 15, maxX: 5, maxY: 30 };
        },
        note: 'outer',
      },
      {
        attr,
        remove,
        getCanvasBBox() {
          return { minX: 15, minY: 10, maxX: 35, maxY: 20 };
        },
        note: 'outer',
      },
    ];
    const shapes = [
      {
        getBBox() {
          return { minX: 4, minY: 4, maxX: 15, maxY: 30 };
        },
      },
      {
        getBBox() {
          return { minX: 10, minY: 10, maxX: 55, maxY: 50 };
        },
      },
      {
        getBBox() {
          return { minX: 10, minY: 10, maxX: 15, maxY: 20 };
        },
      },
      {
        getBBox() {
          return { minX: 10, minY: 10, maxX: 55, maxY: 40 };
        },
      },
    ];
    // @ts-ignore
    bboxAdjust(labels, shapes);

    expect(removedCount).toBe(1);
  });

  it('position adjust', () => {
    // mock
    const canvas = createCanvas({
      container: createDiv(),
      width: 640,
      height: 480,
    });
    const labels = [];
    for (let i = 0; i < 20; i += 1) {
      const text = canvas.addShape('text', {
        attrs: {
          text: 'test',
          x: 0,
          y: 0,
        },
      });
      labels.push(text);
    }
    positionAdjust(labels);

    expect(canvas.get('children').length).toBe(9);
  });

  it('spiralAdjust', () => {
    // mock
    const canvas = createCanvas({
      container: createDiv(),
      width: 640,
      height: 480,
    });
    const labels = [];
    for (let i = 0; i < 20; i += 1) {
      const text = canvas.addShape('text', {
        attrs: {
          text: 'test',
          x: 0,
          y: 0,
        },
      });
      labels.push(text);
    }
    spiralAdjust(labels);

    expect(canvas.get('children').length < 20).toBeTruthy();
  });
});
