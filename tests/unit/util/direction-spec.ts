import { DIRECTION } from '../../../src';
import { getCoordinate } from '../../../src/dependents';
import { BBox } from '../../../src/util/bbox';
import { directionToPosition, getTranslateDirection } from '../../../src/util/direction';

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
    const Ctor = getCoordinate('rect');
    const coordinate = new Ctor({
      start: { x: 0, y: 100 },
      end: { x: 100, y: 100 },
    });

    expect(getTranslateDirection(DIRECTION.BOTTOM, coordinate)).toEqual(DIRECTION.BOTTOM);
    expect(getTranslateDirection(DIRECTION.LEFT, coordinate)).toEqual(DIRECTION.LEFT);
    expect(getTranslateDirection(DIRECTION.RIGHT, coordinate)).toEqual(DIRECTION.RIGHT);
    expect(getTranslateDirection(DIRECTION.TOP, coordinate)).toEqual(DIRECTION.TOP);

    coordinate.transpose();

    expect(getTranslateDirection(DIRECTION.BOTTOM, coordinate)).toEqual(DIRECTION.LEFT);
    expect(getTranslateDirection(DIRECTION.LEFT, coordinate)).toEqual(DIRECTION.BOTTOM);
    expect(getTranslateDirection(DIRECTION.RIGHT, coordinate)).toEqual(DIRECTION.TOP);
    expect(getTranslateDirection(DIRECTION.TOP, coordinate)).toEqual(DIRECTION.RIGHT);

    // 关闭 transpose
    coordinate.transpose();

    expect(coordinate.isTransposed).toBe(false);

    coordinate.scale(-0.5, 0.5); // -0.5, 0.5
    expect(getTranslateDirection(DIRECTION.LEFT, coordinate)).toEqual(DIRECTION.RIGHT);
    expect(getTranslateDirection(DIRECTION.RIGHT, coordinate)).toEqual(DIRECTION.LEFT);
    expect(getTranslateDirection(DIRECTION.TOP, coordinate)).toEqual(DIRECTION.TOP);
    expect(getTranslateDirection(DIRECTION.BOTTOM, coordinate)).toEqual(DIRECTION.BOTTOM);

    coordinate.scale(-1, -1); // 0.5, -0.5
    expect(getTranslateDirection(DIRECTION.LEFT, coordinate)).toEqual(DIRECTION.LEFT);
    expect(getTranslateDirection(DIRECTION.RIGHT, coordinate)).toEqual(DIRECTION.RIGHT);
    expect(getTranslateDirection(DIRECTION.TOP, coordinate)).toEqual(DIRECTION.BOTTOM);
    expect(getTranslateDirection(DIRECTION.BOTTOM, coordinate)).toEqual(DIRECTION.TOP);

    coordinate.scale(-1, 1); // -0.5 -0.5
    expect(getTranslateDirection(DIRECTION.LEFT, coordinate)).toEqual(DIRECTION.RIGHT);
    expect(getTranslateDirection(DIRECTION.RIGHT, coordinate)).toEqual(DIRECTION.LEFT);
    expect(getTranslateDirection(DIRECTION.TOP, coordinate)).toEqual(DIRECTION.BOTTOM);
    expect(getTranslateDirection(DIRECTION.BOTTOM, coordinate)).toEqual(DIRECTION.TOP);

    coordinate.transpose();
    expect(getTranslateDirection(DIRECTION.LEFT, coordinate)).toEqual(DIRECTION.TOP);
    expect(getTranslateDirection(DIRECTION.RIGHT, coordinate)).toEqual(DIRECTION.BOTTOM);
    expect(getTranslateDirection(DIRECTION.TOP, coordinate)).toEqual(DIRECTION.LEFT);
    expect(getTranslateDirection(DIRECTION.BOTTOM, coordinate)).toEqual(DIRECTION.RIGHT);
  });
});
