import { EMA } from '../../../src/data';

describe('EMA', () => {
  it('EMA({...}) returns a function  that is used to exponentially smooth the data', async () => {
    const transform = EMA({ alpha: 0.6, field: 'y' });
    const data = [
      { x: 1, y: 2 },
      { x: 4, y: 5 },
      { x: 5, y: 8 },
    ];
    const r = await transform(data);
    expect(r).toEqual([
      {
        x: 1,
        y: 2,
      },
      {
        x: 4,
        y: 3.2,
      },
      {
        x: 5,
        y: 5.12,
      },
    ]);
  });
});
