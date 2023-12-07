import { stdlib, corelib, plotlib, geolib, graphlib } from '../../../src';

describe('libs', () => {
  it('should export expected lib.', () => {
    expect(stdlib).toBeDefined();
    expect(corelib).toBeDefined();
    expect(plotlib).toBeDefined();
    expect(geolib).toBeDefined();
    expect(graphlib).toBeDefined();
  });
});
