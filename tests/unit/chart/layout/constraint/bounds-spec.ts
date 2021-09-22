import { Bounds, Variable } from '../../../../../src/chart/layout/constraint';

describe('constraint', () => {
  it('Bounds', () => {
    const bounds = new Bounds('x');

    expect(bounds.x).toBeInstanceOf(Variable);
    expect(bounds.y).toBeInstanceOf(Variable);
    expect(bounds.width).toBeInstanceOf(Variable);
    expect(bounds.height).toBeInstanceOf(Variable);

    expect(Variable.isVariable(bounds)).toBe(false);
    expect(Variable.isVariable(bounds.x)).toBe(true);
  });
});
