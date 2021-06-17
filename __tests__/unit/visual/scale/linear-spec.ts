import { Linear } from '@antv/scale';
import { ScaleDef } from '../../../../src/visual/scale/index';

describe('linear scale', () => {
  const scale = new ScaleDef({
    type: 'linear',
    min: 0,
    max: 100,
    formatter(val) {
      return `${val}元`;
    },
  });

  it('should has linear instance', () => {
    expect(scale.getOption('type')).toEqual('linear');
    expect(scale.isLinear()).toBeTruthy();
    // @ts-ignore
    expect(scale.scale).toBeInstanceOf(Linear);
  });

  it('should has expected min and max', () => {
    expect(scale.getOption('min')).toEqual(0);
    expect(scale.getOption('max')).toEqual(100);
  });

  it('should do linear map and invert', () => {
    expect(scale.map(50)).toEqual(0.5);
    expect(scale.map(0)).toEqual(0);
    expect(scale.map(100)).toEqual(1);
    expect(scale.map(null)).toBeUndefined();

    expect(scale.invert(0)).toEqual(0);
    expect(scale.invert(0.5)).toEqual(50);
    expect(scale.invert(1)).toEqual(100);
  });

  it('should formatter value by getText()', () => {
    expect(scale.getText(5)).toEqual('5元');
  });

  it('should return expected ticks by getTicks()', () => {
    const ticks = scale.getTicks();
    expect(ticks.length).not.toEqual(0);
    expect(ticks[0].value).toEqual(0);
    expect(ticks[ticks.length - 1].value).toEqual(1);
  });

  it('should do linear map with specified range', () => {
    scale.update({
      min: 0,
      max: 100,
      range: [0, 1000],
    });

    expect(scale.map(50)).toEqual(500);
    expect(scale.map(0)).toEqual(0);
    expect(scale.map(100)).toEqual(1000);
    expect(scale.invert(0)).toEqual(0);
    expect(scale.invert(500)).toEqual(50);
    expect(scale.invert(1000)).toEqual(100);
  });

  it('should update min, max, ticks in update()', () => {
    scale.update({
      min: 10,
      max: 110,
      nice: true,
      range: [0, 1],
    });
    expect(scale.getOption('min')).toBe(0);
    expect(scale.getOption('max')).toBe(120);
    expect(scale.getTickValues()).toEqual([0, 20, 40, 60, 80, 100, 120]);
    expect(scale.map(60)).toEqual(0.5);
    expect(scale.map(0)).toBe(0);
    expect(scale.map(120)).toBe(1);
  });

  it('should get right ticks', () => {
    scale.update({
      min: 21,
      max: 145,
      nice: true,
    });

    // 1st time
    expect(scale.getTickValues()).toEqual([20, 40, 60, 80, 100, 120, 140, 160]);
    expect(scale.getOption('nice')).toBe(true);

    // 2nd time
    scale.update({ min: 10 });
    expect(scale.getTickValues()).toEqual([0, 50, 100, 150, 200]);

    // 3th time
    scale.update({
      min: 21,
      max: 145,
      tickCount: 6,
    });
    expect(scale.getTickValues()).toEqual([20, 40, 60, 80, 100, 120, 140, 160]);
  });
});
