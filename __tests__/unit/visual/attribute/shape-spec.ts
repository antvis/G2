import { Shape } from '../../../../src/visual/attribute/shape';
import { ScaleDef } from '../../../../src/visual/scale';

describe('test shape attribute', () => {
  test('default options', () => {
    const sp = new Shape({
      value: [],
      scales: [],
    });

    expect(sp.fields).toStrictEqual(['shape']);
    expect(sp.type).toStrictEqual('shape');
  });

  test('test category mappings', () => {
    const scaleCat = new ScaleDef({
      type: 'cat',
      domain: ['a', 'b', 'c', 'd'],
    });

    const shape = new Shape({
      value: ['s1', 's2'],
      scales: [scaleCat],
    });

    expect(shape.mapping('a')[0]).toStrictEqual('s1');
    expect(shape.mapping('b')[0]).toStrictEqual('s2');
    expect(shape.mapping('c')[0]).toStrictEqual('s1');
    expect(shape.mapping('d')[0]).toStrictEqual('s2');
  });

  test('test linear mappings', () => {
    const scaleLinear = new ScaleDef({
      type: 'linear',
      domain: [0, 10],
    });

    const shape = new Shape({
      scales: [scaleLinear],
      value: ['s1', 's2'],
    });

    expect(shape.mapping(0)[0]).toStrictEqual('s1');
    expect(shape.mapping(4)[0]).toStrictEqual('s1');
    expect(shape.mapping(9)[0]).toStrictEqual('s2');
    expect(shape.mapping(10)[0]).toStrictEqual('s2');
  });
});
