import { diff } from '../../../../src/geometry/util/diff';

describe('test diff', () => {
  it('should diff elements', () => {
    const keyItems = {
      a: 1,
      b: 2,
      c: 3,
      g: 4,
      h: 5,
    };
    const keys = ['b', 'e', 'f', 'h'];
    expect(diff(keyItems, keys)).toEqual({
      added: ['e', 'f'],
      removed: ['a', 'c', 'g'],
      updated: ['b', 'h'],
    });
  });
});
