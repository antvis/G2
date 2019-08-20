import { expect } from 'chai';
import bboxAdjust from '../../../../src/label/adjust/bbox';

describe('bboxAdjust(labels, shapes): label/adjust/bbox', () => {
  it('is function', () => {
    expect(bboxAdjust).to.be.a('function');
  });

  it('remove labels', () => {
    // mock
    let removedCount = 0;
    function remove() {
      removedCount += 1;
    }

    function attr() {}
    const labels = [
      { attr, remove, getBBox() { return { width: 10, height: 10 }; }, note: 'inner' },
      { attr, remove, getBBox() { return { width: 10, height: 10 }; }, note: 'outer' },
      { attr, remove, getBBox() { return { width: 20, height: 10 }; }, note: 'outer' },
      { attr, remove, getBBox() { return { width: 10, height: 20 }; }, note: 'outer' },
    ];
    const shapes = [
      { getBBox() { return { width: 10, height: 10 }; } },
      { getBBox() { return { width: 10, height: 10 }; } },
      { getBBox() { return { width: 10, height: 10 }; } },
      { getBBox() { return { width: 10, height: 10 }; } },
    ];

    bboxAdjust(labels, shapes);

    expect(removedCount).to.equal(2);
  });
});
