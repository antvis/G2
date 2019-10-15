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

/** 绘制 shape 时传入的信息 */
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
  data?: Datum;
  /** 进行图形映射后的数据记录 */
  origin?: Datum;
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

  /** 数据是否发生了调整 */
  isStack?: boolean;
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
  /** todo 销毁 */
  readonly destroy?: () => void;
  /** 响应状态量 */
  readonly setState?: (stateName: string, stateStatus: boolean, element: Element) => void;
}

/** Shape 接口定义 */
export interface Shape extends RegisterShape {
  /** 坐标系对象 */
  coordinate: Coordinate;
  /** 获取坐标系对象 */
  getCoordinate: () => Coordinate;
  /** 工具函数，将 0～1 path 转化成实际画布 path */
  parsePath: (path: any, islineToArc: boolean) => any[];
  /** 工具函数，0～1 的坐标点转换成实际画布坐标点 */
  parsePoint: (point: Point) => Point;
  /** 工具函数，0～1 的坐标点集合转换成实际画布坐标点集合 */
  parsePoints: (points: Point[]) => Point[];
}

/** ShapeFactory 接口定义 */
export interface ShapeFactory extends RegisterShapeFactory {
  /** 坐标系对象 */
  coordinate: Coordinate;
  /** 设置坐标系 */
  setCoordinate: (coord: Coordinate) => void;
  /** 根据名称获取具体的 shape 对象 */
  getShape: (shapeType: string | string[]) => Shape;
  /** 获取构成 shape 的关键点 */
  getShapePoints: (shapeType: string | string[], pointInfo: ShapePoint) => Point[];
  /** 销毁 shape */
  destroy: (shapeType: string) => void;
}

export type Padding = number | number[];
export type Position = [number, number];
export type AttributeType = 'position' | 'size' | 'color' | 'shape';
export type ScaleType = 'linear' | 'cat' | 'identity' | 'log' | 'pow' | 'time' | 'timeCat';
export type AdjustType = 'stack' | 'jitter' | 'dodge' | 'symmetric';
