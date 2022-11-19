import { Filter } from '../../../src/data';
import { defined } from '../../../src/data/filter';

describe('Filter', () => {
  it('Filter({...}) returns a function do nothing with empty fields', async () => {
    const transform = Filter({});
    const data = [{ a: undefined }, { a: null }, { a: NaN }, { a: 1 }];
    const r = await transform(data);
    expect(r).toEqual(data);
  });

  it('Filter({...}) returns a function filter defined value', async () => {
    const transform = Filter({ callback: (d) => defined(d.a) });
    const data = [
      { a: undefined, b: 1 },
      { a: null, b: 1 },
      { a: NaN, b: 1 },
      { a: 1, b: 1 },
    ];
    const r = await transform(data);
    expect(r).toEqual([{ a: 1, b: 1 }]);
  });
});
