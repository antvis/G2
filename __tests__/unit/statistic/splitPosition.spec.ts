import { SplitPosition } from '../../../src/statistic';

describe('SplitPosition', () => {
  it('SplitPosition returns a function do nothing without position', () => {
    const statistic = SplitPosition();
    const v = {
      index: [0, 1, 2],
      value: {
        color: ['a', 'b', 'c'],
      },
    };
    expect(statistic(v)).toEqual(v);
  });

  it('SplitPosition returns a function split position channel into multiple position channels', () => {
    const statistic = SplitPosition();
    const v = {
      index: [0, 1, 2],
      value: {
        position: [
          [1, 2, 3],
          [4, 5, 6],
          [7, 8, 9],
        ],
      },
    };
    expect(statistic(v)).toEqual({
      index: [0, 1, 2],
      value: {
        position: [
          [1, 2, 3],
          [4, 5, 6],
          [7, 8, 9],
        ],
        'position[0]': [1, 2, 3],
        'position[1]': [4, 5, 6],
        'position[2]': [7, 8, 9],
      },
    });
  });
});
