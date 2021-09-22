import { Constraint, Variable, Operator } from '../../../../../src/chart/layout/constraint';

describe('constraint', () => {
  it('Constraint', () => {
    const x1 = new Variable('x1');
    const x2 = new Variable('x2');
    const c = new Constraint(Operator.EQ, [2, x1], x2, -100);

    expect(c.getVariables()).toEqual([x1, x2]);
  });

  it.only('invalid Constraint', () => {
    const x1 = new Variable('x1');
    const x2 = new Variable('x2');
    const c = new Constraint(Operator.EQ, [2, x1], x2, 'invalid', -100);

    const vm = new Map();
    vm.set(x1, 0);
    vm.set(x2, 1);

    expect(c.getVariables()).toEqual([x1, x2]);

    expect(c.getGaussArr(vm)).toEqual([2, 1, -100]);
  });

  it('getGaussArr', () => {
    const x1 = new Variable('x1');
    const x2 = new Variable('x2');
    const x3 = new Variable('x3');
    const c = new Constraint(Operator.EQ, [2, x1], x2, [1, x2], [2, x2, 3], -100);

    const vm = new Map();
    vm.set(x1, 0);
    vm.set(x2, 1);
    vm.set(x3, 2);

    expect(c.getGaussArr(vm)).toEqual([2, 8, 0, -100]);
  });
});
