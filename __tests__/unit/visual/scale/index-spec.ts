import { ScaleDef } from '../../../../src/visual/scale';

describe('scale', () => {
  it('ScaleDef', () => {
    expect(ScaleDef).toBeDefined();
  });

  it('identity', () => {
    const scale = new ScaleDef({
      type: 'identity',
      field: 'test',
    });

    expect(scale.type).toBe('identity');
    expect(scale.field).toBe('test');
    expect(scale.fieldName).toBe('test');
    expect(scale.map(1)).toBe(1);
    expect(scale.invert(1)).toBe(1);

    scale.update({
      alias: '测试',
    });

    expect(scale.type).toBe('identity');
    expect(scale.field).toBe('test');
    expect(scale.fieldName).toBe('测试');
    expect(scale.map(1)).toBe(1);
    expect(scale.invert(1)).toBe(1);
  });

  it('linear', () => {
    const scale = new ScaleDef({
      type: 'linear',
      range: [0, 1],
      values: [0, 1, 2, 50],
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

  it('log', () => {});

  it('pow', () => {});

  it('cat / category', () => {});

  it('time', () => {});

  it('timeCat', () => {});
});
