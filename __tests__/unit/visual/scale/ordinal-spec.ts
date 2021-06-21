import { Ordinal } from '@antv/scale';
import { ScaleDef } from '../../../../src/visual/scale/index';

describe('ordinal scale', () => {
  it('should have ordinal instance', () => {
    const scale = new ScaleDef({
      type: 'ordinal',
    });
    expect(scale.getOption('type')).toBe('ordinal');

    // @ts-ignore
    expect(scale.scale).toBeInstanceOf(Ordinal);
    expect(scale.isCategory()).toBeTruthy();
    expect(scale.isContinuous()).toBeFalsy();
    expect(scale.isIdentity()).toBeFalsy();
    expect(scale.isLinear()).toBeFalsy();
    expect(scale.isIdentity()).toBeFalsy();
  });

  it('should get domain by getTickValues', () => {
    const scale = new ScaleDef({
      type: 'ordinal',
      domain: ['一月', '二月', 3, '四月', 5],
    });
    expect(scale.getTickValues()).toEqual(scale.getOption('domain'));
  });
});
