import {
  Identity,
  Linear,
  Log,
  Sqrt,
  Pow,
  Quantize,
  Quantile,
  Threshold,
  Ordinal,
  Time,
  Band,
  Point,
  Constant,
  ConstantOptions,
  IdentityOptions,
  LinearOptions,
  LogOptions,
  SqrtOptions,
  PowOptions,
  QuantileOptions,
  QuantizeOptions,
  ThresholdOptions,
  OrdinalOptions,
  TimeOptions,
  BandOptions,
  PointOptions,
  Interpolate,
  TickMethod,
} from '@antv/scale';

// 暴露出去的 scale
export type Scale =
  | Identity
  | Linear
  | Log
  | Sqrt
  | Pow
  | Quantile
  | Quantize
  | Threshold
  | Ordinal
  | Band
  | Point
  | Time
  | Constant;

// 暴露出去的 scale 的配置
export type ScaleOptions =
  | IdentityOptions
  | LinearOptions
  | LogOptions
  | SqrtOptions
  | PowOptions
  | QuantizeOptions
  | QuantileOptions
  | ThresholdOptions
  | OrdinalOptions
  | TimeOptions
  | BandOptions
  | PointOptions
  | ConstantOptions;

// 暴露出去的 scale 的类型
export type ScaleTypes =
  | 'ordinal'
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
  | 'category'
  | 'point'
  | 'band'
  | 'constant';

export type BuiltinTickMethod =
  | 'wilkinson-extended'
  | 'r-pretty'
  | 'd3-ticks'
  | 'strict-count'
  | 'd3-time'
  | 'd3-log';

export type Input = ScaleOptions['domain'][number];

export type Output = ScaleOptions['range'][number];

export type Tick = {
  /** 展示名 */
  text: string;
  /** 值域值 */
  value: Input;
  /** 定义域值 */
  tickValue: Output;
};

/**
 * G2.Scale 列定义的类型配置
 */
export type ScaleDefOptions = Partial<{
  /**
   * 比例尺的种类
   */
  type: ScaleTypes;

  /**
   * 是否同步比例尺的定义域
   */
  sync: boolean | string;

  /**
   * 字段别名，用于坐标轴和图例等的展示
   */
  alias: string;

  /**
   * 映射的定义域 min，优先级比 domain[0] 更高
   */
  min: number | Date;

  /**
   * 映射的定义域 max，优先级比 domain[1] 更高
   */
  max: number | Date;

  /**
   * 映射的定义域，如果没有配置 min && max，则将定义域设为它。从之前的 values 改名过来。
   */
  domain: Input[];

  /**
   * 映射的输出范围，默认为是 [0, 1]
   */
  range: Output[];

  /**
   * 是否用该字段的作为数据 id 的一部分
   */
  key: boolean;

  /**
   * 底数，log 类型有效，
   */
  base: number;
  /**
   * 指数，pow 类型有效，
   */
  exponent: number;

  /**
   * 是否限制输出在值域的范围里面，对 Continuous 比例尺有效
   */
  clamp: boolean;

  /**
   * 数据预处理器，在映射之前对每一个数据进行转换
   */
  transform: (x: any) => Input;

  /**
   * 差值器，对 continuous 比例尺有效
   */
  interpolate: Interpolate;

  /*
   * 比较器，对 ordinal, band, point比例尺有效
   */
  compare: (a: string | number | Date, b: string | number | Date) => number;

  /**
   * 同时设置 paddingInner 和 paddingOuter，优先级最高，只对 Band 和 Point 比例尺有效
   */
  padding: number;

  /**
   * 条的对其方式，范围是: [0, 1]，默认是 0.5，只对 band 比例尺有效
   */
  align: number;

  /**
   * 条之间的间隔，范围是: [0, 1]，只对 band 和 point 比例尺有效
   */
  paddingInner: number;

  /**
   * 条和画布左右之间的间隔，范围是: [0, 1]，只对 band 和 point 比例尺有效
   */
  paddingOuter: number;

  /**
   * 是否是 UTC 时间，对 time 和 timeCat 比例尺有效
   */
  utc: boolean;

  /**
   * 是否对定义域进行 nice 操作，会改变 min 和 max
   */
  nice: boolean;

  /**
   * 用于显示指定生成的 ticks ，优先级最高
   */
  ticks: Input[];

  /**
   * tick 间隔，只对 time 比例尺有效，优先级高于 tickCount
   */
  tickInterval: number;

  /**
   * tick 个数，默认值为 5
   */
  tickCount: number;

  /**
   * tick 格式化函数，会影响数据在坐标轴 axis、图例 legend、tooltip 上的显示
   */
  formatter: (value: Input, index?: number) => any;

  /**
   * 计算 ticks 的方法
   */
  tickMethod: BuiltinTickMethod | TickMethod;

  /**
   * 时间度量 time, timeCat 时有效
   */
  mask: string;
}>;
