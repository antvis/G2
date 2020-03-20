import { limitInShape } from '../../../../../src/geometry/label/layout/limit-in-shape';

describe('GeometryLabel layout', () => {
  it('limitInShape', () => {
    // mock
    let removedCount = 0;
    function remove() {
      removedCount += 1;
    }

    function attr() { }
    const labels = [
      { attr, remove, getCanvasBBox() { return { minX: 1, minY: 1, maxX: 10, maxY: 10 }; }, note: 'inner' },
      { attr, remove, getCanvasBBox() { return { minX: 10, minY: 4, maxX: 14, maxY: 10 }; }, note: 'outer' },
      { attr, remove, getCanvasBBox() { return { minX: 0, minY: 0, maxX: 10, maxY: 10 }; }, note: 'outer' },
      { attr, remove, getCanvasBBox() { return { minX: 0, minY: 0, maxX: 10, maxY: 10 }; }, note: 'outer' },
    ];
    const shapes = [
      { getBBox() { return { minX: 0, minY: 0, maxX: 10, maxY: 10 }; } },
      { getBBox() { return { minX: 12, minY: 0, maxX: 10, maxY: 10 }; } },
      { getBBox() { return { minX: 0, minY: 0, maxX: 8, maxY: 10 }; } },
      { getBBox() { return { minX: 0, minY: 0, maxX: 10, maxY: 10 }; } },
    ];

    // @ts-ignore
    limitInShape([], labels, shapes, {});

    expect(removedCount).toBe(2);
  });
});
