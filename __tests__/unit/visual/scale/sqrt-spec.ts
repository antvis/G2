import { Sqrt } from '@antv/scale';
import { ScaleDef } from '../../../../src/visual/scale/index';

describe('sqrt scale', () => {
  it('should have sqrt instance', () => {
    const scale = new ScaleDef({
      type: 'sqrt',
    });
    expect(scale.getOption('type')).toBe('sqrt');

    // @ts-ignore
    expect(scale.scale).toBeInstanceOf(Sqrt);
    expect(scale.isContinuous()).toBeTruthy();
    expect(scale.isCategory()).toBeFalsy();
    expect(scale.isIdentity()).toBeFalsy();
  });
});
