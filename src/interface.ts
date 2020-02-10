import { View } from './chart';
import { IShape } from './dependents';

/** G 的渲染类型 */
export type Renderer = 'svg' | 'canvas';

/** 数据的定义 */
export type Datum = Record<string, any>;
export type Data = Datum[];

/** 对象 */
export interface LooseObject {
  [key: string]: any;
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

export interface Size {
  readonly width: number;
  readonly height: number;
}

export interface RangePoint {
  readonly x?: number | number[];
  readonly y?: number | number[];
}

// 用户数据经过图形映射处理后的数据结构
export interface MappingDatum {
  /** raw data */
  _origin: Datum;
  /** the key points of the shape */
  points?: ShapeVertices;
  /** the key points of next shape */
  nextPoints?: ShapeVertices;
  /** value in the x direction */
  x?: number[] | number;
  /** value in the y direction */
  y?: number[] | number;
  color?: string;
  shape?: string | string[];
  size?: number;
}

// 绘制 Shape 需要的图形、样式、关键点等信息
export interface ShapeInfo {
  /** x 坐标 */
  x: number | number[];
  /** y 坐标 */
  y: number | number[];
  /** 映射的 shape 类型 */
  shape?: string | string[];
  /** size 映射值 */
  size?: number;
  /** 映射的颜色值 */
  color?: string;
  /** 用户设置的图形样式 */
  style?: LooseObject;
  /** 是否在极坐标下 */
  isInCircle?: boolean;
  /** 对应的原始数据记录 */
  data?: Datum | Data;
  /** 存储进行图形映射后的数据 */
  mappingData?: MappingDatum | MappingDatum[];
  /** 构成 shape 的关键点  */
  points?: ShapeVertices;
  /** 下一个数据集对应的关键点 */
  nextPoints?: ShapeVertices;
  /** Geometry.Text 需要 */
  text?: string;
  /** 数据是否发生层叠 */
  isStack?: boolean;
  /** 是否连接空值，对 Path Line Area 这三种 Geometry 生效 */
  connectNulls?: boolean;
  /** 默认的 shape 样式 */
  defaultStyle?: LooseObject;
}

/** 交互反馈的定义 */
export interface IAction {
  /**
   * 初始化
   */
  init();
  /**
   * 交互 action (反馈)的名称
   */
  name: string;
  /**
   * 上下文
   */
  context: IInteractionContext;
  /**
   * 销毁函数
   */
  destroy();
}

/** 交互上下文的接口定义 */
export interface IInteractionContext extends LooseObject {
  /** 事件对象 */
  event: LooseObject;
  /**
   * 当前的 view
   */
  view: View;
  /** 交互相关的 Actions */
  actions: IAction[];
  /**
   * 缓存属性，用于上下文传递信息
   * @param key 键名
   * @param value 值
   */
  cache(key: string, value?: any);
  /**
   * 获取 action
   * @param name - action 的名称
   * @returns 指定 name 的 Action
   */
  getAction(name): IAction;
  /**
   * 获取当前的点
   * @returns 返回当前的点
   */
  getCurrentPoint(): Point;
  /**
   * 获取当前的图形
   */
  getCurrentShape(): IShape;
  /**
   * 添加 action
   * @param action 指定交互 action
   */
  addAction(action: IAction);
  /**
   * 移除 action
   * @param action 移除的 action
   */
  removeAction(action: IAction);
  /**
   * 事件触发时是否在 view 内部
   */
  isInPlot();
  /**
   * 是否在组件的包围盒内
   * @param name 组件名，可省略
   */
  isInComponent(name?: string);
  /**
   * 是否在指定的图形内
   * @param name shape 的名称
   */
  isInShape(name);
  /**
   * 销毁
   */
  destroy();
}

// 用户配置的动画，属性均可选
export interface AnimateCfg {
  /** 动画缓动函数 */
  readonly easing?: string | AnimateEasingCallback;
  /** 动画执行函数 */
  readonly animation?: string;
  /** 动画执行时间 */
  readonly duration?: number | AnimateDurationCallback;
  /** 动画延迟时间 */
  readonly delay?: number | AnimateDelayCallback;
  /** 动画执行结束后的回调函数 */
  readonly callback?: () => any;
}

export type ActionCallback = (context: IInteractionContext) => void;
export type Padding = number[];
export type ViewPadding = number | number[] | 'auto';
export type Position = [number, number];
export type AttributeType = 'position' | 'size' | 'color' | 'shape';
export type ShapeVertices = RangePoint[] | Point[] | Point[][];
/** easing 的回调函数， 入参 data 为对应的原始数据记录 */
export type AnimateEasingCallback = (data: Datum) => string;
/** delay 的回调函数， 入参 data 为对应的原始数据记录 */
export type AnimateDelayCallback = (data: Datum) => number;
/** duration 的回调函数， 入参 data 为对应的原始数据记录 */
export type AnimateDurationCallback = (data: Datum) => number;
