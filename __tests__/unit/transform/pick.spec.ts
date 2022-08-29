import { Pick } from '../../../src/data';

describe('pick', () => {
  it('Pick({...}) returns function pick data by fields', async () => {
    const data = [
      { a: 1, b: 2, c: 3 },
      { a: 2, b: 3, c: 4 },
      { a: 3, b: 4, c: 1 },
      { a: 4, b: 1, c: 2 },
    ];

    const p1 = Pick({ fields: ['a', 'b', 'd'] });
    expect(p1(data)).toEqual([
      { a: 1, b: 2 },
      { a: 2, b: 3 },
      { a: 3, b: 4 },
      { a: 4, b: 1 },
    ]);

    const p2 = Pick({});
    expect(await p2(data)).toEqual([{}, {}, {}, {}]);

    const data2 = [{ a: 1, b: 2 }, { a: 2 }, { a: 3, b: 4 }, { b: 5 }];
    const p3 = Pick({ fields: ['b'] });
    expect(p3(data2)).toEqual([{ b: 2 }, {}, { b: 4 }, { b: 5 }]);
  });
});
