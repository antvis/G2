import { Solver, Constraint, Operator, Bounds, Variable } from '../../../../../src/chart/layout/constraint';

describe('constraint', () => {
  it('Solver', () => {
    const s = new Solver();

    const x1 = new Variable('x1');
    const x2 = new Variable('x2');

    const c1 = new Constraint(Operator.EQ, [2, x1], x2, 100);
    const c2 = new Constraint(Operator.EQ, x1, x2, 75);

    s.addConstraint(c1, c2);

    s.calc();

    expect(s.constraints).toEqual([c1, c2]);
    expect(s.variables).toEqual([x1, x2]);

    expect(x1.value).toEqual(25);
    expect(x2.value).toEqual(50);
  });

  it('solver case', () => {
    const width = 400;
    const height = 300;

    const x = new Bounds('x');
    const y = new Bounds('y');
    const legend = new Bounds('legend');
    const geometry = new Bounds('geometry');

    const s = new Solver();

    s.addConstraint(
      // x
      new Constraint(Operator.EQ, x.x, x.width, width),
      new Constraint(Operator.EQ, x.x, [-1, y.width], 0),
      new Constraint(Operator.EQ, x.height, height * 0.1),
      new Constraint(Operator.EQ, x.y, x.height, height),
      // y
      new Constraint(Operator.EQ, y.x, 0),
      new Constraint(Operator.EQ, y.width, width * 0.1),
      new Constraint(Operator.EQ, y.y, y.height, x.height, height),
      // legend
      new Constraint(Operator.EQ, legend.x, 0),
      new Constraint(Operator.EQ, legend.y, 0),
      new Constraint(Operator.EQ, legend.width, width),
      new Constraint(Operator.EQ, legend.height, height * 0.1),
      // geometry
      new Constraint(Operator.EQ, geometry.x, geometry.width, width),
      // other
      new Constraint(Operator.EQ, y.width, geometry.width, width),
      new Constraint(Operator.EQ, legend.height, geometry.height, x.height, height),
      new Constraint(Operator.EQ, x.x, [-1, geometry.x], 0),
      new Constraint(Operator.EQ, x.width, [-1, geometry.width], 0),
      new Constraint(Operator.EQ, y.y, [-1, geometry.y], 0),
      new Constraint(Operator.EQ, y.height, [-1, geometry.height], 0)
    );

    console.time('solver');
    s.calc();
    console.timeEnd('solver');

    expect(x.bbox).toEqual({
      x: 40,
      y: 270,
      width: 360,
      height: 30,
    });

    expect(y.bbox).toEqual({
      x: 0,
      y: 30,
      width: 40,
      height: 240,
    });

    expect(legend.bbox).toEqual({
      x: 0,
      y: 0,
      width: 400,
      height: 30,
    });

    expect(geometry.bbox).toEqual({
      x: 40,
      y: 30,
      width: 360,
      height: 240,
    });
  });
});
