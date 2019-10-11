import { Coordinate, IGroup, IShape } from '../dependents';
import { AdjustType, LooseObject, Point, ShapeDrawCFG } from '../interface';
import Element from './element';

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

/** 图形属性配置项定义，如 position({}) */
export interface AttributeOption {
  /** 映射的属性字段 */
  fields?: string[];
  /** 回调函数 */
  callback?: (...args) => any;
  /** 指定常量映射规则 */
  values?: any[];
}

/** 数据调整配置项定义，`adjust({})` */
export interface AdjustOption {
  /** 调整类型 */
  readonly type: AdjustType;
  /**
   * type 为 'dodge' 时生效，数值范围为 0 至 1，用于调整分组中各个柱子的间距
   */
  readonly marginRatio?: number;
  /**
   * type 为 'dodge' 时生效, 按照声明的字段进行分组
   */
  readonly dodgeBy?: string;
  /**
   * type 为 'stack' 时生效，控制层叠的顺序，默认是 true
   */
  readonly reverseOrder?: boolean;
}

/** `style({})` 样式配置定义 */
export interface StyleOption {
  /** 映射的字段 */
  readonly fields?: string[];
  /** 回调函数 */
  readonly callback?: (...args) => LooseObject;
  /** 图形样式配置 */
  readonly cfg?: LooseObject;
}

/** `tooltip({})` Tooltip 配置定义 */
export interface TooltipOption {
  /** 参与映射的字段 */
  readonly fields: string[];
  /** 回调函数 */
  readonly callback?: (...args) => LooseObject;
}

/** color() 图形属性回调函数定义 */
export type ColorAttrCallback = (...args) => string;
/** shape() 图形属性回调函数定义 */
export type ShapeAttrCallback = (...args) => string | any[];
/** size() 图形属性回调函数定义 */
export type SizeAttrCallback = (...args) => number;
/** tooltip() 接口回调函数定义 */
export type TooltipCallback = (...args) => LooseObject;
/** style() 接口回调函数定义 */
export type StyleCallback = (...args) => LooseObject;
