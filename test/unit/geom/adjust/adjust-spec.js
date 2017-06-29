const expect = require('chai').expect;
const Adjust = require('../../../../src/geom/adjust');

describe('adjust', function() {

  const data = [{
    a: 1,
    b: 2
  }, {
    a: 1,
    b: 3
  },

  {
    a: 2,
    b: 1
  }, {
    a: 2,
    b: 4
  },

  {
    a: 3,
    b: 5
  }, {
    a: 3,
    b: 1
  }
  ];

  describe('default adjust', function() {
    const adjust = new Adjust({
      xField: 'a',
      yField: 'b'
    });

    it('is adjust', function() {
      expect(adjust.isAdjust('x')).to.be.equal(true);
      expect(adjust.isAdjust('y')).to.be.equal(true);
      expect(adjust.isAdjust('z')).to.be.equal(false);
    });

    it('get dim values', function() {
      const map = adjust._getDimValues(data.slice(0));
      expect(map.a.length).to.be.equal(3);
      expect(map.b.length).to.be.equal(5);
    });

    it('group data', function() {
      const group = adjust.groupData(data, 'a');
      expect(group['1'].length).to.be.equal(2);
    });

    it('get adjust range', function() {
      const range = adjust.getAdjustRange('a', 1, [ 1, 2, 3 ]);
      expect(range.pre).to.be.equal(0.5);
      expect(range.next).to.be.equal(1.5);
    });

    it('get adjust range last', function() {

      const range = adjust.getAdjustRange('a', 3, [ 1, 2, 3 ]);
      expect(range.pre).to.be.equal(2.5);
      expect(range.next).to.be.equal(3.5);
    });

  });

  describe('only adjust x', function() {
    const adjust = new Adjust({
      xField: 'a',
      adjustNames: [ 'x' ]
    });

    it('is adjust', function() {
      expect(adjust.isAdjust('x')).to.be.equal(true);
      expect(adjust.isAdjust('y')).to.be.equal(false);
    });

    it('get adjust values', function() {
      const map = adjust._getDimValues(data.slice(0));
      expect(map.a.length).to.be.equal(3);
    });

  });

  describe('only x adjust x,y', function() {
    const adjust = new Adjust({
      xField: 'a',
      adjustNames: [ 'x', 'y' ]
    });

    it('is adjust', function() {
      expect(adjust.isAdjust('x')).to.be.equal(true);
      expect(adjust.isAdjust('y')).to.be.equal(true);
    });

    it('get adjust values', function() {
      const map = adjust._getDimValues(data);
      expect(map.a.length).to.be.equal(3);
      expect(map.y.length).to.be.equal(2);
    });

    it('group data', function() {
      const group = adjust.groupData(data, 'y');
      expect(group['0'].length).to.be.equal(6);
    });

  });
  describe('one record adjust', function() {
    const data = [{
      a: 1,
      b: 2
    }];
    const adjust = new Adjust({
      yField: 'a',
      adjustNames: [ 'y' ]
    });

    it('get adjust values', function() {
      const map = adjust._getDimValues(data);
      expect(map.a.length).to.be.equal(1);
    });

    it('get adjust range', function() {

      const range = adjust.getAdjustRange('a', 1, [ 1 ]);
      expect(range.pre).to.be.equal(0.5);
      expect(range.next).to.be.equal(1.5);

    });

  });


  describe('only x adjust y', function() {
    const data = [{
      a: 1,
      b: 2
    }];
    const adjust = new Adjust({
      xField: 'a',
      adjustNames: [ 'y' ]
    });

    it('get adjust values', function() {
      const map = adjust._getDimValues(data);
      // expect(map.a.length).to.be.equal(1);
      expect(map.y.length).to.be.equal(2);
    });

    it('get adjust range', function() {
      const range = adjust.getAdjustRange('y', 0, [ 0, 1 ]);
      expect(range.pre).to.be.equal(0);
      expect(range.next).to.be.equal(1);
    });
  });
});
