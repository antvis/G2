import { Ordinal } from '@antv/scale';
import { ScaleDef } from '../../../../src/visual/scale/index';

describe('category scale', () => {
  it('should have expected defaults with type cat', () => {
    const scale = new ScaleDef({
      type: 'category',
      domain: ['一月', '二月', 3, '四月', 5],
    });
    expect(scale.getOption('type')).toEqual('category');
    expect(scale.isCategory()).toBeTruthy();
    expect(scale.isContinuous()).toBeFalsy();
    expect(scale.isIdentity()).toBeFalsy();
    expect(scale.isLinear()).toBeFalsy();
    expect(scale.getOption('domain')).toEqual(['一月', '二月', 3, '四月', 5]);

    // @ts-ignore
    expect(scale.scale).toBeInstanceOf(Ordinal);
  });

  it('should have expected defaults with type category', () => {
    const scale = new ScaleDef({
      type: 'cat',
      domain: ['一月', '二月', 3, '四月', 5],
    });
    expect(scale.getOption('type')).toEqual('cat');
    expect(scale.isCategory()).toBeTruthy();
    expect(scale.isContinuous()).toBeFalsy();
    expect(scale.isIdentity()).toBeFalsy();
    expect(scale.isLinear()).toBeFalsy();
    expect(scale.getOption('domain')).toEqual(['一月', '二月', 3, '四月', 5]);

    // @ts-ignore
    expect(scale.scale).toBeInstanceOf(Ordinal);
  });

  it('should get domain by getTickValues', () => {
    const scale = new ScaleDef({
      type: 'cat',
      domain: ['一月', '二月', 3, '四月', 5],
    });

    expect(scale.getTickValues()).toEqual(scale.getOption('domain'));
  });
});
