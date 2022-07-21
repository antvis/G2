import { Interval, props } from '../../../src/api/interval';

describe('Interval', () => {
  it('Interval() should have expected defaults', () => {
    const interval = new Interval();
    expect(interval.type).toBe('interval');
  });

  it('interval should have expected props', () => {
    expect(props).toEqual([
      { name: 'encode', type: 'object' },
      { name: 'scale', type: 'object' },
      { name: 'data', type: 'value' },
      { name: 'key', type: 'value' },
      { name: 'class', type: 'value' },
      { name: 'transform', type: 'array' },
      { name: 'style', type: 'object' },
      { name: 'animate', type: 'object' },
      { name: 'theme', type: 'object' },
    ]);
  });

  it('interval.create() should return Interval', () => {
    const interval = new Interval();
    expect(interval.create()).toBe(Interval);
  });
});
