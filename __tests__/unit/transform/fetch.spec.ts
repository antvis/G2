import { Fetch } from '../../../src/transform';

describe('Fetch', () => {
  it('Fetch({...}) returns a function fetching json by default', async () => {
    const transform = Fetch({
      url: 'https://gw.alipayobjects.com/os/bmw-prod/6b50ec60-2afd-451f-8ca2-4ba7d90c5651.json',
    });
    const data = await transform();
    expect(data).toEqual({ a: 1 });
  });
});
