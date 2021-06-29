import { Identity, Log, rPretty, wilkinsonExtended, d3Ticks, Pow } from '@antv/scale';
import { ScaleDef } from '../../../../src/visual/scale/index';
import { ScaleDefOptions } from '../../../../src/types/scale';
import { strictCount } from '../../../../src/util/scale';

describe('linear scale', () => {
  it('should has expected defaults', () => {
    const scale = new ScaleDef();
    expect(scale.getOption('type')).toBe('identity');
    expect(scale.getTickValues()).toEqual([0, 0.2, 0.4, 0.6, 0.8, 1]);
  });

  it('should overrides defaults', () => {
    const options: ScaleDefOptions = {
      type: 'linear',
      base: 2,
    };
    const scale = new ScaleDef(options);
    expect(scale.getOption('type')).toEqual('linear');
    expect(scale.getOption('base')).toEqual(2);
  });

  it('should set field by constructor', () => {
    const scale = new ScaleDef({}, 'age');
    expect(scale.getField()).toBe('age');
  });

  it('should update options by update()', () => {
    const scale = new ScaleDef();
    const options: ScaleDefOptions = {
      type: 'log',
      base: 2,
    };
    scale.update(options);

    expect(scale.getOption('type')).toEqual('log');
    expect(scale.getOption('base')).toEqual(2);
  });

  it('should update valid scale type by update()', () => {
    const scale = new ScaleDef();
    scale.update({
      type: 'log',
    });

    // @ts-ignore
    expect(scale.scale).toBeInstanceOf(Log);

    scale.update({
      type: 'pow',
    });
    // @ts-ignore
    expect(scale.scale).toBeInstanceOf(Pow);

    scale.update({
      type: 'pow',
    });
    // @ts-ignore
    expect(scale.scale).toBeInstanceOf(Pow);
  });

  it('should ignore undefined type by update()', () => {
    const scale = new ScaleDef({
      type: 'log',
    });

    scale.update({
      domain: [0, 1],
    });
    // @ts-ignore
    expect(scale.scale).toBeInstanceOf(Log);
  });

  it('should use specified min and max for domain', () => {
    const scale = new ScaleDef({
      domain: [0, 30],
    });

    expect(scale.getOption('domain')).toEqual([0, 30]);

    scale.update({
      min: 10,
    });
    expect(scale.getOption('domain')).toEqual([10, 30]);

    scale.update({
      max: 20,
    });
    expect(scale.getOption('domain')).toEqual([10, 20]);
  });

  it('should update min and max by nice domain', () => {
    const scale = new ScaleDef({
      type: 'linear',
      min: 0.1,
      max: 9.9,
      nice: true,
    });

    expect(scale.getOption('min')).toBe(0);
    expect(scale.getOption('max')).toBe(10);
  });

  it('should return identity with invalid type name by update()', () => {
    const scale = new ScaleDef({
      type: 'log',
    });

    scale.update({
      domain: [0, 1],
      // @ts-ignore
      type: 'hello',
    });
    // @ts-ignore
    expect(scale.scale).toBeInstanceOf(Identity);
  });

  it('should returns options by getOptions()', () => {
    const scale = new ScaleDef({
      base: 2,
    });

    expect(scale.getOptions().domain).toEqual([0, 1]);
    expect(scale.getOptions().tickCount).toBe(5);
    expect(scale.getOptions().base).toBe(2);
  });

  it('should returns option by getOption(key)', () => {
    const scale = new ScaleDef({
      base: 2,
    });
    expect(scale.getOption('domain')).toEqual([0, 1]);
    expect(scale.getOption('base')).toBe(2);
  });

  // @万木 服务器时区到单测报错
  it.skip('should default format value to string by getText()', () => {
    const scale = new ScaleDef();

    expect(scale.getText(1)).toBe('1');
    expect(scale.getText(new Date('2020-02-10'))).toBe(
      'Mon Feb 10 2020 08:00:00 GMT+0800 (中国标准时间)',
    );
  });

  it('should use specified custom formatter by getText()', () => {
    const scale = new ScaleDef({
      formatter: (d) => `${(d as number) * 2}`,
    });

    expect(scale.getText(1)).toBe('2');
    expect(scale.getText(4)).toBe('8');
  });

  it('should clone a new scale with same and independent options', () => {
    const s1 = new ScaleDef();
    const s2 = s1.clone();
    expect(s2).toBeInstanceOf(ScaleDef);
    expect(s1.getOptions()).toEqual(s2.getOptions());
    expect(s1.getOptions()).not.toBe(s2.getOptions());
  });

  it('should get processed ticks by getTicks()', () => {
    const scale = new ScaleDef();
    expect(scale.getTicks()).toEqual([
      {
        text: '0',
        tickValue: 0,
        value: 0,
      },
      {
        text: '0.2',
        tickValue: 0.2,
        value: 0.2,
      },
      {
        text: '0.4',
        tickValue: 0.4,
        value: 0.4,
      },
      {
        text: '0.6',
        tickValue: 0.6,
        value: 0.6,
      },
      {
        text: '0.8',
        tickValue: 0.8,
        value: 0.8,
      },
      {
        text: '1',
        tickValue: 1,
        value: 1,
      },
    ]);
  });

  it('should only affects inner scale.domain and ticks with specified transform', () => {
    const scale = new ScaleDef({
      type: 'linear',
      domain: [0, 0.5],
      transform: (d) => d * 2,
    });

    expect(scale.getOption('domain')).toEqual([0, 0.5]);
    // @ts-ignore
    expect(scale.scale.getOptions().domain).toEqual([0, 1]);
    expect(scale.getTickValues()).toEqual([0, 0.2, 0.4, 0.6, 0.8, 1]);
  });

  it('should only transform domain when domain or transformed specified', () => {
    const scale = new ScaleDef({
      transform: (d) => d * 2,
    });

    // @ts-ignore
    expect(scale.scale.getOptions().domain).toEqual([0, 2]);

    scale.update({
      range: [0, 1],
    });
    // @ts-ignore
    expect(scale.scale.getOptions().domain).toEqual([0, 2]);

    scale.update({
      domain: [0, 4],
    });
    // @ts-ignore
    expect(scale.scale.getOptions().domain).toEqual([0, 8]);

    scale.update({
      transform: (d) => d * 4,
    });
    // @ts-ignore
    expect(scale.scale.getOptions().domain).toEqual([0, 16]);
  });

  it('should transform min and max', () => {
    const scale = new ScaleDef({
      min: 3,
      max: 6,
      transform: (d) => d * 3,
    });
    expect(scale.getOption('domain')).toEqual([9, 18]);
  });

  it('should return specified tickValues', () => {
    const scale = new ScaleDef({
      tickMethod: () => [0, 1, 2, 3, 4],
      ticks: [100, 200, 300, 400],
    });

    expect(scale.getTickValues()).toEqual([100, 200, 300, 400]);
  });

  it('should return tickValues by specified function tickMethod', () => {
    const scale = new ScaleDef({
      tickMethod: (min, max, count) => {
        expect(min).toBe(0);
        expect(max).toBe(1);
        expect(count).toBe(5);
        return [0, 1, 2, 3, 4];
      },
    });

    expect(scale.getTickValues()).toEqual([0, 1, 2, 3, 4]);
  });

  it('should use d3Ticks as default tickMethod', () => {
    const scale = new ScaleDef();
    // @ts-ignore
    expect(scale.scale.getOptions().tickMethod).toBe(d3Ticks);
  });

  it('should use specified string tickMethod', () => {
    const scale = new ScaleDef({
      tickMethod: 'r-pretty',
    });
    // @ts-ignore
    expect(scale.scale.getOptions().tickMethod).toBe(rPretty);

    scale.update({
      tickMethod: 'wilkinson-extended',
    });
    // @ts-ignore
    expect(scale.scale.getOptions().tickMethod).toBe(wilkinsonExtended);

    scale.update({
      tickMethod: 'd3-ticks',
    });
    // @ts-ignore
    expect(scale.scale.getOptions().tickMethod).toBe(d3Ticks);

    scale.update({
      tickMethod: 'strict-count',
    });
    // @ts-ignore
    expect(scale.scale.getOptions().tickMethod).toBe(strictCount);
  });
});
