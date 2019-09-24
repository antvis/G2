import { expect } from 'chai';
import { getCoordinate } from '@antv/coord';
import '../../../src';
import Animate from '../../../src/animate/animate';
import Action from '../../../src/animate/action';

const Cartesian = getCoordinate('cartesian');

describe('Animate', () => {
  it('Animate.getAnimateCfg', () => {
    let elementType = 'line';
    let animationType = 'appear';

    let result = Animate.getAnimateCfg(elementType, animationType);
    expect(result).eq(Animate.defaultCfg[animationType]);

    elementType = 'area';
    animationType = 'update';
    result = Animate.getAnimateCfg(elementType, animationType);
    expect(result).to.deep.equal(Animate.area.cfg[animationType]);

    elementType = 'label';
    animationType = 'update';
    result = Animate.getAnimateCfg(elementType, animationType);
    expect(result).eq(Animate.defaultCfg[animationType]);
  });

  it('Animate.getAnimation', () => {
    const coord = new Cartesian({
      start: {
        x: 0,
        y: 300,
      },
      end: {
        x: 200,
        y: 0,
      },
    });

    let elementType = 'heatmap';
    let animationType = 'appear';
    let result = Animate.getAnimation(elementType, coord, animationType);
    expect(result).to.equal(false);

    elementType = 'axis-ticks';
    animationType = 'update';
    result = Animate.getAnimation(elementType, coord, animationType);
    expect(result).to.be.undefined;

    elementType = 'line';
    animationType = 'leave';
    result = Animate.getAnimation(elementType, coord, animationType);
    expect(result).not.to.be.undefined;
  });

  it('Animate.registerAnimation', () => {
    Animate.registerAnimation('leave', 'myAnimation', function() {
      return 'success';
    });

    expect(Action.leave.myAnimation).to.be.an.instanceof(Function);
  });
});
