import { Rename } from '../../../src/data';

describe('rename', () => {
  it('Rename({...}) returns function rename data fields', async () => {
    const data = [
      { a: 1, b: 2, c: 3 },
      { a: 2, b: 3, c: 4 },
      { a: 3, b: 4, c: 1 },
      { a: 4, b: 1, c: 2 },
    ];

    const p1 = Rename({ a: 'x', c: 'c' });
    expect(p1(data)).toEqual([
      { x: 1, b: 2, c: 3 },
      { x: 2, b: 3, c: 4 },
      { x: 3, b: 4, c: 1 },
      { x: 4, b: 1, c: 2 },
    ]);

    const p2 = Rename({});

    expect(p2(data)).toEqual(data);

    const p3 = Rename({});
    expect(p3(data)).toEqual(data);
  });
});
