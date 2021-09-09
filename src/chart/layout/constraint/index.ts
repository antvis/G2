/*

> 先做一个针对 G2 场景的极简版本，只有 EQ，而没有不等式的！

```ts
import { Solver, Constraint, Bounds, Operator } from './constraint';

const solver = new Solver();

const b1 = new Bounds();
const b2 = new Bounds();

// -1 * b1.x + b2.width - 200 = 0
const c1 = new Constraint(Operator.EQ, [-1， b1.x], b2.width, -200);
// -1 * b1.x + b1.width - 400 < 0
const c2 = new Constraint(Operator.LT, [-1， b1.x], b1.width, -400);

solver.addConstraint(c1, c2);

// get the b1 b2's layout information
const layout = solver.calc();
```

 */

export { Solver } from './solver';
export { Bounds } from './bounds';
export { Variable } from './variable';
export { Constraint } from './constraint';
export { Operator } from './types';
