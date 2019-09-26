import BBox from '@antv/g/lib/core/bbox';
import { expect } from 'chai';
import { DIRECTION } from '../../../src/chart';
import { directionToPosition } from '../../../src/util/direction';

const parentBBox = new BBox(10, 10, 100, 100);
const bbox = new BBox(0, 0, 20, 20);

describe('util direction', () => {
  it('directionToPosition', () => {
    expect(directionToPosition(parentBBox, bbox, DIRECTION.TOP)).to.eql([50, 10]);
    expect(directionToPosition(parentBBox, bbox, DIRECTION.TOP_LEFT)).to.eql([10, 10]);
    expect(directionToPosition(parentBBox, bbox, DIRECTION.TOP_RIGHT)).to.eql([90, 10]);

    expect(directionToPosition(parentBBox, bbox, DIRECTION.BOTTOM)).to.eql([50, 90]);
    expect(directionToPosition(parentBBox, bbox, DIRECTION.BOTTOM_LEFT)).to.eql([10, 90]);
    expect(directionToPosition(parentBBox, bbox, DIRECTION.BOTTOM_RIGHT)).to.eql([90, 90]);

    expect(directionToPosition(parentBBox, bbox, DIRECTION.LEFT)).to.eql([10, 50]);
    expect(directionToPosition(parentBBox, bbox, DIRECTION.LEFT_TOP)).to.eql([10, 10]);
    expect(directionToPosition(parentBBox, bbox, DIRECTION.LEFT_BOTTOM)).to.eql([10, 90]);

    expect(directionToPosition(parentBBox, bbox, DIRECTION.RIGHT)).to.eql([90, 50]);
    expect(directionToPosition(parentBBox, bbox, DIRECTION.RIGHT_TOP)).to.eql([90, 10]);
    expect(directionToPosition(parentBBox, bbox, DIRECTION.RIGHT_BOTTOM)).to.eql([90, 90]);

    // @ts-ignore
    expect(directionToPosition(parentBBox, bbox, 'xxx')).to.eql([0, 0]);
  });
});
