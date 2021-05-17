import { isNumberEqual } from '@antv/util';
import { ScaleDef } from '../../../../src/visual/scale';

// TODO 万木

describe.skip('category scale', function () {
  const scale = new ScaleDef({
    type: 'cat',
    domain: ['一月', '二月', 3, '四月', 5],
  });

  it('config', function () {
    expect(scale.type).toEqual('cat');
    expect(scale.isCategory).toBeTruthy();
    expect(scale.getOptions().domain).toEqual(['一月', '二月', 3, '四月', 5]);
    expect(scale.type).toEqual('cat');
    expect(scale.getOptions().range[0]).toEqual(0);
    expect(scale.getOptions().range[1]).toEqual(4);
  });

  it('translate func', function () {
    expect(scale.map('二月')).toEqual(1);
    expect(scale.map(1)).toEqual(1);
    expect(scale.map(3)).toEqual(2);
    expect(scale.map('六月')).toBeNaN();
  });

  it('map func', function () {
    expect(scale.map('二月')).toEqual(0.25);
    expect(scale.map(1)).toEqual(0.25);
    expect(scale.map(3)).toEqual(0.5);
    expect(scale.map(2.5)).toEqual(0.625);
    expect(scale.map('六月')).toBeNaN();
  });

  it('getText func', function () {
    expect(scale.getText('二月')).toEqual('二月');
    scale.update({
      formatter: (text) => `${text}_1`,
    });
    expect(scale.getText('二月')).toEqual('二月_1');
    expect(scale.getText(1)).toEqual('二月_1');
  });

  it('invert func', function () {
    expect(scale.invert(0)).toEqual('一月');
    expect(scale.invert(0.5)).toEqual(3);
    expect(scale.invert(1)).toEqual(5);
    expect(scale.invert(0.51)).toEqual(3);
    expect(scale.invert(-1)).toEqual(NaN);
  });

  it('getTicks func', function () {
    const ticks = scale.getTicks();
    expect(ticks.length).toEqual(scale.getOptions().domain.length);

    expect(ticks[0].value).toEqual(0);
    expect(ticks[ticks.length - 1].value).toEqual(1);
  });

  it('clone func', function () {
    const n1 = scale.clone();
    expect(n1.map('一月')).toEqual(0);
    expect(n1.map(3)).toEqual(0.5);
    expect(n1.map(5)).toEqual(1);

    expect(scale.invert(0)).toEqual('一月');
    expect(scale.invert(0.5)).toEqual(3);
    expect(scale.invert(1)).toEqual(5);

    expect(n1.type).toEqual('cat');
  });

  it('change func', function () {
    scale.update({
      domain: ['一', '二', '三', '四', '五', '六'],
    });
    expect(scale.invert(0)).toEqual('一');
    expect(scale.invert(0.4)).toEqual('三');
    expect(scale.invert(1)).toEqual('六');
    expect(scale.getTicks().length).toEqual(6);
  });
});

describe.skip('category scale with specified range', function () {
  const scale = new ScaleDef({
    type: 'cat',
    domain: ['一月', '二月', '三月', '四月', '五月'],
    range: [0.1, 0.9],
  });

  it('config', function () {
    expect(scale.getOptions().range).toEqual([0.1, 0.9]);
  });

  it('map func', function () {
    const val = scale.map('二月');
    // 精度问题，计算结果是0.30000000000000004
    expect(parseFloat(val.toFixed(1))).toEqual(0.3);
    expect(scale.map('一月')).toEqual(0.1);
    expect(scale.map('五月')).toEqual(0.9);
  });

  it('invert func', function () {
    expect(scale.invert(0.1)).toEqual('一月');
    expect(scale.invert(0.5)).toEqual('三月');
    expect(scale.invert(0.6)).toEqual('四月');
    expect(scale.invert(0.9)).toEqual('五月');
  });
});

describe.skip('category scale multiple times', () => {
  const scale = new ScaleDef({
    type: 'cat',
    domain: ['A', 'B', 'C'],
  });

  it('1st time', () => {
    expect(scale.map('A')).toBe(0);
  });

  it('2nd time', () => {
    scale.update({
      range: [0.15, 0.85],
    })
    expect(scale.map('A')).toBe(0.15);
  });
});

describe.skip('category min, max', () => {
  it('0 value', () => {
    const scale = new ScaleDef({ type: 'cat', domain: [] });
    expect(scale.getOptions().range).toEqual([0, 0]);
  });

  it('1 value', () => {
    const scale = new ScaleDef({ type: 'cat', domain: ['A'] });
    expect(scale.getOptions().range).toEqual([0, 1]);
    expect(scale.map('A')).toEqual(0);
  });

  it('set min', () => {
    const scale = new ScaleDef({
      type: 'cat',
      domain: ['A', 'B', 'C'],
      min: 1,
    });
    expect(scale.getOptions().range).toBe([1, 2]);
    expect(scale.map('A')).toBe(-1);
    expect(scale.map('B')).toBe(0);
    expect(scale.map('C')).toBe(1);
    expect(isNumberEqual(scale.map(1.2), 0.2)).toBe(true);

    expect(scale.invert(0)).toBe('B');
    expect(scale.invert(1)).toBe('C');

    expect(scale.invert(2)).toBe(NaN);
    expect(scale.getTicks().length).toBe(2);
  });

  it('set min ,max', () => {
    const scale = new ScaleDef({
      type: 'cat',
      domain: ['A', 'B', 'C', 'D', 'E', 'F'],
      min: 1,
      max: 3,
    });
    expect(scale.getOptions().range).toBe([1, 3]);
    expect(scale.map('A')).toBe(-0.5);
    expect(scale.map('C')).toBe(0.5);
    expect(scale.map('E')).toBe(1.5);
    expect(scale.invert(-0.2)).toBe('B');
    expect(scale.invert(0)).toBe('B');
    expect(scale.invert(1)).toBe('D');
    expect(scale.invert(-1)).toBe(NaN);
    expect(scale.getTicks().length).toBe(3);
    scale.update({
      min: 0,
      max: 4,
    });
    expect(scale.getOptions().range).toBe([0, 4]);
    expect(scale.getTicks().length).toBe(5);
  });
});
