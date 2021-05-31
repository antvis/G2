import { Position } from '../../../../src/visual/attribute';
import { ScaleDef } from '../../../../src/visual/scale';

describe('attribute position', () => {
  const scaleCat = new ScaleDef({
    type: 'ordinal',
    domain: ['Jim', 'Tom', 'Tony', 'Frank'],
    range: [1, 2, 3, 4],
  });

  const scaleLinear = new ScaleDef({
    range: [0, 1],
    type: 'linear',
    domain: [0, 10],
  });

  const posAttr = new Position({
    scales: [scaleCat, scaleLinear],
    fields: ['x', 'y'],
  });

  test('test default options', () => {
    expect(posAttr.fields).toStrictEqual(['x', 'y']);
    expect(posAttr.type).toStrictEqual('position');
  });

  test('map for (x, y)', () => {
    expect(posAttr.mapping('Jim', 3)).toStrictEqual([1, 0.3]);
    expect(posAttr.mapping('Tom', 6)).toStrictEqual([2, 0.6]);
    expect(posAttr.mapping('Tony', 8)).toStrictEqual([3, 0.8]);
    expect(posAttr.mapping('Frank', 10)).toStrictEqual([4, 1.0]);
  });

  test('map for (x, [y1, y2])', () => {
    expect(posAttr.mapping('Jim', [4, 7])).toStrictEqual([1, [0.4, 0.7]]);
  });

  test('map for ([x1, x2], y)', () => {
    expect(posAttr.mapping(['Jim', 'Tony'], 10)).toStrictEqual([[1, 3], 1]);
  });

  test('map for ([x1, x2], [y1, y2])', () => {
    const res = posAttr.mapping(['Jim', 'Tom', 'Tony'], [4, 6, 10]);
    expect(res).toStrictEqual([
      [1, 2, 3],
      [0.4, 0.6, 1],
    ]);
  });

  test('the args is small than 2', () => {
    expect(posAttr.mapping(undefined, undefined)).toStrictEqual([]);
    expect(posAttr.mapping(undefined)).toStrictEqual([]);
    expect(posAttr.mapping()).toStrictEqual([]);
  });

  test('invalid data', () => {
    expect(posAttr.mapping(null, null)).toStrictEqual([]);
    expect(posAttr.mapping(undefined, undefined)).toStrictEqual([]);
    expect(posAttr.mapping(NaN, NaN)).toStrictEqual([]);
  });
});
