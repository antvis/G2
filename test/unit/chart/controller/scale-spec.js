const expect = require('chai').expect;
const ScaleController = require('../../../../src/chart/controller/scale.js');

describe('test scale controller', function() {
  const data = [
    { a: 1, b: '2', c: '2010-01-01', d: 1 }
  ];
  const controller = new ScaleController({
    defs: {
      d: {
        type: 'cat',
        values: [ '一', '二', '三' ]
      }
    }
  });
  it('create scale without data', function() {
    const scale = controller.createScale('a', []);
    expect(scale.type).equal('identity');
  });
  it('create cat scale', function() {
    const scale = controller.createScale('b', data);
    expect(scale.type).equal('cat');
    expect(scale.values).eqls([ '2' ]);
  });
  it('create const scale', function() {
    const scale = controller.createScale(1, data);
    expect(scale.type).equal('identity');
    expect(scale.value).equal(1);
  });
  it('create linear scale', function() {
    const scale = controller.createScale('a', data);
    expect(scale.type).equal('linear');
    expect(scale.field).equal('a');
    expect(scale.min).equal(0);
  });

  it('create time scale', function() {
    const scale = controller.createScale('c', data);
    expect(scale.type).equal('time');
    expect(scale.nice).equal(false);
  });

  it('create defined scale', function() {
    const scale = controller.createScale('d', data);
    expect(scale.type).equal('cat');
    expect(scale.values).eqls([ '一', '二', '三' ]);
  });

  /* it('create scale with arr', function() {
    const data = [
      { a: [ 1, 2, 3 ], b: true, c: {} },
      { a: [ 4, 5, 6 ], b: false, c: {} }
    ];

  }); */
});
