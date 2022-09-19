import { Map } from '../../../src/data';

describe('Map', () => {
  it('Map({...}) returns without callback', async () => {
    const transform = Map({});
    const data = [
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ];
    const r = await transform(data);
    expect(r).toEqual([
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ]);
  });

  it('Map({...}) returns a function calling callback on each datum', async () => {
    const transform = Map({
      callback: ({ sold, ...rest }) => ({ sold: `${sold}`, ...rest }),
    });
    const data = [
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ];
    const r = await transform(data);
    expect(r).toEqual([
      { genre: 'Sports', sold: '275' },
      { genre: 'Strategy', sold: '115' },
      { genre: 'Action', sold: '120' },
      { genre: 'Shooter', sold: '350' },
      { genre: 'Other', sold: '150' },
    ]);
  });
});
