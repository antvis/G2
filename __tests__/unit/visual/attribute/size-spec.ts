import { ScaleDef } from '../../../../src/visual/scale';
import { Size } from '../../../../src/visual/attribute/size';

describe('size attribute', () => {
  test('test default options', () => {
    const sizeAttr = new Size({
      scales: [],
      value: [0, 100],
    });

    expect(sizeAttr.fields).toStrictEqual(['size']);
    expect(sizeAttr.type).toStrictEqual('size');
  });

  test('test for linear', () => {
    const scaleLinear = new ScaleDef({
      type: 'linear',
      domain: [0, 10],
    });

    const sizeAttr = new Size({
      scales: [scaleLinear],
      value: [0, 100],
    });

    expect(sizeAttr.mapping(0)[0]).toStrictEqual(0);
    expect(sizeAttr.mapping(10)[0]).toStrictEqual(100);
    expect(sizeAttr.mapping(5)[0]).toStrictEqual(50);
  });

  test('test for cat', () => {
    const scaleCat = new ScaleDef({
      type: 'category',
      domain: ['a', 'b', 'c', 'd'],
    });

    const sizeAttr = new Size({
      scales: [scaleCat],
      value: [0, 10, 100],
    });

    expect(sizeAttr.mapping('a')[0]).toBe(0);
    expect(sizeAttr.mapping('b')[0]).toBe(10);
    expect(sizeAttr.mapping('c')[0]).toBe(100);
  });

  test('test for identity', () => {
    const scaleIdentity = new ScaleDef({
      type: 'identity',
    });
    const sizeAttr = new Size({
      scales: [scaleIdentity],
      value: [66],
    });

    expect(sizeAttr.mapping(1)[0]).toStrictEqual(66);
    expect(sizeAttr.mapping(2)[0]).toStrictEqual(66);
    expect(sizeAttr.mapping(3)[0]).toStrictEqual(66);
    expect(sizeAttr.mapping(4)[0]).toStrictEqual(66);
    expect(sizeAttr.mapping(5)[0]).toStrictEqual(66);
  });
});
