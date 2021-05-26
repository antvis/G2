import { ORIGINAL_FIELD } from '../../../src';
import { Geometry } from '../../../src/geometry';
import { ScaleDef } from '../../../src/visual/scale';

const data = [
  { city: 'hz', price: 100, type: 'a' },
  { city: 'sh', price: 50, type: 'a' },
  { city: 'bj', price: 75, type: 'a' },
  { city: 'hz', price: 1100, type: 'b' },
  { city: 'sh', price: 150, type: 'b' },
  { city: 'bj', price: 175, type: 'b' },
];

describe('geometry', () => {
  const g = new Geometry({
    data,
    scales: new Map(),
    coordinate: null,
  });

  it('geometry constructor', () => {
    expect(g.type).toEqual('geometry');
  });

  it('geometry api', () => {
    // 视觉通道
    g.position('x*y')
      .color('type', ['red', 'green', 'yellow'])
      .shape('type', ['rect', 'circle', 'star'])
      .size('value', [10, 50])
      .sequence('time', { autoRun: true })
      .label('value', {})
      .tooltip('value', {})
      .custom({ hello: 'world' });

    expect(g.getAttriubteOptions().get('position')).toEqual({ fields: ['x', 'y'] });
    expect(g.getAttriubteOptions().get('color')).toEqual({
      fields: ['type'],
      value: ['red', 'green', 'yellow'],
    });
    expect(g.getAttriubteOptions().get('shape')).toEqual({
      fields: ['type'],
      value: ['rect', 'circle', 'star'],
    });
    expect(g.getAttriubteOptions().get('shape')).toEqual({
      fields: ['type'],
      value: ['rect', 'circle', 'star'],
    });
    expect(g.getAttriubteOptions().get('size')).toEqual({ fields: ['value'], value: [10, 50] });
    expect(g.getAttriubteOptions().get('sequence')).toEqual({
      fields: ['time'],
      value: { autoRun: true },
    });
    expect(g.getAttriubteOptions().get('label')).toEqual({ fields: ['value'], value: {} });
    expect(g.getAttriubteOptions().get('tooltip')).toEqual({ fields: ['value'], value: {} });
    expect(g.getAttriubteOptions().get('custom')).toEqual({
      fields: [],
      value: { hello: 'world' },
    });

    // 其他配置
    g.adjust('stack', { a: 1 });
    g.animate(false);

    // @ts-ignore
    expect(g.adjustOptions).toEqual([
      {
        type: 'stack',
        a: 1,
      },
    ]);
  });

  it('update', () => {
    // 重开一个实例
    const scales = new Map();
    scales.set('city', new ScaleDef({ type: 'cat', field: 'city', domain: ['hz', 'sh', 'bj'] }));
    scales.set('price', new ScaleDef({ type: 'linear', field: 'price', domain: [50, 1100] }));
    scales.set('type', new ScaleDef({ type: 'cat', field: 'type', domain: ['red', 'green'] }));

    const g = new Geometry({
      data,
      scales,
      coordinate: null,
    });

    g.position('city*price').color('type', ['red', 'green']);

    g.update({});

    // updateAttributes 创建 attribute 实例
    const position = g.getAttribute('position');
    expect(position.scales).toEqual([g.getXScale(), g.getYScale()]);
    expect(position.value).toEqual([]);
    expect(position.callback).toBe(undefined);

    const color = g.getAttribute('color');
    expect(color.scales).toEqual([g.getScale('type')]);
    expect(g.getAttribute('color')).toBeDefined();
    expect(g.getAttribute('size')).toBeUndefined();

    // processData 数据处理
    // @ts-ignore
    const beforeMappingData = g.beforeMappingData;
    expect(beforeMappingData[0]).toEqual([
      { city: 0, price: 100, type: 'a', [ORIGINAL_FIELD]: { city: 'hz', price: 100, type: 'a' } },
      { city: 1, price: 50, type: 'a', [ORIGINAL_FIELD]: { city: 'sh', price: 50, type: 'a' } },
      { city: 0, price: 75, type: 'a', [ORIGINAL_FIELD]: { city: 'bj', price: 75, type: 'a' } },
    ]);
    expect(beforeMappingData[1]).toEqual([
      { city: 0, price: 1100, type: 'b', [ORIGINAL_FIELD]: { city: 'hz', price: 1100, type: 'b' } },
      { city: 1, price: 150, type: 'b', [ORIGINAL_FIELD]: { city: 'sh', price: 150, type: 'b' } },
      { city: 0, price: 175, type: 'b', [ORIGINAL_FIELD]: { city: 'bj', price: 175, type: 'b' } },
    ]);

    // @ts-ignore
    window.g = g;
  });
});
