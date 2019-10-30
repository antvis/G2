import { DIRECTION } from '../../../src';
import { getAxisFactor, getAxisRelativeRegion } from '../../../src/util/axis';

describe('util axis', () => {
  it('getAxisFactor', () => {
    expect(getAxisFactor(DIRECTION.LEFT)).toBe(1);
    expect(getAxisFactor(DIRECTION.BOTTOM)).toBe(-1);
    expect(getAxisFactor(DIRECTION.RIGHT)).toBe(-1);
    expect(getAxisFactor(DIRECTION.TOP)).toBe(1);
  });

  it('getAxisRelativeRegion', () => {
    expect(getAxisRelativeRegion(DIRECTION.LEFT)).toEqual({
      start: { x: 0, y: 0 },
      end: { x: 0, y: 1 },
    });
    expect(getAxisRelativeRegion(DIRECTION.BOTTOM)).toEqual({
      start: { x: 0, y: 0 },
      end: { x: 1, y: 0 },
    });
    expect(getAxisRelativeRegion(DIRECTION.RIGHT)).toEqual({
      start: { x: 1, y: 0 },
      end: { x: 1, y: 1 },
    });
    expect(getAxisRelativeRegion(DIRECTION.TOP)).toEqual({
      start: { x: 0, y: 1 },
      end: { x: 1, y: 1 },
    });
    // @ts-ignore
    expect(getAxisRelativeRegion('xxx')).toEqual({
      start: { x: 0, y: 0 },
      end: { x: 0, y: 0 },
    });
  });
});
