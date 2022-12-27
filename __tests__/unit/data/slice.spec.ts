import { Slice } from '../../../src/data';
import { defined } from '../../../src/data/filter';

describe('Slice', () => {
  it('Slice({...}) returns a function do nothing with empty start, end', async () => {
    const transform = Slice({});
    const data = [{ a: undefined }, { a: null }, { a: NaN }, { a: 1 }];
    const r = await transform(data);
    expect(r).toEqual(data);
    expect(r).not.toBe(data);
  });

  it('Slice({...}) returns a function slice arr from start to end', async () => {
    const transform = Slice({ start: 1, end: -1 });
    const data = [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }];
    const r = await transform(data);
    expect(r).toEqual([{ a: 2 }, { a: 3 }]);
  });
});
