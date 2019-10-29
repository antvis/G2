import { Coordinate, IGroup, IShape, ScaleConfig } from './dependents';
import Element from './geometry/element';

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

export interface Size {
  readonly width: number;
  readonly height: number;
}

export interface RangePoint {
  readonly x: number | number[];
  readonly y: number | number[];
}

export interface AnimateCfg {
  /** 动画缓动函数 */
  readonly easing: string;
  /** 动画执行函数 */
  readonly animation: string;
  /** 动画执行时间 */
  readonly duration: number;
  /** 动画延迟时间 */
  readonly delay?: number;
  // TODO: 完善 callback 的类型定义
  /** 动画执行结束后的回调函数 */
  readonly callback?: (...args) => any;
}

export interface AnimateOption {
  /** 入场动画配置，false/null 表示关闭入场动画 */
  enter?: AnimateCfg | false | null;
  /** 更新动画配置，false/null 表示关闭更新动画 */
  update?: AnimateCfg | false | null;
  /** 销毁动画配置，false/null 表示关闭销毁动画 */
  leave?: AnimateCfg | false | null;
}

// 绘制 Shape 需要的图形、样式、关键点等信息
export interface ShapeInfo {
  /** x 坐标 */
  x: number;
  /** y 坐标 */
  y: number | number[];
  /** 映射的 shape 类型 */
  shape?: string | undefined | null;
  /** size 映射值 */
  size?: number | undefined | null;
  /** 映射的颜色值 */
  color?: string | null | undefined;
  /** 样式 */
  style?: LooseObject | null;
  /** 是否在极坐标下 */
  isInCircle?: boolean | undefined;
  /** 对应的原始数据记录 */
  data?: Datum | Data;
  /** 进行图形映射后的数据记录 */
  origin?: Datum;
  /** 构成 shape 的关键点  */
  points?: ShapeVertices;
  /** 下一个数据集对应的关键点 */
  nextPoints?: ShapeVertices;
  /** Geometry.Text 需要 */
  text?: string | null;
  /** 数据是否发生层叠 */
  isStack?: boolean;
  /** 是否连接空值，对 Path Line Area 这三种 Geometry 生效 */
  connectNulls?: boolean;
}

/** 自定义 Shape 每个接口的 cfg 类型 */
export interface ShapeDrawCFG extends ShapeInfo {
  animate?: AnimateCfg;
}

/** shape 关键点信息 */
export interface ShapePoint {
  readonly x: number | number[];
  readonly y: number | number[];
  readonly y0?: number;
  size?: number;
}

// Shape Module start
/** 注册 ShapeFactory 需要实现的接口 */
export interface RegisterShapeFactory {
  /** 默认的 shape 类型 */
  readonly defaultShapeType: string;
  /** 返回绘制 shape 所有的关键点集合 */
  readonly getDefaultPoints?: (pointInfo: ShapePoint) => Point[];
  /** 获取 shape 对应的缩略图 */
  readonly getMarker?: (shapeType: string, markerCfg: LooseObject) => IShape | IGroup;
  /** 创建具体的 G.Shape 实例 */
  readonly drawShape?: (shapeType: string, cfg: ShapeDrawCFG, element: Element) => IShape | IGroup;
  /** 更新 shape */
  readonly updateShape?: (shapeType: string, cfg: ShapeDrawCFG, element: Element) => void;
  /** 销毁 shape */
  readonly destroyShape?: (shapeType: string, cfg: ShapeDrawCFG, element: Element) => void;
  /** 设置 shape 状态 */
  readonly setState?: (shapeType: string, stateName: string, stateStatus: boolean, element: Element) => void;
}

/** 注册具体 shape 需要实现的接口 */
export interface RegisterShape {
  /** 计算绘制需要的关键点，在注册具体的 shape 时由开发者自己定义 */
  readonly getPoints?: (pointInfo: ShapePoint) => Point[];
  /** 获取 shape 对应的缩略图样式配置，在注册具体的 shape 时由开发者自己定义 */
  readonly getMarker?: (markerCfg: LooseObject) => IShape | IGroup;
  /** 绘制 */
  readonly draw: (cfg: ShapeDrawCFG, container: Element) => IShape | IGroup;
  /** 更新 shape */
  readonly update: (cfg: ShapeDrawCFG, container: Element) => void;
  /** 销毁 */
  readonly destroy?: (cfg: ShapeDrawCFG, container: Element) => void;
  /** 响应状态量 */
  readonly setState?: (stateName: string, stateStatus: boolean, element: Element) => void;
}

/** Shape 接口定义 */
export interface Shape extends RegisterShape {
  /** 坐标系对象 */
  coordinate: Coordinate;
  /** 工具函数，将 0～1 path 转化成实际画布 path */
  parsePath: (path: any, islineToArc: boolean) => any[];
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
  /** 设置坐标系 */
  setCoordinate: (coord: Coordinate) => void;
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
