// TODO: scale 下个版本暴露 base 接口后修改为Base<any>;
export type Scale = any;

// TODO: scale 下个版本暴露 base 接口后修改为BaseOptions;
export type BaseOptions = any;

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
 *
 * TODO: @万木 增加 Scale 包装，需要对于 G2 来实现无感！代码整洁、架构上是否 OK？
 */
export type ScaleDefCfg = {
  /**
   * 字段类型区分
   */
  type?: ScaleTypes;

  /**
   * 字段名称
   */
  field?: string;

  /**
   * 字段别名
   */
  alias?: string;

  /**
   * 映射的定义域 min
   */
  min?: number;

  /**
   * 映射的定义域 min
   */
  max?: number;

  /**
   * 映射的定义域范围，默认为是 [0, 1]
   */
  range?: number[];

  /**
   * 字段的格式化方法
   */
  formatter?: (v: any) => string;

  /**
   * field 对应的枚举值
   */
  values?: any[];
};
