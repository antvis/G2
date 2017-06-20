const expect = require('chai').expect;
const Adjust = require('../../../../src/geom/adjust/');

describe('symmetric adjust', function() {
  describe('default symmetric', function() {
    const data = [{
      a: 1,
      b: 2,
      c: 1
    }, {
      a: 2,
      b: 1,
      c: 1
    }, {
      a: 3,
      b: 5,
      c: 1
    }];

    const adjust = new Adjust.Symmetric({
      xDim: 'a',
      yDim: 'b'
    });

    it('process adjust', function() {
      adjust.processAdjust([ data ]);
      expect(data.length).to.be.equal(3);
    });

    it('adjust result', function() {
      const obj1 = data[0];
      expect(obj1.b.length).to.be.equal(2);
      expect(obj1.b[0]).to.be.equal(1.5);
      expect(obj1.b[1]).to.be.equal(3.5);
    });

    it('adjust second', function() {
      const obj2 = data[1];
      expect(obj2.b[0]).to.be.equal(2);
      expect(obj2.b[1]).to.be.equal(3);
    });
  });

  describe('symmetric array', function() {
    const data = [{
      a: 1,
      b: [ 1, 2 ],
      c: 1
    }, {
      a: 2,
      b: [ 2, 3 ],
      c: 1
    }, {
      a: 3,
      b: [ 3, 5 ],
      c: 1
    }];

    const adjust = new Adjust.Symmetric({
      xDim: 'a',
      yDim: 'b'
    });

    it('process adjust', function() {
      adjust.processAdjust([ data ]);
    });

    it('adjust result', function() {
      const obj1 = data[0];
      expect(obj1.b.length).to.be.equal(2);
      expect(obj1.b[0]).to.be.equal(2.5);
      expect(obj1.b[1]).to.be.equal(3.5);
    });

    it('adjust second', function() {
      const obj2 = data[1];
      expect(obj2.b[0]).to.be.equal(3);
      expect(obj2.b[1]).to.be.equal(4);
    });

  });
});
