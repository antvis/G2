import { BBox } from '@antv/g';
import { expect } from 'chai';
import { DIRECTION } from '../../../src/chart';
import { BBoxProcessor } from '../../../src/util/bbox';

describe('util/ bbox', () => {
  it('BBoxProcessor', () => {
    const bbox = new BBox(0, 0, 100, 100);
    const processor = new BBoxProcessor(bbox);

    processor
      .add(new BBox(0, 0, 200, 200), new BBox(100, 100, 250, 250)) // 0, 0, 250, 250
      .merge(new BBox(0, 0, 200, 200), new BBox(50, 50, 150, 150)) // 50, 50, 150, 150
      .cut(new BBox(50, 50, 100, 10), DIRECTION.TOP)
      .cut(new BBox(140, 50, 10, 100), DIRECTION.RIGHT)
      .cut(new BBox(50, 140, 100, 10), DIRECTION.BOTTOM)
      .cut(new BBox(50, 50, 10, 100), DIRECTION.LEFT); // 60, 60, 130, 130

    const newBBox = processor.value();
    expect(newBBox.x).to.be.eql(60);
    expect(newBBox.y).to.be.eql(60);
    expect(newBBox.width).to.be.eql(130);
    expect(newBBox.height).to.be.eql(130);
  });
});
