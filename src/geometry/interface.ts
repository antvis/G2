import { Coordinate } from '@antv/coord';
import { Group as GGroup, Shape as GShape } from '@antv/g';
import { LooseObject, Point, ShapeDrawCFG } from '../interface';
import Element from './element';

/** shape 关键点信息 */
export interface ShapePoint {
  readonly x: number | number[];
  readonly y: number | number[];
  readonly y0?: number;
  readonly size?: number;
  readonly _size?: number;
}

// Shape Module start
/** 注册 ShapeFactory 需要实现的接口 */
export interface RegisterShapeFactory {
  /** 默认的 shape 类型 */
  readonly defaultShapeType: string;
  /** 返回绘制 shape 所有的关键点集合 */
  readonly getDefaultPoints?: (pointInfo: ShapePoint) => Point[];
  /** 获取 shape 对应的缩略图 */
  readonly getMarker?: (shapeType: string, markerCfg: LooseObject) => GShape | GGroup;
  /** 创建具体的 G.Shape 实例 */
  readonly drawShape?: (shapeType: string, cfg: ShapeDrawCFG, element: Element) => GShape | GGroup;
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
  readonly getMarker?: (markerCfg: LooseObject) => GShape | GGroup;
  /** 绘制 */
  readonly draw: (cfg: ShapeDrawCFG, container: Element) => GShape | GGroup;
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
  coord: Coordinate;
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
  coord: Coordinate;
  /** 设置坐标系 */
  setCoordinate: (coord: Coordinate) => void;
  /** 根据名称获取具体的 shape 对象 */
  getShape: (shapeType: string | string[]) => Shape;
  /** 获取构成 shape 的关键点 */
  getShapePoints: (shapeType: string | string[], pointInfo: ShapePoint) => Point[];
  /** 销毁 shape */
  destroy: (shapeType: string) => void;
}
