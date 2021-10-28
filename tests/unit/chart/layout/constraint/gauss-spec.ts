import { gauss } from '../../../../../src/chart/layout/constraint/gauss';

describe('constraint', () => {
  it('gauss', () => {
    let a = [
      [1, 1, 1, 6],
      [2, 1, 2, 10],
      [1, 2, 3, 14],
    ];
    expect(gauss(a)).toEqual([1, 2, 3]);

    a = [
      [2, 1, -1, 8],
      [-3, -1, 2, -11],
      [-2, 1, 2, -3],
    ]; // output: [2, 3, -1]

    expect(gauss(a)).toEqual([2, 3.0000000000000004, -0.9999999999999999]);

    a = [
      [47, 28, 19],
      [89, 53, 36],
    ]; // output: [ 1, -1 ]

    expect(gauss(a)).toEqual([0.9999999999998117, -0.9999999999996838]);

    a = [
      [0, 1, 0, 1],
      [1, 0, 0, 0],
      [0, 0, 1, 1],
    ]; // output: [ 1, -1 ]

    expect(gauss(a)).toEqual([0, 1, 1]);
  });
});
