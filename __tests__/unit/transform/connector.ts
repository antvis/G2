import { Connector } from '../../../src/transform';

describe('connector', () => {
  it('Connector({...}) returns function preprocess data by specified callback', () => {
    const data = [
      { a: 1, b: 2, c: 3 },
      { a: 2, b: 3, c: 4 },
      { a: 3, b: 4, c: 1 },
      { a: 4, b: 1, c: 2 },
    ];

    const c1 = Connector({ callback: undefined });
    expect(c1({ data })).toBe(data);

    const c2 = Connector({ callback: (d) => d.filter((i) => i.a === 1) });
    expect(c2({ data })).toEqual([{ a: 1, b: 2, c: 3 }]);
  });
});
