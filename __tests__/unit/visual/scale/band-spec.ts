import { Band } from '@antv/scale';
import { ScaleDef } from '../../../../src/visual/scale/index';

describe('band scale', () => {
  it('should have band instance', () => {
    const scale = new ScaleDef({
      type: 'band',
    });
    expect(scale.getOption('type')).toBe('band');

    // @ts-ignore
    expect(scale.scale).toBeInstanceOf(Band);
    expect(scale.isCategory()).toBeTruthy();
    expect(scale.isContinuous()).toBeFalsy();
    expect(scale.isIdentity()).toBeFalsy();
    expect(scale.isLinear()).toBeFalsy();
  });
});
