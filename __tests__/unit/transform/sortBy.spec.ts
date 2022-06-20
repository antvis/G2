import { SortBy } from '../../../src/transform';

describe('SortBy', () => {
  it('SortBy({...}) returns function sort data by fields in asc order by default', async () => {
    const data = [{ a: 3 }, { a: 2 }, { a: 1 }];

    const s1 = SortBy({});
    expect((await s1({ data })).data).toEqual(data);

    const s2 = SortBy({ fields: ['a'] });
    expect((await s2({ data })).data).toEqual([{ a: 1 }, { a: 2 }, { a: 3 }]);
  });

  it('SortBy({...}) returns function enabling sorting data in des order', async () => {
    const data = [{ a: 1 }, { a: 2 }, { a: 2 }, { a: 3 }];
    const s = SortBy({ fields: ['a'], order: 'DESC' });
    expect((await s({ data })).data).toEqual([
      { a: 3 },
      { a: 2 },
      { a: 2 },
      { a: 1 },
    ]);
  });

  it('SortBy({...} returns function enabling sorting data by multiple fields', async () => {
    const data = [
      { a: 3, b: 1 },
      { a: 2, b: 2 },
      { a: 2, b: 3 },
      { a: 1, b: 4 },
    ];

    const s1 = SortBy({ fields: ['a', 'b'] });
    expect((await s1({ data })).data).toEqual([
      { a: 1, b: 4 },
      { a: 2, b: 2 },
      { a: 2, b: 3 },
      { a: 3, b: 1 },
    ]);

    const s2 = SortBy({ fields: ['b', 'a'] });
    expect((await s2({ data })).data).toEqual([
      { a: 3, b: 1 },
      { a: 2, b: 2 },
      { a: 2, b: 3 },
      { a: 1, b: 4 },
    ]);
  });
});
