import { getShapeType } from '../../../../src/geometry/util/get-shape-type';

describe('getShapeType', () => {
  it('getShapeType', () => {
    expect(getShapeType({}, 'circle')).toBe('circle');
    expect(getShapeType({ shape: 'point' }, 'circle')).toBe('point');
    expect(getShapeType({ shape: ['point', '33'] }, 'circle')).toBe('point');
  });
});
