import { Opacity } from '../../../../src/visual/attribute/opacity';
import { ScaleDef } from '../../../../src/visual/scale';

describe('test opacity attr', () => {
  test('test default options', () => {
    const sizeAttr = new Opacity({
      scales: [],
      value: [0, 100],
    });
    expect(sizeAttr.fields).toStrictEqual(['opacity']);
    expect(sizeAttr.type).toStrictEqual('opacity');
  });

  test('mapping opacity', () => {
    const linear = new ScaleDef({
      type: 'linear',
      domain: [0, 10],
    });
    const opacity = new Opacity({
      scales: [linear],
      value: [0, 1],
    });

    expect(opacity.mapping(0)[0]).toStrictEqual(0);
    expect(opacity.mapping(10)[0]).toStrictEqual(1);
    expect(opacity.mapping(5)[0]).toStrictEqual(0.5);
  });
});
