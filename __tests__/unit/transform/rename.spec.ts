import { Rename } from '../../../src/transform/preprocessor/rename';

describe('rename', () => {
  it('Rename({...}) returns function rename data fields', async () => {
    const data = [
      { a: 1, b: 2, c: 3 },
      { a: 2, b: 3, c: 4 },
      { a: 3, b: 4, c: 1 },
      { a: 4, b: 1, c: 2 },
    ];

    const p1 = Rename({ map: { a: 'x', c: 'c' } });
    expect((await p1({ data })).data).toEqual([
      { x: 1, b: 2, c: 3 },
      { x: 2, b: 3, c: 4 },
      { x: 3, b: 4, c: 1 },
      { x: 4, b: 1, c: 2 },
    ]);

    const p2 = Rename({});

    expect((await p2({ data })).data).toEqual(data);

    const p3 = Rename({ map: {} });
    expect((await p3({ data })).data).toEqual(data);
  });
});
