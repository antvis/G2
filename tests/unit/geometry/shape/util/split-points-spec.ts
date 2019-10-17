import { splitPoints } from '../../../../../src/geometry/shape/util/split-points';

describe('splitPoints', () => {
  it('splitPoints()', () => {
    expect(splitPoints({ x: 1, y: 1 })).toEqual([{ x: 1, y: 1 }]);
    expect(splitPoints({ x: [1, 2], y: [1, 2] })).toEqual([{ x: 1, y: 1 }, { x: 2, y: 2 }]);
  });
});
