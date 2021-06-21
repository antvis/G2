import { Identity } from '@antv/scale';
import { ScaleDef } from '../../../../src/visual/scale/index';

describe('identity scale', () => {
  it('should have identity instance', () => {
    const scale = new ScaleDef();
    expect(scale.getOption('type')).toBe('identity');

    // @ts-ignore
    expect(scale.scale).toBeInstanceOf(Identity);
    expect(scale.isIdentity()).toBeTruthy();
    expect(scale.isContinuous()).toBeFalsy();
    expect(scale.isCategory()).toBeFalsy();
    expect(scale.isLinear()).toBeFalsy();
  });
});
