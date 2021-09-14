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

  it.skip('solver case', () => {
    const width = 400;
    const height = 300;

    const x = new Bounds('x');
    const y = new Bounds('y');
    const legend = new Bounds('legend');
    const geometry = new Bounds('geometry');

    const s = new Solver();

    // relations
    const relations = [
      new Constraint(Operator.EQ, y.width, x.width, -width), // x
      new Constraint(Operator.EQ, legend.height, geometry.height, x.height), // y
      new Constraint(Operator.EQ, x.x, [-1, geometry.x]),
      new Constraint(Operator.EQ, x.width, [-1, geometry.width]),
      new Constraint(Operator.EQ, x.y, [-1, geometry.x], [-1, geometry.height]),
      new Constraint(Operator.EQ, y.y, [-1, geometry.y]),
      new Constraint(Operator.EQ, y.height, [-1, geometry.height]),
      new Constraint(Operator.EQ, y.width, x.width, -width),
      new Constraint(Operator.EQ, geometry.x, geometry.width, -width),
    ];

    // constant
    const constants = [
      new Constraint(Operator.EQ, x.height, -height * 0.1),
      new Constraint(Operator.EQ, y.x),
      new Constraint(Operator.EQ, y.width, -width * 0.1),
      new Constraint(Operator.EQ, legend.x),
      new Constraint(Operator.EQ, legend.y),
      new Constraint(Operator.EQ, legend.height, -height * 0.1),
      new Constraint(Operator.EQ, legend.width, -width),
    ];

    s.addConstraint(...relations, ...constants);

    expect(s.getVariables().length).toBe(16);

    console.time('solver');
    s.calc();
    console.timeEnd('solver');


    // @ts-ignore
    window.s = s;


    expect(x.bbox).toEqual([]);

  });
});
