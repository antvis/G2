import { Category, Linear } from '../../../../src/visual/scale';
import { Attribute as Attr } from '../../../../src/visual/attribute';

describe('attr base test', () => {
  const scale1 = new Linear({
    field: 'dim1',
    min: 0,
    max: 100,
  });
  const scale2 = new Category({
    field: 'dim2',
    values: ['a', 'b', 'c', 'd'],
  });
  it('test init', () => {
    const attr = new Attr({
      fields: ['t1', 't2'],
      scales: [scale1, scale2],
    });
    expect(attr.type).toBe('base');
    expect(attr.fields).toEqual(['t1', 't2']);
  });
  it('test callback', () => {
    const attr = new Attr({
      fields: ['t1', 't2'],
      callback(v1, v2) {
        return v1 + v2;
      },
      scales: [scale1, scale2],
    });

    const rst = attr.mapping(10, 'a');
    expect(rst[0]).toBe('10a');
  });

  it('test 0 as function callback', () => {
    const attr = new Attr({
      fields: ['t1', 't2'],
      callback: (v1, v2) => {
        return v2 === 'a' ? [0] : [1];
      },
      scales: [scale1, scale2],
    });

    expect(attr.mapping(10, 'a')[0]).toEqual([0]);
    expect(attr.mapping(10, 'b')[0]).toEqual([1]);
    expect(attr.mapping(10, 'c')[0]).toEqual([1]);
    expect(attr.mapping(10, 'd')[0]).toEqual([1]);
  });

  it('test linear scale with two value', () => {
    const attr = new Attr({
      fields: ['t1', 't2'],
      value: [0, 10],
      scales: [scale1, scale2],
    });
    const rst = attr.mapping(10, 'a');
    expect(rst[0]).toBe(1);
  });

  it('test linear scale with three value', () => {
    const attr = new Attr({
      fields: ['t1', 't2'],
      value: [0, 10, 40],
      scales: [scale1, scale2],
    });
    let rst = attr.mapping(40);
    expect(rst[0]).toBe(8);
    rst = attr.mapping(60);
    expect(Math.round(rst[0])).toBe(16);
  });

  it('test cat scale with values', () => {
    const attr = new Attr({
      fields: ['t1', 't2'],
      value: ['red', 'blue'],
      scales: [scale2, scale1],
    });
    let rst = attr.mapping('a');
    expect(rst[0]).toBe('red');
    rst = attr.mapping('b');
    expect(rst[0]).toBe('blue');
  });
});
