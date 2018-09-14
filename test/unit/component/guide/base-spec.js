const expect = require('chai').expect;
const Guide = require('../../../../src/component/guide/base');
const Coord = require('@antv/coord/lib/index');

describe('Guide 基类异常情况测试', function() {
  const coord = new Coord.Rect({
    start: {
      x: 60,
      y: 460
    },
    end: {
      x: 460,
      y: 60
    }
  });
  it('Base class method: parsePoint(coord, point)', function() {
    const point = {
      x: 0.2,
      y: 0.4
    };

    const guide = new Guide({
      xScales: {
        a: 1
      },
      yScales: {
        b: 1
      }
    });
    const result = guide.parsePoint(coord, point);
    expect(result).to.be.undefined;

    const rst1 = guide.parsePoint(coord, [ '50%', '50%' ]);
    expect(rst1).eql(coord.center);
  });

  it('Base class method: render()', function() {
    const guide = new Guide();
    expect(guide.render).be.an.instanceof(Function);
    expect(guide.render()).to.be.undefined;
  });
});
