import { dot, weightedSum } from './blas1';

/// searches along line 'pk' for a point that satifies the wolfe conditions
/// See 'Numerical Optimization' by Nocedal and Wright p59-60
/// f : objective function
/// pk : search direction
/// current: object containing current gradient/loss
/// next: output: contains next gradient/loss
/// returns a: step size taken
export function wolfeLineSearch(f, pk, current, next, a, c1?: any, c2?: any) {
  const phi0 = current.fx;
  const phiPrime0 = dot(current.fxprime, pk);
  let phi = phi0;
  let phi_old = phi0;
  let phiPrime = phiPrime0;
  let a0 = 0;

  a = a || 1;
  c1 = c1 || 1e-6;
  c2 = c2 || 0.1;

  function zoom(a_lo, a_high, phi_lo) {
    for (let iteration = 0; iteration < 16; ++iteration) {
      a = (a_lo + a_high) / 2;
      weightedSum(next.x, 1.0, current.x, a, pk);
      phi = next.fx = f(next.x, next.fxprime);
      phiPrime = dot(next.fxprime, pk);

      if (phi > phi0 + c1 * a * phiPrime0 || phi >= phi_lo) {
        a_high = a;
      } else {
        if (Math.abs(phiPrime) <= -c2 * phiPrime0) {
          return a;
        }

        if (phiPrime * (a_high - a_lo) >= 0) {
          a_high = a_lo;
        }

        a_lo = a;
        phi_lo = phi;
      }
    }

    return 0;
  }

  for (let iteration = 0; iteration < 10; ++iteration) {
    weightedSum(next.x, 1.0, current.x, a, pk);
    phi = next.fx = f(next.x, next.fxprime);
    phiPrime = dot(next.fxprime, pk);
    if (phi > phi0 + c1 * a * phiPrime0 || (iteration && phi >= phi_old)) {
      return zoom(a0, a, phi_old);
    }

    if (Math.abs(phiPrime) <= -c2 * phiPrime0) {
      return a;
    }

    if (phiPrime >= 0) {
      return zoom(a, a0, phi);
    }

    phi_old = phi;
    a0 = a;
    a *= 2;
  }

  return a;
}
