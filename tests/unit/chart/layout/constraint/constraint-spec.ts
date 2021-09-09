import { Constraint, Variable, Operator } from '../../../../../src/chart/layout/constraint';

describe('constraint', () => {
  it('Constraint', () => {
    const x1 = new Variable('x1');
    const x2 = new Variable('x2');
    const c = new Constraint(Operator.EQ, [2, x1], x2, -100);

    expect(c.getVariables()).toEqual([x1, x2]);
    expect(c.toString()).toBe('2*x1 + x2 + -100 = 0');
  });
});
