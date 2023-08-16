import { geolib } from '../../../src/lib';
import { GeoView, GeoPath } from '../../../src/composition';

describe('geolib', () => {
  it('geolib() should returns expected geo components.', () => {
    expect(geolib()).toEqual({
      'composition.geoView': GeoView,
      'composition.geoPath': GeoPath,
    });
  });
});
