import { getCoordinate } from '@antv/coord';
import { DIRECTION } from '../../../src';
import { getAxisFactor, getCircleAxisCenterRadius, getLineAxisRelativeRegion } from '../../../src/util/axis';

const Rect = getCoordinate('rect');

describe('util axis', () => {
  it('getAxisFactor', () => {
    const rect = new Rect({
      start: { x: 0, y: 0 },
      end: { x: 0, y: 0 },
    });

    expect(getAxisFactor(rect, DIRECTION.LEFT)).toBe(1);
    expect(getAxisFactor(rect, DIRECTION.BOTTOM)).toBe(-1);
    expect(getAxisFactor(rect, DIRECTION.RIGHT)).toBe(-1);
    expect(getAxisFactor(rect, DIRECTION.TOP)).toBe(1);
  });

  it('getAxisRelativeRegion', () => {
    expect(getLineAxisRelativeRegion(DIRECTION.LEFT)).toEqual({
      start: { x: 0, y: 0 },
      end: { x: 0, y: 1 },
    });
    expect(getLineAxisRelativeRegion(DIRECTION.BOTTOM)).toEqual({
      start: { x: 0, y: 0 },
      end: { x: 1, y: 0 },
    });
    expect(getLineAxisRelativeRegion(DIRECTION.RIGHT)).toEqual({
      start: { x: 1, y: 0 },
      end: { x: 1, y: 1 },
    });
    expect(getLineAxisRelativeRegion(DIRECTION.TOP)).toEqual({
      start: { x: 0, y: 1 },
      end: { x: 1, y: 1 },
    });
    // @ts-ignore
    expect(getLineAxisRelativeRegion('xxx')).toEqual({
      start: { x: 0, y: 0 },
      end: { x: 0, y: 0 },
    });
  });
});
