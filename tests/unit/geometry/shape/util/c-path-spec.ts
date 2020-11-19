import { getCPath } from '../../../../../src/geometry/shape/edge/util';

describe('getCPath', () => {
  test('getCPath', () => {
    expect(getCPath({ x: 10, y: 10 }, { x: 100, y: 100 })).toEqual(['C', 55, 10 ,55, 100, 100, 100]);
    expect(getCPath({ x: 10, y: 100 }, { x: 100, y: 10 })).toEqual(['C', 55, 100 ,55, 10, 100, 10]);
    expect(getCPath({ x: 100, y: 100 }, { x: 10, y: 10 })).toEqual(['C', 55, 100 ,55, 10, 10, 10]);
    expect(getCPath({ x: 100, y: 10 }, { x: 10, y: 100 })).toEqual(['C', 55, 10 ,55, 100, 10, 100]);
  });
});
