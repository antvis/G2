import { FilterBy } from '../../../src/transform';

describe('FilterBy', () => {
  it('FilterBy({...}) returns a function do nothing with empty fields', () => {
    const transform = FilterBy({});
    const data = [{ a: undefined }, { a: null }, { a: NaN }, { a: 1 }];
    expect(transform(data)).toEqual(data);
  });

  it('FilterBy({...}) returns a function filter defined value', () => {
    const transform = FilterBy({ fields: ['a'] });
    const data = [
      { a: undefined, b: 1 },
      { a: null, b: 1 },
      { a: NaN, b: 1 },
      { a: 1, b: 1 },
    ];
    expect(transform(data)).toEqual([{ a: 1, b: 1 }]);
  });

  it('FilterBy({...}) returns function accepting custom filter callback for each field value', () => {
    const transform = FilterBy({ fields: ['a', 'b'], callback: (d) => d > 0 });
    const data = [
      { a: 1, b: 1 },
      { a: 1, b: -1 },
      { a: -1, b: -1 },
      { a: -1, b: 1 },
    ];
    expect(transform(data)).toEqual([{ a: 1, b: 1 }]);
  });
});
