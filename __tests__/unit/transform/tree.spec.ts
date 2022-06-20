import { Tree } from '../../../src/transform';

describe('Tree', () => {
  it('Tree({...}) returns a function to layout with tree', async () => {
    const response = await fetch(
      'https://gw.alipayobjects.com/os/antvdemo/assets/data/flare.json',
    );
    const data = await response.json();

    const c = Tree({});
    const r = (await c({ data })).data;

    expect(r.x).toBe(0.4054794520547945);
    expect(r.y).toBe(0);

    r.count();
    expect(r.value).toBe(220);
  });
});
