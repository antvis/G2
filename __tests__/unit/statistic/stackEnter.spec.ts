import { StackEnter } from '../../../src/statistic';

describe('', () => {
  test('StackEnter({...}) should skip value with empty enterDuration', () => {
    const statistic = StackEnter({});
    const v = { index: [], value: {} };
    expect(statistic(v)).toEqual(v);
  });

  test('StackEnter({...}) should skip value with empty by', () => {
    const statistic = StackEnter({});
    const v = { index: [0, 1, 2], value: { enterDuration: [1, 1, 1] } };
    expect(statistic(v)).toEqual(v);
  });

  test('StackEnter({...}) should stack enter by default x channel', () => {
    const statistic = StackEnter({});
    const v = {
      index: [0, 1, 2],
      value: {
        x: [[0], [1], [2]],
        enterDuration: [100, 100, 100],
      },
    };
    expect(statistic(v)).toEqual({
      index: [0, 1, 2],
      value: {
        x: [[0], [1], [2]],
        enterDuration: [100, 100, 100],
        enterDelay: [0, 100, 200],
      },
    });
  });

  test('StackEnter({...}) should work based on specified enterDelay', () => {
    const statistic = StackEnter({});
    const v = {
      index: [0, 1, 2],
      value: {
        x: [[0], [1], [2]],
        enterDuration: [100, 100, 100],
        enterDelay: [100, 100, 100],
      },
    };
    expect(statistic(v)).toEqual({
      index: [0, 1, 2],
      value: {
        x: [[0], [1], [2]],
        enterDuration: [100, 100, 100],
        enterDelay: [100, 200, 300],
      },
    });
  });

  test('StackEnter({...}) should shack enter by multiple channels', () => {
    const v = {
      index: [0, 1, 2, 3, 4, 5],
      value: {
        x: [[0], [0], [0], [1], [1], [1]],
        color: ['red', 'yellow', 'blue', 'red', 'yellow', 'blue'],
        enterDuration: [100, 100, 100, 100, 100, 100],
      },
    };

    const s1 = StackEnter({ by: ['x', 'color'] });
    expect(s1(v)).toEqual({
      index: [0, 1, 2, 3, 4, 5],
      value: {
        x: [[0], [0], [0], [1], [1], [1]],
        color: ['red', 'yellow', 'blue', 'red', 'yellow', 'blue'],
        enterDuration: [100, 100, 100, 100, 100, 100],
        enterDelay: [0, 100, 200, 300, 400, 500],
      },
    });

    const s2 = StackEnter({ by: ['color', 'x'] });
    expect(s2(v)).toEqual({
      index: [0, 1, 2, 3, 4, 5],
      value: {
        x: [[0], [0], [0], [1], [1], [1]],
        color: ['red', 'yellow', 'blue', 'red', 'yellow', 'blue'],
        enterDuration: [100, 100, 100, 100, 100, 100],
        enterDelay: [0, 200, 400, 100, 300, 500],
      },
    });
  });
});
