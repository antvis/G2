import { Sampling } from '../../../src/data';
import D from '../../integration/data/house-price-area.json';

describe('Sampling', () => {
  it('Sampling({...}) returns a function do nothing', async () => {
    const transform = Sampling({ fields: 'y', thresholds: 1000 });
    const data = [{ y: 1 }, { y: 2 }, { y: 3 }];
    const r = await transform(data);
    expect(r).toBe(data);
  });

  it('Sampling({...}) returns a function to sampling data.', async () => {
    const transform = Sampling({
      fields: ['x', 'y'],
      thresholds: 5,
      strategy: 'median',
    });
    const r = await transform(D.map((d) => ({ x: d[0], y: d[1] })));
    expect(r).toEqual([
      {
        x: 119.18,
        y: 77024.5,
      },
      {
        x: 89.945,
        y: 71667.5,
      },
      {
        x: 83.925,
        y: 64153.5,
      },
      {
        x: 78.685,
        y: 58823,
      },
      {
        x: 80.53,
        y: 49529,
      },
      {
        x: 82.855,
        y: 47805,
      },
    ]);
  });
});
