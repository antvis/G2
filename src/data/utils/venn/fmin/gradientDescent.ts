import { dot, norm2, scale, weightedSum, zeros } from './blas1';
import { wolfeLineSearch } from './linesearch';

export function gradientDescent(f, initial, params) {
  params = params || {};
  const maxIterations = params.maxIterations || initial.length * 100;
  const learnRate = params.learnRate || 0.001;
  const current = { x: initial.slice(), fx: 0, fxprime: initial.slice() };

  for (let i = 0; i < maxIterations; ++i) {
    current.fx = f(current.x, current.fxprime);
    if (params.history) {
      params.history.push({
        x: current.x.slice(),
        fx: current.fx,
        fxprime: current.fxprime.slice(),
      });
    }

    weightedSum(current.x, 1, current.x, -learnRate, current.fxprime);
    if (norm2(current.fxprime) <= 1e-5) {
      break;
    }
  }

  return current;
}

export function gradientDescentLineSearch(f, initial, params) {
  params = params || {};
  let current = { x: initial.slice(), fx: 0, fxprime: initial.slice() };
  let next = { x: initial.slice(), fx: 0, fxprime: initial.slice() };
  const maxIterations = params.maxIterations || initial.length * 100;
  let learnRate = params.learnRate || 1;
  const pk = initial.slice();
  const c1 = params.c1 || 1e-3;
  const c2 = params.c2 || 0.1;
  let temp;
  let functionCalls = [];

  if (params.history) {
    // wrap the function call to track linesearch samples
    const inner = f;
    f = (x, fxprime) => {
      functionCalls.push(x.slice());
      return inner(x, fxprime);
    };
  }

  current.fx = f(current.x, current.fxprime);
  for (let i = 0; i < maxIterations; ++i) {
    scale(pk, current.fxprime, -1);
    learnRate = wolfeLineSearch(f, pk, current, next, learnRate, c1, c2);

    if (params.history) {
      params.history.push({
        x: current.x.slice(),
        fx: current.fx,
        fxprime: current.fxprime.slice(),
        functionCalls: functionCalls,
        learnRate: learnRate,
        alpha: learnRate,
      });
      functionCalls = [];
    }

    temp = current;
    current = next;
    next = temp;

    if (learnRate === 0 || norm2(current.fxprime) < 1e-5) break;
  }

  return current;
}
