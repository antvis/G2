import { Cluster } from '../../../src/transform';

describe('Cluster', () => {
  it('Cluster({...}) returns a function to layout with cluster', async () => {
    const response = await fetch(
      'https://gw.alipayobjects.com/os/antvdemo/assets/data/flare.json',
    );
    const data = await response.json();

    const c = Cluster({});
    const r = (await c({ data })).data;

    expect(r.x).toBe(0.3250502804078898);
    expect(r.y).toBe(0);

    r.count();
    expect(r.value).toBe(220);
  });
});
