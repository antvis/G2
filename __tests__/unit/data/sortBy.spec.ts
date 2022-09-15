import { SortBy } from '../../../src/data';

describe('SortBy', () => {
  it('SortBy({...}) returns function sort data by fields in asc order by default', async () => {
    const data = [{ a: 3 }, { a: 2 }, { a: 1 }];

    const s1 = SortBy({});
    expect(s1(data)).toEqual(data);

    const s2 = SortBy({ fields: [['a']] });
    expect(s2(data)).toEqual([{ a: 1 }, { a: 2 }, { a: 3 }]);
  });

  it('SortBy({...}) returns function enabling sorting data in des order', async () => {
    const data = [{ a: 1 }, { a: 2 }, { a: 2 }, { a: 3 }];
    const s = SortBy({ fields: [['a', false]] });
    expect(s(data)).toEqual([{ a: 3 }, { a: 2 }, { a: 2 }, { a: 1 }]);
  });

  it('SortBy({...} returns function enabling sorting data by multiple fields', async () => {
    const data = [
      { a: 3, b: 1 },
      { a: 2, b: 2 },
      { a: 2, b: 3 },
      { a: 1, b: 4 },
    ];

    const s1 = SortBy({ fields: [['a'], ['b']] });
    expect(s1(data)).toEqual([
      { a: 1, b: 4 },
      { a: 2, b: 2 },
      { a: 2, b: 3 },
      { a: 3, b: 1 },
    ]);

    const s2 = SortBy({ fields: [['b'], ['a']] });
    expect(s2(data)).toEqual([
      { a: 3, b: 1 },
      { a: 2, b: 2 },
      { a: 2, b: 3 },
      { a: 1, b: 4 },
    ]);

    const s3 = SortBy({
      fields: [
        ['a', true],
        ['b', false],
      ],
    });
    expect(s3(data)).toEqual([
      { a: 1, b: 4 },
      { a: 2, b: 3 },
      { a: 2, b: 2 },
      { a: 3, b: 1 },
    ]);

    const s4 = SortBy({
      fields: ['a', ['b', true]],
    });
    expect(s4(data)).toEqual([
      { a: 1, b: 4 },
      { a: 2, b: 2 },
      { a: 2, b: 3 },
      { a: 3, b: 1 },
    ]);

    const s5 = SortBy({
      fields: ['a', 'b'],
    });
    expect(s5(data)).toEqual([
      { a: 1, b: 4 },
      { a: 2, b: 2 },
      { a: 2, b: 3 },
      { a: 3, b: 1 },
    ]);
  });
});
