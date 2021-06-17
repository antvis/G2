import { Log, d3Ticks } from '@antv/scale';
import { ScaleDef } from '../../../../src/visual/scale/index';

describe('log scale', () => {
  const scale = new ScaleDef({
    min: 1,
    max: 100,
    type: 'log',
  });

  it('should has log instance', () => {
    expect(scale.getOption('type')).toEqual('log');
    // @ts-ignore
    expect(scale.scale).toBeInstanceOf(Log);
    expect(scale.isContinuous()).toBeTruthy();
    expect(scale.isCategory()).toBeFalsy();
    expect(scale.isIdentity()).toBeFalsy();
    expect(scale.getOption('tickMethod')).toBe(d3Ticks);
  });

  it('should have expected defaults', () => {
    expect(scale.getOption('min')).toEqual(1);
    expect(scale.getOption('max')).toEqual(100);
    expect(scale.getOption('base')).toEqual(10);
  });

  it('should do log map and invert', () => {
    expect(scale.map(10)).toEqual(0.5);
    expect(scale.map(50)).toEqual(Math.log(50) / Math.log(100));
    expect(scale.map(1)).toEqual(0);
    expect(scale.map(100)).toEqual(1);
    expect(scale.invert(0)).toEqual(1);
    expect(scale.invert(0.5)).toEqual(10);
    expect(scale.invert(Math.log(50) / Math.log(100))).toBeCloseTo(50, 0.001); // 50.00000000000001
    expect(scale.invert(1)).toEqual(100);
  });

  it('should do log map and invert with specified range', () => {
    scale.update({
      min: 1,
      max: 100,
      range: [0, 10],
    });

    expect(scale.getOption('range')).toEqual([0, 10]);

    expect(scale.map(10)).toEqual(5);
    expect(scale.map(50)).toBeCloseTo(8.49485, 0.00001);
    expect(scale.map(1)).toEqual(0);
    expect(scale.map(100)).toEqual(10);

    expect(scale.invert(0)).toEqual(1);
    expect(scale.invert(5)).toEqual(10);
    expect(Math.round(scale.invert(8.49485))).toEqual(50);
    expect(scale.invert(10)).toEqual(100);
  });
});
