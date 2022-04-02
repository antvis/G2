import { Key } from '../../../src/statistic';

describe('Key', () => {
  it('Key returns a produce key channels', () => {
    const statistic = Key();
    const v = {
      index: [0, 1, 2],
      value: {
        x: [[0], [1], [2]],
        color: ['a', 'b', 'c'],
      },
    };
    expect(statistic(v).value).toEqual({
      x: [[0], [1], [2]],
      color: ['a', 'b', 'c'],
      key: ['0-a', '1-b', '2-c'],
    });
  });
});
