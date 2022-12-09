import { Sort } from '../../../src/data';

describe('Sort', () => {
  it('Sort({...}) returns a function with default sort', async () => {
    const transform = Sort({});
    const data = [2, 1, 3];
    const r = await transform(data);
    expect(r).toEqual([1, 2, 3]);
    // immutable
    expect(data).toEqual([2, 1, 3]);
  });

  it('Sort({...}) returns a function with desc sort', async () => {
    const transform = Sort({ callback: (a, b) => b - a });
    const data = [2, 1, 3];
    const r = await transform(data);
    expect(r).toEqual([3, 2, 1]);
  });

  it('Sort({...}) returns self when data is not array', async () => {
    const transform = Sort({});
    const data = { a: 1, b: 2 };
    const r = await transform(data);
    expect(r).toBe(data);
  });
});
