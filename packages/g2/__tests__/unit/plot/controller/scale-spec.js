import { expect } from 'chai';
import ScaleController from '../../../../src/plot/controller/scale';

describe('ScaleController', () => {
  const data = [
    { a: 1, b: '2', c: '2010-01-01', d: 1, e: null },
  ];
  const controller = new ScaleController({
    d: {
      type: 'cat',
      values: [ '一', '二', '三' ],
    },
    a: {
      max: 10,
    },
  });

  it('create scale without data or empty array', () => {
    // 传入空数组
    const scale1 = controller.createScale('a', []);
    expect(scale1.type).equal('identity');
    expect(scale1.field).equal('a');
    expect(scale1.values).eql([ 'a' ]);

    // 不传入数据，同时提供列定义
    const scale2 = controller.createScale('d');
    expect(scale2.type).equal('cat');
    expect(scale2.values).eql([ '一', '二', '三' ]);
  });

  it('create cat scale', () => {
    const scale = controller.createScale('b', data);
    expect(scale.type).equal('cat');
    expect(scale.values).eql([ '2' ]);
  });

  it('create identity scale', () => {
    const scale = controller.createScale(1, data);
    expect(scale.type).equal('identity');
    expect(scale.values).eql([ 1 ]);
    expect(scale.field).equal('1');
  });

  it('create identity scale, when first value of a field is null', () => {
    const scale = controller.createScale('e', data);
    expect(scale.type).equal('identity');
    expect(scale.values).eql([ 'e' ]);
    expect(scale.field).equal('e');
  });

  it('create linear scale', () => {
    const scale = controller.createScale('a', data);
    expect(scale.type).equal('linear');
    expect(scale.field).equal('a');
    expect(scale.min).equal(0);
    expect(scale.max).equal(10);
    expect(scale.nice).equal(true);
  });

  // TODO: time 类型还不支持
  xit('create time scale', () => {
    const scale = controller.createScale('c', data);
    expect(scale.type).equal('time');
    expect(scale.nice).equal(false);
  });

  it('create defined scale', () => {
    const scale = controller.createScale('d', data);
    expect(scale.type).equal('cat');
    expect(scale.values).eqls([ '一', '二', '三' ]);
  });

  it('create scale with arr', () => {
    const data = [
      { a: [ [ 4, 5 ], 6 ]},
      { a: 1 },
      { a: [ 1, 2, 3, 4 ]},
    ];

    controller.defs = {};

    const scale = controller.createScale('a', data);
    expect(scale.type).equal('linear');
    expect(scale.min).equal(1);
    expect(scale.max).equal(6);
  });
});
