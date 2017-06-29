const expect = require('chai').expect;
const Adjust = require('../../../../src/geom/adjust/');
const Util = require('../../../../src/util');

function snapEqual(v1, v2) {
  return Math.abs(v1 - v2) < 0.001;
}

describe('adjust dodge', function() {

  describe('default adjust all has two', function() {
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

    const groupData = Util.Array.group(data, 'c');
    const adjust = new Adjust.Dodge({
      xField: 'a',
      adjustNames: [ 'x' ]
    });

    it('is adjust', function() {
      expect(adjust.isAdjust('x')).to.be.equal(true);
      expect(adjust.isAdjust('y')).to.be.equal(false);
    });

    it('get dim values', function() {
      const map = adjust._getDimValues(data);
      expect(map.a.length).to.be.equal(3);
    });
    let d1;
    it('process adjust', function() {
      adjust.processAdjust(groupData);
      expect(groupData.length).to.be.equal(2);

      d1 = groupData[0];
    });

    it('adjust result', function() {
      const obj1 = d1[0];
      expect(obj1.a).to.be.equal(0.8125);

      const obj2 = d1[1];
      expect(obj2.a).to.be.equal(1.8125);
    });

  });

  describe('default adjust some has three', function() {
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
    }, {
      a: 3,
      b: 1,
      c: 3
    }
    ];

    const groupData = Util.Array.group(data, 'c');
    const adjust = new Adjust.Dodge({
      xField: 'a',
      adjustNames: [ 'x' ]
    });


    it('is adjust', function() {
      expect(adjust.isAdjust('x')).to.be.equal(true);
      expect(adjust.isAdjust('y')).to.be.equal(false);
    });

    it('get dim values', function() {
      const map = adjust._getDimValues(data);
      expect(map.a.length).to.be.equal(3);
    });
    let d1;
    it('process adjust', function() {
      adjust.processAdjust(groupData);
      d1 = groupData[0];
    });

    it('adjust result', function() {
      const obj1 = d1[0];
      expect(obj1.a).to.be.equal(0.8125);

      const obj2 = d1[1];
      expect(obj2.a).to.be.equal(1.8125);
    });

  });

  describe('adjust only one dim', function() {

    const data = [{
      a: 1,
      b: 3,
      c: 2
    }, {
      a: 2,
      b: 1,
      c: 1
    }, {
      a: 3,
      b: 5,
      c: 1
    }];
    const adjust = new Adjust.Dodge({
      xField: 'a',
      adjustNames: [ 'y' ]
    });
    const groupData = Util.Array.group(data, 'a');

    it('is adjust', function() {
      expect(adjust.isAdjust('x')).to.be.equal(false);
      expect(adjust.isAdjust('y')).to.be.equal(true);
    });

    it('get dim values', function() {
      const map = adjust._getDimValues(data);
      expect(map.y.length).to.be.equal(2);
    });

    it('adjust', function() {
      const dataArray = Util.cloneDeep(groupData);
      adjust.processAdjust(dataArray);
      expect(dataArray.length).to.be.equal(3);
      expect(snapEqual(dataArray[0][0].y, 0.25)).equal(true);
      expect(snapEqual(dataArray[1][0].y, 0.5)).equal(true);

    });

    it('get distribute', function() {
      adjust.adjDataArray = groupData;
      const map = adjust.getDistribution('y');
      expect(map[0].length).to.be.equal(3);

    });
  });

  describe('adjust only one group.', function() {
    const data = [{
      a: 0,
      b: 3,
      c: 2
    }, {
      a: 0,
      b: 1,
      c: 1
    }, {
      a: 0,
      b: 5,
      c: 1
    }];
    const adjust = new Adjust.Dodge({
      xField: 'a',
      adjustNames: [ 'x' ]
    });
    const groupData = Util.Array.group(data, 'b');

    it('get dim values', function() {
      const map = adjust._getDimValues(data);
      expect(map).have.property('a');
      expect(map.a).eqls([ 0 ]);
    });

    it('adjust', function() {
      adjust.processAdjust(groupData);

      expect(snapEqual(groupData[0][0].a, -0.5)).to.be.true;
      expect(snapEqual(groupData[1][0].a, 0)).to.be.true;
      expect(snapEqual(groupData[2][0].a, 0.5)).to.be.true;
    });
  });

  describe('adjust multiple dims', function() {
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

    const adjust = new Adjust.Dodge({
      xField: 'a',
      dodgeBy: 'b',
      adjustNames: [ 'x' ]
    });

    const groupData = Util.Array.group(data, 'a');
    it('adjust', function() {
      adjust.processAdjust(groupData);
      const d1 = groupData[0];
      expect(d1[0].a).to.be.equal(d1[1].a);
    });
  });
});
