import { Ordinal } from '@antv/scale';
import { ScaleDef } from '../../../../src/visual/scale/index';

describe('ordinal scale', () => {
  const scale = new ScaleDef({
    type: 'ordinal',
  });

  it('should have ordinal instance', () => {
    expect(scale.getOption('type')).toBe('ordinal');

    // @ts-ignore
    expect(scale.scale).toBeInstanceOf(Ordinal);
    expect(scale.isCategory()).toBeTruthy();
    expect(scale.isContinuous()).toBeFalsy();
    expect(scale.isIdentity()).toBeFalsy();
    expect(scale.isLinear()).toBeFalsy();
    expect(scale.isIdentity()).toBeFalsy();
  });
});
