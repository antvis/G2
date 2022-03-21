import { MaybeZeroY2, MaybeZeroX1, MaybeTuple } from '../../../src/infer';

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
});
