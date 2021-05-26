import { Geometry } from '../../../src/geometry';

const data = [
  { city: 'hz', price: 100, type: 'a' },
  { city: 'sh', price: 50, type: 'b' },
  { city: 'bj', price: 75, type: 'c' },
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
    g.position('x*y');
    g.color('type', ['red', 'green', 'yellow']);
    g.shape('type', ['rect', 'circle', 'star']);
    g.size('value', [10, 50]);
    g.sequence('time', { autoRun: true });
    g.label('value', {});
    g.tooltip('value', {});
    g.custom({ hello: 'world' });

    expect(g.getAttriubteOptions().get('position')).toEqual({ fields: ['x', 'y'] });
    expect(g.getAttriubteOptions().get('color')).toEqual({ fields: ['type'], value: ['red', 'green', 'yellow'] });
    expect(g.getAttriubteOptions().get('shape')).toEqual({ fields: ['type'], value: ['rect', 'circle', 'star'] });
    expect(g.getAttriubteOptions().get('shape')).toEqual({ fields: ['type'], value: ['rect', 'circle', 'star'] });
    expect(g.getAttriubteOptions().get('size')).toEqual({ fields: ['value'], value: [10, 50] });
    expect(g.getAttriubteOptions().get('sequence')).toEqual({ fields: ['time'], value: { autoRun: true } });
    expect(g.getAttriubteOptions().get('label')).toEqual({ fields: ['value'], value: {} });
    expect(g.getAttriubteOptions().get('tooltip')).toEqual({ fields: ['value'], value: {} });
    expect(g.getAttriubteOptions().get('custom')).toEqual({ fields: [], value: { hello: 'world' }});

    // 其他配置
    g.adjust('stack', { a: 1 });
    g.animate(false);

    // @ts-ignore
    expect(g.adjustOptions).toEqual([{
      type: 'stack',
      a: 1,
    }]);
  });
});
