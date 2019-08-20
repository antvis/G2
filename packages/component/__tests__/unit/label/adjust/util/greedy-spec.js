import { expect } from 'chai';
import Greedy from '../../../../../src/label/adjust/util/greedy';

describe('Greedy: label/adjust/util/greedy', () => {
  let greedy;
  let bitmap;
  const bbox = { minX: 0, minY: 0, maxX: 100, maxY: 100 };

  beforeEach(() => {
    greedy = new Greedy();
    bitmap = greedy.bitmap;
  });
  afterEach(() => {
    greedy.destroy();
  });

  it('new Greedy()', () => {
    expect(greedy.bitmap).to.eql({});
    expect(greedy.xGap).to.equal(1);
    expect(greedy.yGap).to.equal(8);

    greedy = new Greedy({ xGap: 4, yGap: 4 });
    expect(greedy.xGap).to.equal(4);
    expect(greedy.yGap).to.equal(4);
  });

  it('greedy.fillGap(bbox)', () => {
    greedy.fillGap(bbox);
    // x edges
    for (let i = bbox.minX; i < bbox.maxX; i += 1) {
      expect(bitmap[i][bbox.minY]).to.be.true;
      expect(bitmap[i][bbox.maxY]).to.be.true;
    }
    // y edges
    for (let i = bbox.minY; i < bbox.maxY; i += 1) {
      expect(bitmap[bbox.minX][i]).to.be.true;
      expect(bitmap[bbox.maxX][i]).to.be.true;
    }
  });

  it('greedy.hasGap(bbox)', () => {
    greedy.fillGap(bbox);
    const outerBBox = { minX: 101, minY: 101, maxX: 200, maxY: 200 };
    const innerBBox = { minX: 25, minY: 25, maxX: 75, maxY: 75 };
    const intersectBBox = { minX: 50, minY: 50, maxX: 175, maxY: 175 };
    expect(greedy.hasGap(outerBBox)).to.be.true;
    expect(greedy.hasGap(innerBBox)).to.be.false;
    expect(greedy.hasGap(intersectBBox)).to.be.false;
  });

  it('greedy.destroy()', () => {
    greedy.destroy();
    expect(greedy.bitmap).to.eql({});
  });
});
