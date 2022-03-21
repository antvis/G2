import { DodgeX } from '../../../src/statistic';

describe('DodgeX', () => {
  it('DodgeX returns a function produce series channel for value', () => {
    const statistic = DodgeX();

    const v1 = {
      index: [0, 1, 2],
      value: {
        series: ['a', 'b', 'c'],
      },
    };
    expect(statistic(v1)).toEqual(v1);

    const v2 = {
      index: [0, 1, 2],
      value: {
        color: ['a', 'b', 'c'],
      },
    };
    expect(statistic(v2)).toEqual({
      index: [0, 1, 2],
      value: {
        color: ['a', 'b', 'c'],
        series: ['a', 'b', 'c'],
      },
    });

    const v3 = {
      index: [0, 1, 2],
      value: {
        text: ['a', 'b', 'c'],
      },
    };
    expect(statistic(v3)).toEqual(v3);

    const v4 = {
      index: [0, 1, 2, 3, 4],
      value: {
        x: [[0], [0], [0], [1], [1]],
      },
    };
    expect(statistic(v4)).toEqual({
      index: [0, 1, 2, 3, 4],
      value: {
        x: [[0], [0], [0], [1], [1]],
        series: [0, 1, 2, 0, 1],
      },
    });
  });
});
