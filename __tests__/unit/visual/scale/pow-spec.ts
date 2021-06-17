import { Pow, d3Ticks } from '@antv/scale';
import { ScaleDef } from '../../../../src/visual/scale/index';

describe('pow scale', () => {
  const scale = new ScaleDef({
    min: 0,
    max: 100,
    exponent: 2,
    type: 'pow',
  });

  it('should has pow instance', () => {
    expect(scale.getOption('type')).toEqual('pow');
    // @ts-ignore
    expect(scale.scale).toBeInstanceOf(Pow);
    expect(scale.isContinuous()).toBeTruthy();
    expect(scale.isCategory()).toBeFalsy();
    expect(scale.isIdentity()).toBeFalsy();
    expect(scale.getOption('tickMethod')).toBe(d3Ticks);
  });

  it('should have expected defaults', () => {
    expect(scale.getOption('min')).toEqual(0);
    expect(scale.getOption('max')).toEqual(100);
    expect(scale.getOption('exponent')).toEqual(2);
  });

  it('should get right ticks by getTickValues()', () => {
    expect(scale.getTickValues()).toEqual([0, 20, 40, 60, 80, 100]);
  });
});
