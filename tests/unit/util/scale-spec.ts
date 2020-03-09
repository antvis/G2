import { createScaleByField, getName, syncScale } from '../../../src/util/scale';

describe('ScaleUtil', () => {
  const data1 = [{ a: 1, b: '2', c: '2010-01-01', d: 1, e: null, f: '20200229', g: '20200202' }];

  it('createScaleByField(), when data is empty', () => {
    const aScale = createScaleByField('a', []);
    expect(aScale.type).toBe('identity');
    expect(aScale.field).toBe('a');
    expect(aScale.values).toEqual(['a']);

    const dScale = createScaleByField('d', undefined, {
      type: 'cat',
      values: ['一', '二', '三'],
    });
    expect(dScale.type).toBe('cat');
    expect(dScale.values).toEqual(['一', '二', '三']);
  });

  it('create cat scale', () => {
    const scale = createScaleByField('b', data1);
    expect(scale.type).toBe('cat');
    expect(scale.values).toEqual(['2']);
  });

  it('create identity scale', () => {
    const scale = createScaleByField(1, data1);
    expect(scale.type).toBe('identity');
    expect(scale.values).toEqual([1]);
    expect(scale.field).toBe('1');
  });

  it('create identity scale, when first value is null', () => {
    const scale = createScaleByField('e', data1);
    expect(scale.type).toBe('identity');
    expect(scale.values).toEqual(['e']);
    expect(scale.field).toBe('e');
  });

  it('create linear scale', () => {
    const scale = createScaleByField('a', data1, { max: 10 });
    expect(scale.type).toBe('linear');
    expect(scale.field).toBe('a');
    expect(scale.min).toBe(1);
    expect(scale.max).toBe(10);
    // @ts-ignore
    expect(scale.nice).toBe(false);
  });

  it('create time scale', () => {
    const scale = createScaleByField('c', data1);
    expect(scale.type).toBe('time');
    // @ts-ignore
    expect(scale.nice).toBe(false);
  });

  it('create defined scale', () => {
    const scale = createScaleByField('d', data1, {
      type: 'cat',
      values: ['一', '二', '三'],
    });
    expect(scale.type).toBe('cat');
    expect(scale.values).toEqual(['一', '二', '三']);
  });

  it('create scale with arr', () => {
    const data2 = [{ a: [[4, 5], 6] }, { a: 1 }, { a: [1, 2, 3, 4] }];

    const scale = createScaleByField('a', data2, {});
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
    const oldScale = createScaleByField('name', oldData);
    expect(oldScale.values).toEqual(['A', 'B']);

    const newScale = createScaleByField('name', newData);
    syncScale(oldScale, newScale);
    expect(oldScale.values).toEqual(['C', 'B']);
  });

  it('getName', () => {
    const scale = createScaleByField('b', data1);
    expect(getName(scale)).toBe('b');
    const aliasScale = createScaleByField('b', data1, { alias: '字段 B' });
    expect(getName(aliasScale)).toBe('字段 B');
  });

  it('dateRegex test for yyyymmdd', () => {
    expect(createScaleByField('f', data1).type).toBe('cat');
    expect(createScaleByField('g', data1).type).toBe('cat');
  });
});
