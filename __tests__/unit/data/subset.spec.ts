import { Subset } from '@/data';

describe('subset', () => {
  it('Subset({...}) returns function to get subset of data', () => {
    const data = [
      { a: 1, b: 2, c: 3 },
      { a: 2, b: 3, c: 4 },
      { a: 3, b: 4, c: 1 },
      { a: 4, b: 1, c: 2 },
    ];

    const p1 = Subset({ start: 1, end: 3, fields: ['b', 'c'] });
    expect(p1(data)).toEqual([
      { b: 3, c: 4 },
      { b: 4, c: 1 },
    ]);

    const p2 = Subset({});
    expect(p2(data)).toEqual([{}, {}, {}, {}]);

    const p3 = Subset({ fields: ['b', 'c'], start: -1, end: 2 });
    expect(p3(data)).toEqual([
      { b: 2, c: 3 },
      { b: 3, c: 4 },
    ]);

    const p4 = Subset({ fields: ['a', 'b', 'c'], start: 1, end: 4 });
    expect(p4(data)).toEqual([
      { a: 2, b: 3, c: 4 },
      { a: 3, b: 4, c: 1 },
      { a: 4, b: 1, c: 2 },
    ]);

    const p5 = Subset({ fields: ['a'], end: 4 });
    expect(p5(data)).toEqual([{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }]);

    const p6 = Subset({ start: -1, end: 2 });
    expect(p6(data)).toEqual([{}, {}]);

    const p7 = Subset({ fields: ['a'], start: 3, end: 1 });
    expect(p7(data)).toEqual([{ a: 2 }, { a: 3 }]);

    const p8 = Subset({ fields: ['b'], start: 5, end: 2 });
    expect(p8(data)).toEqual([{ b: 4 }]);

    const p9 = Subset({ fields: ['b'], start: 1, end: -2 });
    expect(p9(data)).toEqual([]);
  });
});
