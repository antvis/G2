import { d3Ticks, Quantize } from '@antv/scale';
import { ScaleDef } from '../../../../src/visual/scale/index';

describe('test quantize scale', () => {
  it('should have expected defaults', () => {
    const scale = new ScaleDef({
      min: 0,
      max: 100,
      type: 'quantize',
    });
    expect(scale.getOption('type')).toBe('quantize');
    expect(scale.getOption('min')).toBe(0);
    expect(scale.getOption('max')).toBe(100);
    expect(scale.getOption('nice')).toBe(false);
    expect(scale.getOption('tickMethod')).toBe(d3Ticks);

    // @ts-ignore
    expect(scale.scale).toBeInstanceOf(Quantize);
  });

  it('should get expected ticks by getTickValues()', () => {
    const scale = new ScaleDef({
      min: 3,
      max: 97,
      type: 'quantize',
    });
    expect(scale.getOption('min')).toBe(3);
    expect(scale.getOption('max')).toBe(97);
    expect(scale.getTickValues()).toEqual([20, 40, 60, 80]);
  });

  it('should nice domain', () => {
    const scale = new ScaleDef({
      min: 3,
      max: 97,
      type: 'quantize',
      nice: true,
    });
    expect(scale.getOption('min')).toBe(0);
    expect(scale.getOption('max')).toBe(100);
    expect(scale.getTickValues()).toEqual([0, 20, 40, 60, 80, 100]);
  });
});
