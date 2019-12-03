import { DIRECTION } from '../../../src';
import { BBox } from '../../../src/util/bbox';
import { directionToPosition, getTransposedDirection } from '../../../src/util/direction';

const parentBBox = new BBox(10, 10, 100, 100);
const bbox = new BBox(0, 0, 20, 20);

describe('util direction', () => {
  it('directionToPosition', () => {
    expect(directionToPosition(parentBBox, bbox, DIRECTION.TOP)).toEqual([50, 10]);
    expect(directionToPosition(parentBBox, bbox, DIRECTION.TOP_LEFT)).toEqual([10, 10]);
    expect(directionToPosition(parentBBox, bbox, DIRECTION.TOP_RIGHT)).toEqual([90, 10]);

    expect(directionToPosition(parentBBox, bbox, DIRECTION.BOTTOM)).toEqual([50, 90]);
    expect(directionToPosition(parentBBox, bbox, DIRECTION.BOTTOM_LEFT)).toEqual([10, 90]);
    expect(directionToPosition(parentBBox, bbox, DIRECTION.BOTTOM_RIGHT)).toEqual([90, 90]);

    expect(directionToPosition(parentBBox, bbox, DIRECTION.LEFT)).toEqual([10, 50]);
    expect(directionToPosition(parentBBox, bbox, DIRECTION.LEFT_TOP)).toEqual([10, 10]);
    expect(directionToPosition(parentBBox, bbox, DIRECTION.LEFT_BOTTOM)).toEqual([10, 90]);

    expect(directionToPosition(parentBBox, bbox, DIRECTION.RIGHT)).toEqual([90, 50]);
    expect(directionToPosition(parentBBox, bbox, DIRECTION.RIGHT_TOP)).toEqual([90, 10]);
    expect(directionToPosition(parentBBox, bbox, DIRECTION.RIGHT_BOTTOM)).toEqual([90, 90]);

    // @ts-ignore
    expect(directionToPosition(parentBBox, bbox, 'xxx')).toEqual([0, 0]);
  });

  it('getTransposedDirection', () => {
    expect(getTransposedDirection(DIRECTION.BOTTOM, false)).toEqual(DIRECTION.BOTTOM);
    expect(getTransposedDirection(DIRECTION.LEFT, false)).toEqual(DIRECTION.LEFT);
    expect(getTransposedDirection(DIRECTION.RIGHT, false)).toEqual(DIRECTION.RIGHT);
    expect(getTransposedDirection(DIRECTION.TOP, false)).toEqual(DIRECTION.TOP);

    expect(getTransposedDirection(DIRECTION.BOTTOM, true)).toEqual(DIRECTION.LEFT);
    expect(getTransposedDirection(DIRECTION.LEFT, true)).toEqual(DIRECTION.BOTTOM);
    expect(getTransposedDirection(DIRECTION.RIGHT, true)).toEqual(DIRECTION.RIGHT);
    expect(getTransposedDirection(DIRECTION.TOP, true)).toEqual(DIRECTION.TOP);
  });
});
