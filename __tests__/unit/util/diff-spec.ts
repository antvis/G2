import { diff } from '../../../src/util/diff';

describe('diff', () => {
  it('diff', () => {
    const ids = ['a', 'b', 'e', 'f', 'g'];

    const map = new Map<string, number>();
    map.set('a', 1);
    map.set('b', 2);
    map.set('c', 3);
    map.set('d', 4);
    map.set('e', 5);

    const { added, removed, updated } = diff(ids, map);

    expect(added).toEqual(['f', 'g']);
    expect(removed).toEqual(['c', 'd']);
    expect(updated).toEqual(['a', 'b', 'e']);
  });
});
