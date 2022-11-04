import { FilterBy } from '@/data';

describe('FilterBy', () => {
  it('FilterBy({...}) returns a function do nothing with empty fields', async () => {
    const transform = FilterBy({});
    const data = [{ a: undefined }, { a: null }, { a: NaN }, { a: 1 }];
    const r = await transform(data);
    expect(r).toEqual(data);
  });

  it('FilterBy({...}) returns a function filter defined value', async () => {
    const transform = FilterBy({ fields: [['a']] });
    const data = [
      { a: undefined, b: 1 },
      { a: null, b: 1 },
      { a: NaN, b: 1 },
      { a: 1, b: 1 },
    ];
    const r = await transform(data);
    expect(r).toEqual([{ a: 1, b: 1 }]);
  });

  it('FilterBy({...}) returns function accepting custom filter callback for each field value', async () => {
    const transform = FilterBy({
      fields: [
        ['a', (d) => d > 0],
        ['b', (d) => d < 0],
      ],
    });
    const data = [
      { a: 1, b: 1 },
      { a: 1, b: -1 },
      { a: -1, b: -1 },
      { a: -1, b: 1 },
    ];
    const r = await transform(data);
    expect(r).toEqual([{ a: 1, b: -1 }]);
  });

  it('FilterBy({...}) returns function accepting custom fields', async () => {
    const transform = FilterBy({
      fields: ['a', ['b', (d) => d > 0]],
    });
    const data = [
      { a: 1, b: 1 },
      { a: 1, b: -1 },
      { a: -1, b: -1 },
      { a: -1, b: 1 },
    ];
    const r = await transform(data);
    expect(r).toEqual([
      { a: 1, b: 1 },
      { a: -1, b: 1 },
    ]);

    const transform2 = FilterBy({
      fields: ['a', 'b'],
    });
    const r2 = await transform2(data);
    expect(r2).toEqual([
      { a: 1, b: 1 },
      { a: 1, b: -1 },
      { a: -1, b: -1 },
      { a: -1, b: 1 },
    ]);
  });
});
