import { getSectorPath } from '../../../src/util/graphics';

describe('graphics', () => {
  it('getSectorPath', () => {
    const path = getSectorPath(200, 140, 104.99999475, 1.3180245040922702, 2.834655440308032, 0);
    expect(path.length).toBe(5);
  });
});
