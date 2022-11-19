import { Join } from '../../../src/data';

describe('join', () => {
  const data = [
    { a: 1, b: 2, c: 3 },
    { a: 4, b: 5, c: 6 },
  ];

  const joinData = [
    { c: 1, d: 2, e: 3 },
    { c: 4, d: 5, e: 6 },
  ];

  it('Join({...}) returns function join another dataset', async () => {
    const j1 = Join({ join: joinData, on: ['a', 'c'], select: ['d', 'e'] });
    expect(await j1(data)).toEqual([
      { a: 1, b: 2, c: 3, d: 2, e: 3 },
      { a: 4, b: 5, c: 6, d: 5, e: 6 },
    ]);

    // On with function
    const j2 = Join({
      join: joinData,
      on: [(d) => d.a, (d) => d.c],
      select: ['d', 'e'],
    });
    expect(await j2(data)).toEqual([
      { a: 1, b: 2, c: 3, d: 2, e: 3 },
      { a: 4, b: 5, c: 6, d: 5, e: 6 },
    ]);
  });

  it('Join({...}) returns function join another dataset and rename fields by as', async () => {
    const j3 = Join({
      join: joinData,
      on: [(d) => d.a, (d) => d.c],
      select: ['d', 'e'],
      as: ['dd', 'ee'],
    });
    expect(await j3(data)).toEqual([
      { a: 1, b: 2, c: 3, dd: 2, ee: 3 },
      { a: 4, b: 5, c: 6, dd: 5, ee: 6 },
    ]);
  });

  it('Join({...}) returns function join another dataset and with unknow', async () => {
    const j1 = Join({
      join: joinData,
      on: ['a', 'x'],
      select: ['d'],
      unknown: 'unkonwn',
    });
    expect(await j1(data)).toEqual([
      { a: 1, b: 2, c: 3, d: 'unkonwn' },
      { a: 4, b: 5, c: 6, d: 'unkonwn' },
    ]);
  });
});
