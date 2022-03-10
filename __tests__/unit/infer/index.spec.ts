import {
  MaybeZeroY2,
  MaybeZeroX1,
  MaybeTuple,
  MaybeStackY,
  MayBeType,
} from '../../../src/infer';

describe('infer', () => {
  it('MaybeZeroY2() returns a function inferring zero y2', () => {
    const infer = MaybeZeroY2();

    const e1 = { y: 'name' };
    expect(infer(e1)).toEqual({
      y: ['name', { type: 'constant', value: 0 }],
    });

    const e2 = { y: ['name'] };
    expect(infer(e2)).toEqual({
      y: ['name', { type: 'constant', value: 0 }],
    });

    const e3 = { y: ['name', 'age'] };
    expect(infer(e3)).toEqual(e3);

    const e4 = {};
    expect(infer(e4)).toEqual(e4);
  });

  it('MaybeZeroX1() returns a function inferring zero x1', () => {
    const infer = MaybeZeroX1();

    const e1 = {};
    expect(infer(e1)).toEqual({
      x: [{ type: 'constant', value: 0 }],
    });

    const e2 = { x: 'name', y: 'age' };
    expect(infer(e2)).toEqual({
      x: 'name',
      y: 'age',
    });
  });

  it('MaybeTuple() returns a function converting x and y to tuple', () => {
    const infer = MaybeTuple();

    const e1 = {};
    expect(infer(e1)).toEqual(e1);

    const e2 = { x: 0 };
    expect(infer(e2)).toEqual({ x: [0] });

    const e3 = { x: [0] };
    expect(infer(e3)).toEqual(e3);

    const e4 = { y: 0 };
    expect(infer(e4)).toEqual({ y: [0] });

    const e5 = { y: [0] };
    expect(infer(e5)).toEqual(e5);

    const e6 = { x: 0, y: 0 };
    expect(infer(e6)).toEqual({ x: [0], y: [0] });
  });

  it('MaybeStackY() returns a function inferring stackY statistic', () => {
    const infer = MaybeStackY();

    const e1 = {};
    expect(infer(e1)).toEqual(e1);

    const e2 = { color: [1, 2] };
    expect(infer(e2)).toEqual(e2);

    const e3 = { color: new Date(2000, 0, 1) };
    expect(infer(e3)).toEqual(e3);

    const e4 = { color: { type: 'field' } };
    expect(infer(e4)).toEqual({
      color: { type: 'field' },
      $statistic: [{ type: 'stackY' }],
    });
  });

  it('MaybeType() returns a function inferring types of encoding', () => {
    const infer = MayBeType({
      data: [{ a: 1, red: 2 }],
    });

    const e1 = { x: 'a' };
    expect(infer(e1)).toEqual({ x: { type: 'field', value: 'a' } });

    const e2 = { x: 1 };
    expect(infer(e2)).toEqual({ x: { type: 'constant', value: 1 } });

    const e3 = { x: (d) => d.name };
    expect(infer(e3)).toEqual({
      x: { type: 'transform', value: e3.x },
    });

    const e4 = { x: 'red' };
    expect(infer(e4)).toEqual({ x: { type: 'field', value: 'red' } });

    const e5 = { x: 'blue' };
    expect(infer(e5)).toEqual({ x: { type: 'constant', value: 'blue' } });

    const e6 = { x: { type: 'constant', value: 'red' } };
    expect(infer(e6)).toEqual({ x: { type: 'constant', value: 'red' } });

    const e7 = {
      x: ['a', 1, (d) => d.name, { type: 'constant', value: 'red' }],
    };
    expect(infer(e7)).toEqual({
      x: [
        { type: 'field', value: 'a' },
        { type: 'constant', value: 1 },
        { type: 'transform', value: e7.x[2] },
        { type: 'constant', value: 'red' },
      ],
    });
  });
});
