import { BaseOptions as ScaleBaseOptions } from '@antv/scale';

export { ScaleBaseOptions };

// 支持的 scale 类型
export type ScaleTypes =
  | 'ordinal'
  | 'band'
  | 'point'
  | 'linear'
  | 'log'
  | 'pow'
  | 'sqrt'
  | 'time'
  | 'identity'
  | 'threshold'
  | 'quantize'
  | 'quantile'
  | 'timeCat'
  | 'cat'
  | 'category';

/**
 * G2.Scale 列定义的类型配置
 */
export type ScaleOption = Partial<{
  /**
   * 字段类型区分
   */
  type: ScaleTypes;

  /**
   * 同步 scale。
   *
   * @example
   * ```ts
   * chart.scale({
   *   x: { sync: true },
   *   y: { sync: true },
   *   x1: { sync: 'x1' },
   *   x2: { sync: 'x1' },
   * });
   * ```
   *
   * 通过以上配置，我们会分别对 x 和 y 两个字段，x1 和 x2 两个字段进行同步度量操作。
   */
  sync: boolean | string;

  /**
   * 字段 id
   */
  field: string;

  /**
   * 字段别名
   */
  alias: string;

  /**
   * 映射的定义域 min
   */
  min: number;

  /**
   * 映射的定义域 max
   */
  max: number;

  /**
   * 严格模式下的定义域最小值，设置后会强制 ticks 从最小值开始
   */
  minLimit: any;

  /**
   * 严格模式下的定义域最大值，设置后会强制 ticks 已最大值结束
   */
  maxLimit: any;

  /**
   * 定义域，如果没有配置 min && max，则将定义域设为它。从之前的 values 改名过来。
   */
  domain: any[];

  /**
   * 映射的输出范围，默认为是 [0, 1]
   */
  range: number[];

  /**
   * 只对 type: 'time' 的 scale 生效，强制显示最后的日期 tick。
   */
  showLast: boolean;

  /**
   * 用于声明使用数据记录中的哪些字段来组成一条数据的唯一 id（如有多个字段，则使用 '-' 连接）。
   * 数据 id 用于标识 Element 图形元素，应用于 Geometry 中的图形元素 Element 更新。
   * 默认 G2 内部会有一套 ID 生成规则，如果不能满足用户需求，用户既可以使用该属性配置 id。
   * @example
   *
   * 下面的例子中，声明了将 'x' 和 'y' 字段的数值来作为每条数据记录的 id，即下面数据两条数据的 id 分别为：'1-23' 和 '2-2'。
   * ```ts
   * const data = [
   *   { x: 1, y: 23, z: 'a' },
   *   { x: 2, y: 2, z: 'b' },
   * ];
   *
   * chart.scale({
   *   x: { key: true },
   *   y: { key: true },
   * });
   * ```
   */
  key: boolean;

  /**
   * Log 类型有效，底数
   */
  base: number;
  /**
   * Pow 类型有效，指数
   */
  exponent: number;

  // tick相关配置
  /**
   *自动调整min、max
   */
  nice: boolean;

  /**
   * 用于指定tick，优先级最高
   */
  ticks: any[];

  /**
   * tick 间隔，只对分类型和时间型适用，优先级高于 tickCount
   */
  tickInterval: number;

  /**
   * tick 个数，默认值为 5
   */
  tickCount: number;

  /**
   * tick最小间隔，只对线型适用
   */
  minTickInterval: number;

  /**
   * ticks最大值，默认值为10
   */
  maxTickCount: number;
  /**
   * tick 格式化函数，会影响数据在坐标轴 axis、图例 legend、tooltip 上的显示
   */
  formatter: (v: any, k?: number) => any;

  /**
   * 计算 ticks 的算法
   */
  tickMethod: string;

  /**
   * 时间度量 time, timeCat 时有效
   */
  mask: string;
}>;
