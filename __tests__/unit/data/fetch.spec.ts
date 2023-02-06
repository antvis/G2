import { Fetch } from '../../../src/data';

describe.skip('Fetch', () => {
  it('Fetch({...}) returns a function fetching json by default', async () => {
    const transform = Fetch({
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/ce45e3d7-ba78-4a08-b411-28df40ef9b7f.json',
    });
    const data = await transform({});
    expect(data).toEqual([
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ]);
  });

  it('Fetch({...}) returns a function fetching json formatted by autoType config', async () => {
    const transform = Fetch({
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/87092954-aed4-48b2-93ba-b07b255f04a2.csv',
      format: 'csv',
      autoType: true,
    });

    const data = await transform({});
    expect(data[0].weight).toEqual(5);
  });
});
