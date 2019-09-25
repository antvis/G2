const expect = require('chai').expect;
const Animate = require('../../../src/animate/animate');
const Coord = require('@antv/coord/lib/index');
const Action = require('../../../src/animate/action');

describe('Animate', () => {
  it('Animate.getAnimateCfg', () => {
    let geomType = 'line';
    let animationType = 'appear';

    let result = Animate.getAnimateCfg(geomType, animationType);
    expect(result).eq(Animate.defaultCfg[animationType]);

    geomType = 'area';
    animationType = 'update';
    result = Animate.getAnimateCfg(geomType, animationType);
    expect(result).to.deep.equal(Animate.area.cfg[animationType]);

    geomType = 'label';
    animationType = 'update';
    result = Animate.getAnimateCfg(geomType, animationType);
    expect(result).eq(Animate.defaultCfg[animationType]);
  });

  it('Animate.getAnimation', () => {
    const coord = new Coord.Cartesian({
      start: {
        x: 0,
        y: 300
      },
      end: {
        x: 200,
        y: 0
      }
    });
    let geomType = 'heatmap';
    let animationType = 'appear';
    let result = Animate.getAnimation(geomType, coord, animationType);
    expect(result).to.equal(false);

    geomType = 'axis-ticks';
    animationType = 'update';
    result = Animate.getAnimation(geomType, coord, animationType);
    expect(result).to.be.undefined;

    geomType = 'line';
    animationType = 'leave';
    result = Animate.getAnimation(geomType, coord, animationType);
    expect(result).not.to.be.undefined;
  });

  it('Animate.registerAnimation', () => {
    Animate.registerAnimation('leave', 'myAnimation', () => 'success');

    expect(Action.leave.myAnimation).to.be.an.instanceof(Function);
  });
});
