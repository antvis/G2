import { Band } from '@antv/scale';
import { ScaleDef } from '../../../../src/visual/scale/index';

describe('band scale', () => {
  const scale = new ScaleDef({
    type: 'band',
  });

  it('should have band instance', () => {
    expect(scale.getOption('type')).toBe('band');

    // @ts-ignore
    expect(scale.scale).toBeInstanceOf(Band);
    expect(scale.isCategory()).toBeTruthy();
    expect(scale.isContinuous()).toBeFalsy();
    expect(scale.isIdentity()).toBeFalsy();
    expect(scale.isLinear()).toBeFalsy();
    expect(scale.isIdentity()).toBeFalsy();
  });
});
