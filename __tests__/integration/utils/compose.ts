type Func<R> = (x: R, ...args: any[]) => R;

function identity(x) {
  return x;
}

/**
 * Composes functions from left to right.
 */
export function compose<R>(fns: Func<R>[]): Func<R> {
  return fns.reduce(
    (composed, fn) =>
      (x, ...args) =>
        fn(composed(x, ...args), ...args),
    identity,
  );
}
