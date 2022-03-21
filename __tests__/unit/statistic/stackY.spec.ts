import { StackY } from '../../../src/statistic';

describe('StackY', () => {
  it('StackY() returns a function transform value with defined x and y', () => {
    const statistic = StackY();

    const v1 = {
      index: [0, 1, 2],
      value: { color: ['red', 'yellow', 'green'] },
    };
    expect(statistic(v1)).toEqual(v1);

    const v2 = {
      index: [0, 1, 2],
      value: { color: ['red', 'yellow', 'green'], x: [[1], [1], [1]] },
    };
    expect(statistic(v2)).toEqual(v2);

    const v3 = {
      index: [0, 1, 2],
      value: { color: ['red', 'yellow', 'green'], y: [[1], [1], [1]] },
    };
    expect(statistic(v3)).toEqual(v3);
  });

  it('StackY() returns a function stack y of value with defined x and y', () => {
    const statistic = StackY();
    const value = {
      index: [0, 1, 2],
      value: {
        x: [[0], [0], [0]],
        y: [
          [1, 0],
          [2, 0],
          [3, 0],
        ],
      },
    };

    expect(statistic(value)).toEqual({
      index: [0, 1, 2],
      value: {
        x: [[0], [0], [0]],
        y: [
          [1, 0],
          [3, 1],
          [6, 3],
        ],
      },
    });
  });

  it('StackY() returns a function can handle value with defined series', () => {
    const statistic = StackY();
    const value = {
      index: [0, 1, 2, 3, 4, 5],
      value: {
        x: [[0], [0], [0], [0], [0], [0]],
        series: ['a', 'b', 'b', 'b', 'a', 'a'],
        y: [
          [1, 0],
          [2, 0],
          [3, 0],
          [1, 0],
          [2, 0],
          [3, 0],
        ],
      },
    };

    expect(statistic(value)).toEqual({
      index: [0, 1, 2, 3, 4, 5],
      value: {
        x: [[0], [0], [0], [0], [0], [0]],
        series: ['a', 'b', 'b', 'b', 'a', 'a'],
        y: [
          [1, 0],
          [2, 0],
          [5, 2],
          [6, 5],
          [3, 1],
          [6, 3],
        ],
      },
    });
  });
});
