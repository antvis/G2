import { getGeometryLabels, registerGeometryLabels } from '../../../../src/geometry/label';
import GeometryLabels from '../../../../src/geometry/label/base';

describe('Geometry label', () => {
  it('getGeometryLabels', () => {
    expect(getGeometryLabels('default')).toBeUndefined();
  });

  it('registerGeometryLabels', () => {
    class CustomeLabels extends GeometryLabels {}

    registerGeometryLabels('custom', CustomeLabels);
    expect(getGeometryLabels('custom')).toBeDefined();
  });
});
