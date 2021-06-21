import { d3Time, Time } from '@antv/scale';
import { ScaleDef } from '../../../../src/visual/scale/index';

describe('time scale', () => {
  const scale = new ScaleDef({
    type: 'time',
    min: new Date('2011-01-01'),
    max: new Date('2011-01-02'),
  });

  it('should have expected defaults', () => {
    expect(scale.getOption('type')).toEqual('time');
    expect(scale.getOption('min')).toEqual(new Date('2011-01-01'));
    expect(scale.getOption('max')).toEqual(new Date('2011-01-02'));

    expect(scale.isLinear()).toBeFalsy();
    // @ts-ignore
    expect(scale.scale).toBeInstanceOf(Time);
    expect(scale.isContinuous()).toBeTruthy();
    expect(scale.isCategory()).toBeFalsy();
    expect(scale.isIdentity()).toBeFalsy();
    expect(scale.getOption('tickMethod')).toBe(d3Time);
  });

  it('should update min and max by domain', () => {
    scale.update({
      domain: [new Date('2011-01-01'), new Date('2011-01-02')],
    });
    expect(scale.getOption('min')).toEqual(new Date('2011-01-01'));
    expect(scale.getOption('max')).toEqual(new Date('2011-01-02'));
  });

  it('should accept date object', () => {
    scale.update({
      domain: [new Date('2011-01-02'), new Date('2011-01-10')],
    });
    expect(scale.getOption('min')).toEqual(new Date('2011-01-02'));
    expect(scale.getOption('max')).toEqual(new Date('2011-01-10'));

    expect(scale.map(new Date('2011-01-02'))).toBe(0);
    expect(scale.map(new Date('2011-01-10'))).toBe(1);
  });

  it('should accept date string', () => {
    scale.update({
      domain: ['2011-01-01', '2011-01-02'],
      range: [0, 1],
    });
    expect(scale.getOption('min')).toEqual('2011-01-01');
    expect(scale.getOption('max')).toEqual('2011-01-02');

    expect(scale.map('2011-01-01')).toBe(0);
    expect(scale.map('2011-01-02')).toBe(1);
  });

  it('should use custom formatter', () => {
    scale.update({
      mask: '[Hello] YYYY',
    });

    expect(scale.getText(new Date('2011-01-02 00:00:00'))).toEqual('Hello 2011');
    expect(scale.getText(new Date('2011-01-02T00:00:00'))).toEqual('Hello 2011');
  });

  it('should use built-in formatter', () => {
    scale.update({
      mask: null,
    });

    expect(scale.getText(new Date('2011-01-02 00:00:00'))).toEqual('Sun 02');
  });
});
