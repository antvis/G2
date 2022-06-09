import { polygon } from '../../../src/shape/utils';

describe('utils', () => {
  it('polygon() returns polygon path string', () => {
    expect(
      polygon([
        [100, 100],
        [200, 100],
        [200, 200],
        [100, 200],
      ]),
    ).toBe('M100,100L200,100L200,200L100,200Z');
  });
});
