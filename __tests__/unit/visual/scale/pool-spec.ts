import { ScalePool } from '../../../../src/visual/scale/pool';

const data = [
  { city: 'hz', price: 100, type: 'a' },
  { city: 'sh', price: 50, type: 'b' },
  { city: 'bj', price: 75, type: 'c' },
];

describe('scale-pool', () => {
  it('create/get/delete/clear', () => {
    const scalePool = new ScalePool();

    // create
    scalePool.create('city', data, {}, 'view1-city');
    scalePool.create('price', data, {}, 'view1-price');

    // get
    expect(scalePool.get('view1-city').field).toBe('city');
    expect(scalePool.get('view1-city').type).toBe('cat');
    expect(scalePool.get('view1-city').getOption('domain')).toEqual(['hz', 'sh', 'bj']);

    expect(scalePool.get('view1-price').field).toBe('price');
    expect(scalePool.get('view1-price').type).toBe('linear');

    expect(scalePool.get('view1-price').getOption('domain')).toEqual([50, 100]);

    // delete
    scalePool.delete('view1-city');
    expect(scalePool.get('view1-city')).toBeUndefined();

    // clear
    scalePool.clear();
    expect(scalePool.get('view1-price')).toBeUndefined();
  });

  it('sync', () => {});
});
