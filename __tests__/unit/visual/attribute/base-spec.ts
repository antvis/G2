import { Attribute } from '../../../../src/visual/attribute';
import { ScaleDef } from '../../../../src/visual/scale';

describe('attribute base', () => {
  test('default options', () => {
    const attr = new Attribute({
      scales: [],
      value: [],
      callback: () => {
        return ['hello world'];
      },
    });

    expect(attr.type).toStrictEqual('base');
    expect(attr.fields).toStrictEqual([]);
    expect(attr.value).toStrictEqual([]);
    expect(attr.callback).toBeDefined();
    expect(attr.scales).toStrictEqual([]);
  });

  test('test option update', () => {
    const attr = new Attribute({
      fields: [],
      scales: [],
      value: [],
      callback: () => {
        return ['hello world'];
      },
    });

    attr.update({
      fields: ['a', 'b'],
      value: [0],
      callback: undefined,
    });

    expect(attr.type).toStrictEqual('base');
    expect(attr.fields).toStrictEqual(['a', 'b']);
    expect(attr.value).toStrictEqual([0]);
    expect(attr.callback).toBeUndefined();
    expect(attr.scales).toStrictEqual([]);
  });

  test('test mapping', () => {
    const scaleIdentity = new ScaleDef({
      type: 'identity',
    });

    const attr = new Attribute({
      scales: [scaleIdentity],
      fields: ['base'],
    });

    expect(attr.mapping(5)).toStrictEqual([5]);
    expect(attr.mapping(6)).toStrictEqual([6]);
    expect(attr.mapping(7)).toStrictEqual([7]);
    expect(attr.mapping(8)).toStrictEqual([8]);
  });

  test('use custom callback', () => {
    const fn = jest.fn((val) => {
      return val * 2;
    });

    const scaleIdentity = new ScaleDef({
      type: 'identity',
    });

    const attr = new Attribute({
      scales: [scaleIdentity],
      fields: ['base'],
      callback: fn,
    });

    expect(attr.mapping(6)).toStrictEqual([12]);
    expect(attr.mapping(7)).toStrictEqual([14]);
    expect(attr.mapping(8)).toStrictEqual([16]);
    expect(attr.mapping(9)).toStrictEqual([18]);

    expect(fn).toBeCalledTimes(4);
  });

  test('map with no params', () => {
    const scaleIdentity = new ScaleDef({
      type: 'identity',
    });

    const attr = new Attribute({
      scales: [scaleIdentity],
      fields: ['base'],
      value: [10],
    });

    expect(attr.mapping()).toStrictEqual([10]);
    expect(attr.mapping()).toStrictEqual([10]);
    expect(attr.mapping()).toStrictEqual([10]);
    expect(attr.mapping()).toStrictEqual([10]);
  });

  test('callback dont return any value', () => {
    const fn = jest.fn();

    const scaleIdentity = new ScaleDef({
      type: 'identity',
    });

    const attr = new Attribute({
      scales: [scaleIdentity],
      fields: ['base'],
      callback: fn,
    });

    expect(attr.mapping(10)).toStrictEqual([10]);
    expect(fn).toBeCalled();
  });
});
