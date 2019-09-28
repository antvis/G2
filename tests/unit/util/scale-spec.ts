import ScaleUtil from '../../../src/util/scale';

describe('ScaleUtil', () => {
  const data1 = [{ a: 1, b: '2', c: '2010-01-01', d: 1, e: null }];

  it('createScale(), when data is empty', () => {
    const aScale = ScaleUtil.createScale('a', []);
    expect(aScale.type).toBe('identity');
    expect(aScale.field).toBe('a');
    expect(aScale.values).toEqual(['a']);

    const dScale = ScaleUtil.createScale('d', undefined, {
      type: 'cat',
      values: ['一', '二', '三'],
    });
    expect(dScale.type).toBe('cat');
    expect(dScale.values).toEqual(['一', '二', '三']);
  });

  it('create cat scale', () => {
    const scale = ScaleUtil.createScale('b', data1);
    expect(scale.type).toBe('cat');
    expect(scale.values).toEqual(['2']);
  });

  it('create identity scale', () => {
    const scale = ScaleUtil.createScale(1, data1);
    expect(scale.type).toBe('identity');
    expect(scale.values).toEqual([1]);
    expect(scale.field).toBe('1');
  });

  it('create identity scale, when first value is null', () => {
    const scale = ScaleUtil.createScale('e', data1);
    expect(scale.type).toBe('identity');
    expect(scale.values).toEqual(['e']);
    expect(scale.field).toBe('e');
  });

  it('create linear scale', () => {
    const scale = ScaleUtil.createScale('a', data1, { max: 10 });
    expect(scale.type).toBe('linear');
    expect(scale.field).toBe('a');
    expect(scale.min).toBe(0);
    expect(scale.max).toBe(10);
    // @ts-ignore
    expect(scale.nice).toBe(true);
  });

  it('create time scale', () => {
    const scale = ScaleUtil.createScale('c', data1);
    expect(scale.type).toBe('time');
    // @ts-ignore
    expect(scale.nice).toBe(false);
  });

  it('create defined scale', () => {
    const scale = ScaleUtil.createScale('d', data1, {
      type: 'cat',
      values: ['一', '二', '三'],
    });
    expect(scale.type).toBe('cat');
    expect(scale.values).toEqual(['一', '二', '三']);
  });

  it('create scale with arr', () => {
    const data2 = [{ a: [[4, 5], 6] }, { a: 1 }, { a: [1, 2, 3, 4] }];

    const scale = ScaleUtil.createScale('a', data2, {});
    expect(scale.type).toBe('linear');
    expect(scale.min).toBe(1);
    expect(scale.max).toBe(6);
  });

  it('syncScale', () => {
    const oldData = [
      { name: 'A', day: 'Monday', sales: 10 },
      { name: 'A', day: 'Tuesday', sales: 19 },
      { name: 'B', day: 'Monday', sales: 92 },
      { name: 'B', day: 'Tuesday', sales: 58 },
    ];
    const newData = [{ name: 'C', day: 'Monday', sales: 43 }, { name: 'B', day: 'Monday', sales: 9 }];
    const oldScale = ScaleUtil.createScale('name', oldData);
    expect(oldScale.values).toEqual(['A', 'B']);

    const newScale = ScaleUtil.createScale('name', newData);
    ScaleUtil.syncScale(oldScale, newScale);
    expect(oldScale.values).toEqual(['C', 'B']);
  });
});
