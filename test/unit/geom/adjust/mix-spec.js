const expect = require('chai').expect;
const Adjust = require('../../../../src/geom/adjust/');

describe('first dodge next stack', function() {

  const data = [{
    a: 1,
    b: 1,
    c: 1
  }, {
    a: 1,
    b: 1,
    c: 2
  },
  {
    a: 1,
    b: 2,
    c: 1
  },
  {
    a: 1,
    b: 2,
    c: 2
  },
  {
    a: 2,
    b: 1,
    c: 1
  }, {
    a: 2,
    b: 1,
    c: 2
  },
  {
    a: 2,
    b: 2,
    c: 1
  },
  {
    a: 2,
    b: 2,
    c: 2
  }
  ];

  it('dodge adjust', function() {
    const adjust = new Adjust.Dodge({
      xDim: 'a',
      groupDims: [ 'a', 'b' ],
      adjustNames: [ 'x' ]
    });
    adjust.processAdjust([ data ]);
    expect(data[0].a).to.be.equal(data[1].a);
  });

  it('stack adjust', function() {
    const adjust = new Adjust.Stack({
      xDim: 'a',
      groupDims: [ 'a', 'b' ],
      yDim: 'c'
    });
    adjust.processAdjust([ data ]);
    expect(data[0].c[1]).eql(data[1].c[0]);
  });

});

describe('first stack next symmetric', function() {
  const data = [{
    a: 1,
    b: 2,
    c: 1
  }, {
    a: 1,
    b: 3,
    c: 2
  },

  {
    a: 2,
    b: 1,
    c: 1
  }, {
    a: 2,
    b: 4,
    c: 2
  },

  {
    a: 3,
    b: 5,
    c: 1
  }, {
    a: 3,
    b: 1,
    c: 2
  }
  ];

  const adjust = new Adjust.Stack({
    xDim: 'a',
    yDim: 'b'
  });

  adjust.processAdjust([ data ]);
  it('symmetric', function() {
    const sAdjust = new Adjust.Symmetric({
      xDim: 'a',
      yDim: 'b'
    });
    sAdjust.processAdjust([ data ]);
    expect(data[0].b).eql([ 0.5, 2.5 ]);
  });
});
