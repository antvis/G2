import { Constant, Field, Transform } from '../../../src/encode';

describe('encode', () => {
  it('Constant({...}) returns a constant function', () => {
    const encode = Constant({ value: 1 });
    const data = [{}, {}, {}];
    expect(encode(data)).toEqual([1, 1, 1]);
  });

  it('Field({...}) returns a function selecting a column from data', () => {
    const encode = Field({ value: 'name' });
    const data = [{ name: 'a' }, { name: 'b' }, { name: 'c' }];
    expect(encode(data)).toEqual(['a', 'b', 'c']);
  });

  it('Transform({...}) returns a function applying mapping function for data', () => {
    const encode = Transform({ value: (d) => d.name });
    const data = [{ name: 'a' }, { name: 'b' }, { name: 'c' }];
    expect(encode(data)).toEqual(['a', 'b', 'c']);
  });
});
