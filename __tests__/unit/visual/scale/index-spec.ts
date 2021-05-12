import { ScaleDef } from '@g2/visual/scale';
import { ScaleTypes } from '@g2/types';

describe('scale', () => {
  test('ScaleDef meta data', () => {
    expect(ScaleDef).toBeDefined();
    const scale = new ScaleDef({
      type: 'linear',
      range: [0, 1],
      field: 'a',
      domain: [0, 1, 2, 50],
    });

    expect(scale.field).toStrictEqual('a');
    expect(scale.fieldName).toStrictEqual('a');

    scale.update({
      alias: 'foo',
    });

    expect(scale.field).toStrictEqual('a');
    expect(scale.fieldName).toStrictEqual('foo');
    expect(scale.isLinear()).toBeTruthy();
    expect(scale.isCategory()).toBeFalsy();
    expect(scale.isIdentity()).toBeFalsy();
  });

  test('test update options', () => {
    const scale = new ScaleDef({
      type: 'linear',
      range: [0, 1],
      domain: [0, 1, 2, 50],
    });

    // @ts-ignore
    expect(scale.cfg).toStrictEqual({
      range: [0, 1],
      type: 'linear',
      domain: [0, 1, 2, 50],
    });

    scale.update({
      domain: [0, 1, 2],
    });

    // @ts-ignore
    expect(scale.cfg).toStrictEqual({
      range: [0, 1],
      type: 'linear',
      domain: [0, 1, 2],
    });
  });

  test('if user update scale type, we should renew inner scale', () => {
    const scale = new ScaleDef({
      type: 'linear',
      range: [0, 1],
      domain: [0, 1],
    });

    // @ts-ignore
    const p = Object.getPrototypeOf(scale.scale);
    expect(p.constructor.name).toStrictEqual('Linear');

    scale.update({
      type: 'ordinal',
    });

    // @ts-ignore
    const p2 = Object.getPrototypeOf(scale.scale);
    expect(p2.constructor.name).toStrictEqual('Ordinal');
  });

  test('test map and invert API', () => {
    const scale = new ScaleDef({
      type: 'linear',
      range: [0, 1],
      domain: [0, 1, 2, 50],
    });

    expect(scale.type).toBe('linear');
    expect(scale.map(25)).toBe(0.5);
    expect(scale.invert(0.5)).toBe(25);

    scale.update({
      min: 0,
      max: 100,
    });

    expect(scale.type).toBe('linear');
    expect(scale.map(50)).toBe(0.5);
    expect(scale.invert(0.5)).toBe(50);

    scale.update({
      min: 100,
      max: 200,
    });

    expect(scale.map(10)).toBe(-0.9);
    expect(scale.invert(0.8)).toBe(180);
  });

  test('enum all accepted types', () => {
    const scale = new ScaleDef({
      type: 'linear',
      range: [0, 1],
      domain: [0, 1, 2, 50],
    });

    const acceptTypes = [
      'ordinal',
      'band',
      'point',
      'linear',
      'log',
      'pow',
      'sqrt',
      'time',
      'identity',
      'threshold',
      'quantize',
      'quantile',
    ];

    acceptTypes.forEach((item) => {
      scale.update({
        type: item as ScaleTypes,
      });

      // @ts-ignore
      const p = Object.getPrototypeOf(scale.scale);
      expect(p.constructor.name.toLowerCase()).toStrictEqual(item);
    });
  });

  test('if user pass types that not support, we return Ordinal', () => {
    const scale = new ScaleDef({
      type: 'linear',
      range: [0, 1],
      domain: [0, 1, 2, 50],
    });

    scale.update({
      // @ts-ignore
      type: 'hello world~',
    });

    // @ts-ignore
    const p = Object.getPrototypeOf(scale.scale);
    expect(p.constructor.name).toStrictEqual('Ordinal');
  });
});
