import { Pick } from '../../../src/transform/pick';

describe('pick', () => {
  it('Pick({...}) returns function pick data by fields', () => {
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
    expect(p2(data)).toEqual([{}, {}, {}, {}]);
  });
});
