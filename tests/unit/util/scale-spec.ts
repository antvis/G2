import { expect } from 'chai';
import ScaleUtil from '../../../src/util/scale';

describe('ScaleUtil', () => {
  const data1 = [{ a: 1, b: '2', c: '2010-01-01', d: 1, e: null }];

  it('createScale(), when data is empty', () => {
    const aScale = ScaleUtil.createScale('a', []);
    expect(aScale.type).equal('identity');
    expect(aScale.field).equal('a');
    expect(aScale.values).eql(['a']);

    const dScale = ScaleUtil.createScale('d', undefined, {
      type: 'cat',
      values: ['一', '二', '三'],
    });
    expect(dScale.type).equal('cat');
    expect(dScale.values).eql(['一', '二', '三']);
  });

  it('create cat scale', () => {
    const scale = ScaleUtil.createScale('b', data1);
    expect(scale.type).equal('cat');
    expect(scale.values).eql(['2']);
  });

  it('create identity scale', () => {
    const scale = ScaleUtil.createScale(1, data1);
    expect(scale.type).equal('identity');
    expect(scale.values).eql([1]);
    expect(scale.field).equal('1');
  });

  it('create identity scale, when first value is null', () => {
    const scale = ScaleUtil.createScale('e', data1);
    expect(scale.type).equal('identity');
    expect(scale.values).eql(['e']);
    expect(scale.field).equal('e');
  });

  it('create linear scale', () => {
    const scale = ScaleUtil.createScale('a', data1, { max: 10 });
    expect(scale.type).equal('linear');
    expect(scale.field).equal('a');
    expect(scale.min).equal(0);
    expect(scale.max).equal(10);
    // @ts-ignore
    expect(scale.nice).equal(true);
  });

  it('create time scale', () => {
    const scale = ScaleUtil.createScale('c', data1);
    expect(scale.type).equal('time');
    // @ts-ignore
    expect(scale.nice).equal(false);
  });

  it('create defined scale', () => {
    const scale = ScaleUtil.createScale('d', data1, {
      type: 'cat',
      values: ['一', '二', '三'],
    });
    expect(scale.type).equal('cat');
    expect(scale.values).eqls(['一', '二', '三']);
  });

  it('create scale with arr', () => {
    const data2 = [{ a: [[4, 5], 6] }, { a: 1 }, { a: [1, 2, 3, 4] }];

    const scale = ScaleUtil.createScale('a', data2, {});
    expect(scale.type).equal('linear');
    expect(scale.min).equal(1);
    expect(scale.max).equal(6);
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
    expect(oldScale.values).to.eql(['A', 'B']);

    const newScale = ScaleUtil.createScale('name', newData);
    ScaleUtil.syncScale(oldScale, newScale);
    expect(oldScale.values).to.eql(['C', 'B']);
  });
});
