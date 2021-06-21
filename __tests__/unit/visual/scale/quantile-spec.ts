import { d3Ticks, Quantile } from '@antv/scale';
import { ScaleDef } from '../../../../src/visual/scale/index';

describe('quantile scale', () => {
  it('should have expected defaults', () => {
    const scale = new ScaleDef({
      min: 0,
      max: 100,
      type: 'quantile',
    });
    expect(scale.getOption('min')).toBe(0);
    expect(scale.getOption('type')).toBe('quantile');
    expect(scale.isContinuous()).toBeFalsy();
    expect(scale.isCategory()).toBeFalsy();
    expect(scale.isIdentity()).toBeFalsy();
    expect(scale.getOption('tickMethod')).toBe(d3Ticks);

    // @ts-ignore
    expect(scale.scale).toBeInstanceOf(Quantile);
  });

  it('should get right ticks by getTicks()', () => {
    const scale = new ScaleDef({
      type: 'quantile',
      domain: [0, 1, 2, 3, 6, 7, 8, 9, 10],
    });

    expect(scale.getTickValues()).toEqual([0, 2, 4, 6, 8, 10]);
  });
});
