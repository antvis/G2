const expect = require('chai').expect;
const PlotRange = require('../../../../src/component/plot/range');

describe('初始化绘制区域类 PlotRange', function() {
  const range = new PlotRange({
    x: 20,
    y: 280
  }, {
    x: 280,
    y: 20
  });

  it('初始化测试 init test', function() {
    expect(range.start).to.eql({
      x: 20,
      y: 280
    });
    expect(range.end).to.eql({
      x: 280,
      y: 20
    });
  });

  it('左顶点、左底点、右顶点、右底点  tl,bl,tr,br', function() {
    expect(range.tl.x).to.equal(20);
    expect(range.tl.y).to.equal(20);

    expect(range.tr.x).to.equal(280);
    expect(range.tr.y).to.equal(20);

    expect(range.bl.x).to.equal(20);
    expect(range.bl.y).to.equal(280);

    expect(range.br.x).to.equal(280);
    expect(range.br.y).to.equal(280);

    expect(range.cc.x).to.equal(150);
    expect(range.cc.y).to.equal(150);
  });

  it('水平范围判定 in horizontal', function() {
    expect(range.isInHorizontal(10)).not.to.be.true;

    expect(range.isInHorizontal(20)).to.be.true;

    expect(range.isInHorizontal(50)).to.be.true;

    expect(range.isInHorizontal({
      x: 50
    })).to.be.true;


    expect(range.isInHorizontal(290)).not.to.be.true;
  });

  it('垂直范围判定 in vertical', function() {
    expect(range.isInVertical(10)).not.to.be.true;

    expect(range.isInVertical(280)).to.be.true;

    expect(range.isInVertical(50)).to.be.true;
    expect(range.isInVertical({
      y: 50
    })).to.be.true;


    expect(range.isInVertical(290)).not.to.be.true;
  });

  it('范围判定 in range', function() {
    expect(range.isInRange(10, 10)).not.to.be.true;

    expect(range.isInRange(100, 100)).to.be.true;

    expect(range.isInRange(20, 20)).to.be.true;

    expect(range.isInRange({
      x: 20,
      y: 20
    })).to.be.true;
  });

  it('宽 width', function() {
    expect(range.getWidth()).to.equal(260);
  });

  it('高 height', function() {
    expect(range.getHeight()).to.equal(260);
  });
});
