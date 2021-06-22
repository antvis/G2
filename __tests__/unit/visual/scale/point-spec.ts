import { Point } from '@antv/scale';
import { ScaleDef } from '../../../../src/visual/scale/index';

describe('point scale', () => {
  const scale = new ScaleDef({
    type: 'point',
  });

  it('should have point instance', () => {
    expect(scale.getOption('type')).toBe('point');

    // @ts-ignore
    expect(scale.scale).toBeInstanceOf(Point);
    expect(scale.isCategory()).toBeTruthy();
    expect(scale.isContinuous()).toBeFalsy();
    expect(scale.isIdentity()).toBeFalsy();
    expect(scale.isLinear()).toBeFalsy();
    expect(scale.isIdentity()).toBeFalsy();
  });
});
