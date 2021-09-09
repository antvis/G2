import { Solver, Constraint, Operator, Bounds, Variable } from '../../../../../src/chart/layout/constraint';

describe('constraint', () => {
  it('Solver', () => {
    const s = new Solver();

    const x1 = new Variable('x1');
    const x2 = new Variable('x2');
    const c = new Constraint(Operator.EQ, [2, x1], x2, -100);

    s.addConstraint(c);
    expect(s.constraints).toEqual([c]);
    
    s.calc();
    expect(s.variables).toEqual([x1, x2]);
  });
});
