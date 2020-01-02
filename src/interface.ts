import { View } from './chart';
import { Coordinate, IGroup, IShape, PathCommand, ScaleConfig, ShapeAttrs } from './dependents';

/** G 的渲染类型 */
export type Renderer = 'svg' | 'canvas';

/** 数据的定义 */
export type Datum = Record<string, any>;
export type Data = Datum[];

/** 对象 */
export interface LooseObject {
  [key: string]: any;
}

/** 列定义配置项 */
export interface ScaleOption extends ScaleConfig {
  /** 声明数据类型  */
  type?: ScaleType;
  /**
   * 同步 scale
   * 我们会对所有做了 sync: boolean 达标的 scale 进行范围同步
   */
  sync?: boolean | string;
  /**
   * 只对 type: 'time' 的 scale 生效，强制显示最后的日期tick
   */
  showLast?: boolean;
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

export interface AnimateOption {
  /** chart 初始化渲染时的入场动画，false/null 表示关闭入场动画 */
  appear?: AnimateCfg | false | null;
  /** chart 发生更新时，新增元素的入场动画，false/null 表示关闭入场动画 */
  enter?: AnimateCfg | false | null;
  /** 更新动画配置，false/null 表示关闭更新动画 */
  update?: AnimateCfg | false | null;
  /** 销毁动画配置，false/null 表示关闭销毁动画 */
  leave?: AnimateCfg | false | null;
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

/** shape 关键点信息 */
export interface ShapePoint {
  /** 数据点映射后对应 x 的值 */
  readonly x: number | number[];
  /** 数据点映射后对应 y 的值 */
  readonly y?: number | number[];
  /** 数据在 y 方向的最小值 */
  readonly y0?: number;
  size?: number;
}

export interface ShapeMarkerCfg {
  /** 颜色 */
  color: string;
  /** 是否是极坐标 */
  isInPolar: boolean;
}

/** 图形 marker 的配置信息 */
export interface ShapeMarkerAttrs {
  /** marker 的形状 */
  symbol: string | ShapeMarkerSymbol;
  /** marker 的样式 */
  style: ShapeAttrs;
}

/** 注册 ShapeFactory 需要实现的接口 */
export interface RegisterShapeFactory {
  /** 默认的 shape 类型 */
  readonly defaultShapeType: string;
  /** 返回绘制 shape 所有的关键点集合 */
  readonly getDefaultPoints?: (pointInfo: ShapePoint) => Point[];
  /** 获取 shape 对应的缩略图配置 */
  readonly getMarker?: (shapeType: string, markerCfg: ShapeMarkerCfg) => ShapeMarkerAttrs;
  /** 创建具体的 G.Shape 实例 */
  readonly drawShape?: (shapeType: string, cfg: ShapeInfo, container: IGroup) => IShape | IGroup;
}

/** 注册具体 shape 需要实现的接口 */
export interface RegisterShape {
  /** 计算绘制需要的关键点，在注册具体的 shape 时由开发者自己定义 */
  readonly getPoints?: (pointInfo: ShapePoint) => Point[];
  /** 获取 shape 对应的缩略图样式配置，在注册具体的 shape 时由开发者自己定义 */
  readonly getMarker?: (markerCfg: ShapeMarkerCfg) => ShapeMarkerAttrs;
  /** 绘制 */
  readonly draw: (cfg: ShapeInfo, container: IGroup) => IShape | IGroup;
}

/** Shape 接口定义 */
export interface Shape extends RegisterShape {
  /** 坐标系对象 */
  coordinate: Coordinate;
  /** 工具函数，将 0～1 path 转化成实际画布 path */
  parsePath: (path: any, islineToArc: boolean) => PathCommand[];
  /** 工具函数，0～1 的坐标点转换成实际画布坐标点 */
  parsePoint: (point: Point) => Point;
  /** 工具函数，0～1 的坐标点集合转换成实际画布坐标点集合 */
  parsePoints: (points: Point[]) => Point[];
}

/** ShapeFactory 接口定义 */
export interface ShapeFactory extends RegisterShapeFactory {
  /** 工厂名 */
  geometryType: string;
  /** 坐标系对象 */
  coordinate: Coordinate;
  /** ShapeFactory 下所有的主题样式 */
  theme: LooseObject;
  /** 根据名称获取具体的 shape 对象 */
  getShape: (shapeType: string | string[]) => Shape;
  /** 获取构成 shape 的关键点 */
  getShapePoints: (shapeType: string | string[], pointInfo: ShapePoint) => Point[];
}

export type Padding = number | number[];
export type Position = [number, number];
export type AttributeType = 'position' | 'size' | 'color' | 'shape';
export type ScaleType = 'linear' | 'cat' | 'identity' | 'log' | 'pow' | 'time' | 'timeCat';
export type AdjustType = 'stack' | 'jitter' | 'dodge' | 'symmetric';
export type ShapeVertices = RangePoint[] | Point[] | Point[][];
export type ShapeMarkerSymbol = (x: number, y: number, r: number) => PathCommand[];

/** 交互反馈的定义 */
export interface IAction {
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
   * 销毁
   */
  destroy();
}

export type ActionCallback = (context: IInteractionContext) => void;
/** easing 的回调函数， 入参 data 为对应的原始数据记录 */
export type AnimateEasingCallback = (data: Datum) => string;
/** delay 的回调函数， 入参 data 为对应的原始数据记录 */
export type AnimateDelayCallback = (data: Datum) => number;
/** duration 的回调函数， 入参 data 为对应的原始数据记录 */
export type AnimateDurationCallback = (data: Datum) => number;
