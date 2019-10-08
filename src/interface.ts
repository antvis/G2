import { ScaleConfig } from './dependents';

/** G 的渲染类型 */
export type Renderer = 'svg' | 'canvas';

/** 数据的定义 */
export type Datum = Record<string, any>;
export type Data = Datum[];

/** 对象 */
export interface LooseObject {
  [key: string]: any;
}
/** 绘制 shape 时传入的信息 */
// TODO: 结构最后还需要梳理
export interface ShapeDrawCFG {
  /** 映射的颜色值 */
  color?: string | null | undefined;
  /** 是否在极坐标下 */
  isInCircle?: boolean | undefined;
  /** x 坐标 */
  x: number;
  /** y 坐标 */
  y: number | number[];
  /** 映射的 shape 类型 */
  shape?: string | undefined | null;
  /** size 映射值 */
  size?: number | undefined | null;
  /** 对应的原始数据记录 */
  origin?: object;
  /** geometry 类型 */
  geomType?: string;
  /** 构成 shape 的关键点  */
  points?: Point[];
  /** 下一个数据集对应的关键点 */
  nextPoints?: Point[];

  splitedIndex?: number;
  text?: string | null;
  /** 样式 */
  style?: LooseObject | null;

  yIndex?: number;
  constraint?: Array<[number, number]>;

  /** area line 两类 Geometry 适用，当只有一个数据时是否以数据点的形式显示 */
  showSinglePoint?: boolean;
  /** area line 两类 Geometry 适用，是否连接空值 */
  connectNulls?: boolean;
}

/** 列定义配置项 */
export interface ScaleDef extends ScaleConfig {
  /** 声明数据类型  */
  type?: ScaleType;
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
export type AttributeType = 'position' | 'size' | 'color' | 'shape';
export type ScaleType = 'linear' | 'cat' | 'identity' | 'log' | 'pow' | 'time' | 'timeCat';
export type AdjustType = 'stack' | 'jitter' | 'dodge' | 'symmetric';
