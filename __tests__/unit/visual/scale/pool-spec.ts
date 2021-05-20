import { ScalePool } from '../../../../src/visual/scale/pool';

const data = [
  { city: 'hz', price: 100, type: 'a' },
  { city: 'sh', price: 100, type: 'b' },
]

describe('scale-pool', () => {
  it('create/get/delete/clear', () => {
    const scalePool = new ScalePool();

    scalePool.create('city', data, {}, 'view1-field');
    scalePool.create('price', data, {}, 'view1-price');

    expect(scalePool.get(''))


  });

  it('sync', () => {

  });
});