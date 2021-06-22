import { Band } from '@antv/scale';
import { ScaleDef } from '../../../../src/visual/scale/index';

describe('time category scale', () => {
  it('should have expected defaults', () => {
    const scale = new ScaleDef({
      type: 'timeCat',
    });
    expect(scale.getOption('type')).toEqual('timeCat');
    expect(scale.isCategory()).toBeTruthy();
    expect(scale.isContinuous()).toBeFalsy();
    expect(scale.isIdentity()).toBeFalsy();
    expect(scale.isLinear()).toBeFalsy();

    // @ts-ignore
    expect(scale.scale).toBeInstanceOf(Band);
  });

  it('should accept date string and map after sorting', () => {
    const scale = new ScaleDef({
      type: 'timeCat',
      domain: ['2012-02-02', '2012-02-01', '2012-02-04', '2012-02-03'],
      range: [0, 1],
    });

    // console.log(scale)
    expect(scale.map('2012-02-01')).toBe(0);
    expect(scale.map('2012-02-02')).toBe(0.25);
    expect(scale.map('2012-02-03')).toBe(0.5);
    expect(scale.map('2012-02-04')).toBe(0.75);
    expect(scale.invert(0)).toEqual(new Date('2012-02-01'));
    expect(scale.invert(0.25)).toEqual(new Date('2012-02-02'));
  });

  it('should accept date object and map after sorting', () => {
    const scale = new ScaleDef({
      type: 'timeCat',
      domain: [
        new Date('2012-02-02'),
        new Date('2012-02-01'),
        new Date('2012-02-04'),
        new Date('2012-02-03'),
      ],
      range: [0, 1],
    });

    expect(scale.map(new Date('2012-02-01'))).toBe(0);
    expect(scale.map(new Date('2012-02-02'))).toBe(0.25);
    expect(scale.map(new Date('2012-02-03'))).toBe(0.5);
    expect(scale.map(new Date('2012-02-04'))).toBe(0.75);
    expect(scale.invert(0)).toEqual(new Date('2012-02-01'));
    expect(scale.invert(0.25)).toEqual(new Date('2012-02-02'));
  });

  it('should use mask as formatter', () => {
    const scale = new ScaleDef({
      type: 'timeCat',
      mask: '[Hello] YYYY',
    });

    expect(scale.getText(new Date('2010-01-01'))).toBe('Hello 2010');
  });

  it('should get domain by getTickValues', () => {
    const scale = new ScaleDef({
      type: 'timeCat',
      domain: [
        new Date('2012-02-02'),
        new Date('2012-02-01'),
        new Date('2012-02-04'),
        new Date('2012-02-03'),
      ],
    });
    expect(scale.getTickValues()).toEqual(scale.getOption('domain'));
  });
});
