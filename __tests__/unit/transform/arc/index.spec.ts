import { Arc } from '../../../../src/transform/utils/arc';

describe('Fetch', () => {
  it('Fetch({...}) returns a function fetching json by default', async () => {
    const response = await fetch(
      'https://gw.alipayobjects.com/os/antfincdn/agVao%26jU5l/miserables.json',
    );
    const data = await response.json();

    const arc = Arc();
    expect(arc(data)).toBeDefined();
  });
});
