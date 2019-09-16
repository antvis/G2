/** 对象 */
export interface LooseObject {
  [key: string]: any;
}
/** 绘制 shape 时传入的信息 */
// TODO: 结构最后还需要梳理
export interface ShapeDrawCFG {
  /** 映射的颜色值 */
  color: string | null | undefined;
  /** 是否在极坐标下 */
  isInCircle: boolean | undefined;
  /** x 坐标 */
  x: number;
  /** y 坐标 */
  y: number | number[];
  /** 映射的 shape 类型 */
  shape: string | undefined | null;
  /** size 映射值 */
  size: number | undefined | null;
  /** 对应的原始数据记录 */
  origin: object;
  /** geometry 类型 */
  geomType?: string;
  /** 构成 shape 的关键点  */
  points?: Point[];
  /** 下一个数据集对应的关键点 */
  nextPoints?: Point[];

  splitedIndex?: number;
  text?: string | null;
  /** 样式 */
  style?: object | null;

  yIndex?: number;
  constraint?: Array<[number, number]>;

  /** area line 两类 Geometry 适用，当只有一个数据时是否以数据点的形式显示 */
  showSinglePoint?: boolean;
  /** area line 两类 Geometry 适用，是否连接空值 */
  connectNulls?: boolean;
}

/** 列定义配置项 */
export interface ScaleDef {
  /** 声明数据类型  */
  type?: ScaleType;
  /** 该数据字段的显示别名，一般用于将字段的英文名称转换成中文名 */
  alias?: string;
  /** 数据集 */
  values?: any[];
  /** 输出数据的范围，默认[0, 1]，格式为 [min, max]，min 和 max 均为 0 至 1 范围的数据 */
  range?: [number, number];
  /** 用于格式化坐标轴刻度点的文本显示，会影响数据在坐标轴 axis、图例 legend、tooltip 上的显示 */
  formatter?: (value: any, key?: number) => string;
  /** 用于指定坐标轴上刻度点的文本信息，当用户设置了 ticks 就会按照 ticks 的个数和文本来显示 */
  ticks?: any[];
  /** 坐标轴上刻度点的个数，默认值为 5 */
  tickCount?: number;

  /**
   * type: 'cat' | 'time' 生效
   * 不建议使用，优先级高于tickCount，可以强制设置 tick 分隔间隔
   * 'time' 类型时值为时间戳
   */
  tickInterval?: number;

  /** type: 'linear' 生效，设置最小值 */
  min?: number;
  /** type: 'linear' 生效，设置最大值 */
  max?: number;
  /** type: 'linear' 生效，默认为 true，用于优化数值范围，使绘制的坐标轴刻度线均匀分布 */
  nice?: true;

  /** type: 'pow' 生效，指数，默认值为 1 */
  exponent?: number;

  /** type: 'log' 生效，对数底数，默认值为 10 */
  base?: number;

  /** type: 'time' 生效，强制显示最后的日期tick */
  showLast?: boolean;
}

export interface ScaleOption {
  [key: string]: ScaleDef;
}

/**
 * 画布范围的类型定
 */
export interface Region {
  readonly start: Point;
  readonly end: Point;
}

/**
 * 一个点位置
 */
export interface Point {
  readonly x: number;
  readonly y: number;
}

export type Padding = number | number[];
export type Position = [number, number];
export type AttributType = 'position' | 'size' | 'color' | 'shape';
export type ScaleType = 'linear' | 'cat' | 'identity' | 'log' | 'pow' | 'time' | 'timeCat';
export type AdjustType = 'stack' | 'jitter' | 'dodge' | 'symmetric';
