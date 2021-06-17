import { Constant } from '@antv/scale';
import { ScaleDef } from '../../../../src/visual/scale/index';

describe('constant scale', () => {
  const scale = new ScaleDef({
    type: 'constant',
  });

  it('should have identity instance', () => {
    expect(scale.getOption('type')).toBe('constant');

    // @ts-ignore
    expect(scale.scale).toBeInstanceOf(Constant);
    expect(scale.isIdentity()).toBeFalsy();
    expect(scale.isContinuous()).toBeFalsy();
    expect(scale.isCategory()).toBeFalsy();
  });
});
