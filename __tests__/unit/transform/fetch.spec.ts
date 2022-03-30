import { Fetch } from '../../../src/transform';

describe('Fetch', () => {
  it('Fetch({...}) returns a function fetching json by default', async () => {
    const transform = Fetch({
      url: 'https://gw.alipayobjects.com/os/bmw-prod/ce45e3d7-ba78-4a08-b411-28df40ef9b7f.json',
    });
    const data = await transform();
    expect(data).toEqual([
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ]);
  });

  it('Fetch({...} returns a function calling  callback on each datum', async () => {
    const transform = Fetch({
      url: 'https://gw.alipayobjects.com/os/bmw-prod/ce45e3d7-ba78-4a08-b411-28df40ef9b7f.json',
      callback: ({ sold, ...rest }) => ({ sold: `${sold}`, ...rest }),
    });
    const data = await transform();
    expect(data).toEqual([
      { genre: 'Sports', sold: '275' },
      { genre: 'Strategy', sold: '115' },
      { genre: 'Action', sold: '120' },
      { genre: 'Shooter', sold: '350' },
      { genre: 'Other', sold: '150' },
    ]);
  });
});
