import {
  conjugateGradient,
  conjugateGradientSolve,
  gradientDescent,
  gradientDescentLineSearch,
  nelderMead,
} from '../../../../../src/data/utils/venn/fmin';

const SMALL = 1e-5;

function nearlyEqual(
  left,
  right,
  tolerance = SMALL,
  message = 'assertNearlyEqual',
) {
  expect(Math.abs(left - right)).toBeLessThan(tolerance);
  console.log(`${message}: ${left} ~== ${right}`);
}

function lessThan(test, left, right, message) {
  message = message || 'lessThan';
  test.ok(left < right, `${message}: ${left} < ${right}`);
}

const optimizers = [
  nelderMead,
  gradientDescent,
  gradientDescentLineSearch,
  conjugateGradient,
];

const optimizerNames = [
  'Nelder Mead',
  'Gradient Descent',
  'Gradient Descent w/ Line Search',
  'Conjugate Gradient',
];

describe('fmin', () => {
  test('himmelblau', () => {
    // due to a bug, this used to not converge to the minimum
    const x = 4.9515014216303825;
    const y = 0.07301421370357275;

    const params = { learnRate: 0.1 };

    const himmelblau = (X, fxprime = [0, 0]) => {
      const [x, y] = X;
      fxprime[0] = 2 * (x + 2 * y - 7) + 4 * (2 * x + y - 5);
      fxprime[1] = 4 * (x + 2 * y - 7) + 2 * (2 * x + y - 5);
      // biome-ignore lint/style/useExponentiationOperator: TODO: use **
      return Math.pow(x + 2 * y - 7, 2) + Math.pow(2 * x + y - 5, 2);
    };

    optimizers.forEach((optimizer, index) => {
      const solution = optimizer(himmelblau, [x, y], params);
      nearlyEqual(solution.fx, 0, SMALL, `himmelblau:${optimizerNames[index]}`);
    });
  });

  test('banana', () => {
    const x = 1.6084564160555601;
    const y = -1.5980748860165477;

    const banana = (X, fxprime) => {
      fxprime = fxprime || [0, 0];
      const x = X[0];
      const y = X[1];
      fxprime[0] = 400 * x * x * x - 400 * y * x + 2 * x - 2;
      fxprime[1] = 200 * y - 200 * x * x;
      return (1 - x) * (1 - x) + 100 * (y - x * x) * (y - x * x);
    };

    const params = { learnRate: 0.0003, maxIterations: 50000 };
    for (let i = 0; i < optimizers.length; ++i) {
      const solution = optimizers[i](banana, [x, y], params);
      nearlyEqual(solution.fx, 0, 1e-3, `banana:${optimizerNames[i]}`);
    }
  });

  test('quadratic1D', () => {
    const loss = (x, xprime) => {
      xprime = xprime || [0, 0];
      xprime[0] = 2 * (x[0] - 10);
      return (x[0] - 10) * (x[0] - 10);
    };

    const params = { learnRate: 0.5 };

    for (let i = 0; i < optimizers.length; ++i) {
      const solution = optimizers[i](loss, [0], params);
      nearlyEqual(solution.fx, 0, SMALL, `quadratic_1d:${optimizerNames[i]}`);
    }
  });

  test('nelderMead', () => {
    const loss = (X) => {
      const x = X[0];
      const y = X[1];
      return Math.sin(y) * x + Math.sin(x) * y + x * x + y * y;
    };

    const solution = nelderMead(loss, [-3.5, 3.5]);
    nearlyEqual(solution.fx, 0, SMALL, 'nelderMead');
  });

  test('conjugateGradientSolve', () => {
    // matyas function
    let A = [
      [0.52, -0.48],
      [-0.48, 0.52],
    ];
    let b = [0, 0];
    const initial = [-9.08, -7.83];
    let x = conjugateGradientSolve(A, b, initial);
    nearlyEqual(x[0], 0, SMALL, 'matyas.x');
    nearlyEqual(x[1], 0, SMALL, 'matyas.y');

    // booth's function
    const history = [];
    A = [
      [10, 8],
      [8, 10],
    ];
    b = [34, 38];
    x = conjugateGradientSolve(A, b, initial, history);
    nearlyEqual(x[0], 1, SMALL, 'booth.x');
    nearlyEqual(x[1], 3, SMALL, 'booth.y');
    console.log(history);
  });
});
