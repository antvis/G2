import { getGeometryLabel, registerGeometryLabel } from '../../../../src/geometry/label';
import GeometryLabels from '../../../../src/geometry/label/base';

describe('Geometry label', () => {
  it('getGeometryLabel', () => {
    expect(getGeometryLabel('default')).toBeUndefined();
  });

  it('registerGeometryLabel', () => {
    class CustomeLabels extends GeometryLabels {}

    registerGeometryLabel('custom', CustomeLabels);
    expect(getGeometryLabel('custom')).toBeDefined();
  });
});
