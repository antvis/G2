import { deepAssign } from '../../../src/utils/helper';

describe('deepAssign', () => {
  it('deepAssign(dist, src) should mutate dist obj.', () => {
    const dist = { a: 1 };
    deepAssign(dist, { a: 2 });
    expect(dist.a).toBe(2);
  });

  it('deepAssign(dist, src) should return dist obj.', () => {
    const dist = { a: 1 };
    expect(deepAssign(dist, { a: 2 })).toBe(dist);
  });

  it('deepAssign(dist, src) should override primitive key.', () => {
    expect(
      deepAssign(
        { a: 1, b: 'a', c: false, d: 3, e: 5 },
        { a: 2, b: 'b', c: true, d: undefined, e: null },
      ),
    ).toEqual({
      a: 2,
      b: 'b',
      c: true,
      d: undefined,
      e: null,
    });
  });

  it('deepAssign(dist, src) should override array key.', () => {
    expect(deepAssign({ a: '1' }, { a: [1, 2, 3] })).toEqual({ a: [1, 2, 3] });
  });

  it('deepAssign(dist, src) should override built-in object.', () => {
    const a = deepAssign(
      {
        a: new Map([
          [1, 1],
          [2, 2],
        ]),
      },
      {
        a: new Map([
          [1, 'a'],
          [2, 'b'],
        ]),
      },
    ).a as Map<number, any>;
    expect(a.get(1)).toBe('a');
  });

  it('deepAssign(dist, src) should override non-plain-object dist key.', () => {
    expect(deepAssign({ a: 1 }, { a: { b: 2 } })).toEqual({ a: { b: 2 } });
  });

  it('deepAssign(dist, src) should assign plain object recursively.', () => {
    const dist = { a: { b: { c: { d: 5 } } } };
    const src = { a: { b: { c: { d: 6 } } } };
    deepAssign(dist, src);
    expect(dist.a.b.c.d).toBe(6);
  });

  it('deepAssign(dist, src) should has default max level.', () => {
    const dist = { a: { b: { c: { d: { e: { f: 5 }, g: 5 } } } } };
    const src = { a: { b: { c: { d: { e: { f: 6 }, g: 6 } } } } };
    deepAssign(dist, src);
    expect(dist.a.b.c.d.e.f).toBe(5);
    expect(dist.a.b.c.d.g).toBe(6);
  });

  it('deepAssign(dist, src, maxLevel, level) should specify maxLevel.', () => {
    const dist = { a: { b: { c: 1 }, e: 1 } };
    const src = { a: { b: { c: 2 }, e: 2 } };
    deepAssign(dist, src, 2);
    expect(dist.a.b.c).toBe(1);
    expect(dist.a.e).toBe(2);
  });
});
