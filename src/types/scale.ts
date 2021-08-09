import { ScaleConfig, Scale } from '../visual/scale';

// scale 的类定义
export { Scale };

/** G2 支持的度量类型 */
export type ScaleType =
  | 'linear'
  | 'cat'
  | 'category'
  | 'identity'
  | 'log'
  | 'pow'
  | 'time'
  | 'timeCat'
  | 'quantize'
  | 'quantile';

/** 列定义配置项 */
export interface ScaleOptions extends ScaleConfig {
  /** 声明度量类型。  */
  type?: ScaleType;
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
  sync?: boolean | string;
  /**
   * 只对 type: 'time' 的 scale 生效，强制显示最后的日期 tick。
   */
  showLast?: boolean;
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
  key?: boolean;
}
