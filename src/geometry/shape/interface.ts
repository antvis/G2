import { Coordinate, IGroup, IShape, PathCommand, ShapeAttrs } from '../../dependents';
import { LooseObject, Point, ShapeInfo } from '../../interface';

export interface ShapeMarkerCfg {
  /** 颜色。 */
  color: string;
  /** 是否是极坐标。 */
  isInPolar: boolean;
}

/** 图形 marker 的配置信息。 */
export interface ShapeMarkerAttrs {
  /** marker 的形状。 */
  symbol: string | ShapeMarkerSymbol;
  /** marker 的样式。 */
  style: ShapeAttrs;
}

/** shape 关键点信息 */
export interface ShapePoint {
  /** 数据点映射后对应 x 的值。 */
  readonly x: number | number[];
  /** 数据点映射后对应 y 的值。 */
  readonly y?: number | number[];
  /** 数据在 y 方向的最小值。 */
  readonly y0?: number;
  size?: number;
}


/** 注册 ShapeFactory 需要实现的接口。 */
export interface RegisterShapeFactory {
  /** 默认的 shape 类型。 */
  readonly defaultShapeType: string;
  /** 返回绘制 shape 所有的关键点集合。 */
  readonly getDefaultPoints?: (pointInfo: ShapePoint) => Point[];
  /** 获取 shape 对应的缩略图配置。 */
  readonly getMarker?: (shapeType: string, markerCfg: ShapeMarkerCfg) => ShapeMarkerAttrs;
  /** 创建具体的 G.Shape 实例。 */
  readonly drawShape?: (shapeType: string, cfg: ShapeInfo, container: IGroup) => IShape | IGroup;
}

/** 注册具体 shape 需要实现的接口。 */
export interface RegisterShape {
  /** 计算绘制需要的关键点，在注册具体的 shape 时由开发者自己定义。 */
  readonly getPoints?: (pointInfo: ShapePoint) => Point[];
  /** 获取 shape 对应的缩略图样式配置，在注册具体的 shape 时由开发者自己定义。 */
  readonly getMarker?: (markerCfg: ShapeMarkerCfg) => ShapeMarkerAttrs;
  /** 绘制函数。 */
  readonly draw: (cfg: ShapeInfo, container: IGroup) => IShape | IGroup | void;
}

/** Shape 接口定义。 */
export interface Shape extends RegisterShape {
  /** 坐标系对象。 */
  coordinate: Coordinate;
  /** 工具函数，将 0～1 path 转化成实际画布 path。 */
  parsePath: (path: any) => PathCommand[];
  /** 工具函数，0～1 的坐标点转换成实际画布坐标点。 */
  parsePoint: (point: Point) => Point;
  /** 工具函数，0～1 的坐标点集合转换成实际画布坐标点集合。 */
  parsePoints: (points: Point[]) => Point[];
}

/** ShapeFactory 接口定义。 */
export interface ShapeFactory extends RegisterShapeFactory {
  /** 工厂名。 */
  geometryType: string;
  /** 坐标系对象。 */
  coordinate: Coordinate;
  /** ShapeFactory 下所有的主题样式。 */
  theme: LooseObject;
  /** 根据名称获取具体的 shape 对象。 */
  getShape: (shapeType: string | string[]) => Shape;
  /** 获取构成 shape 的关键点。 */
  getShapePoints: (shapeType: string | string[], pointInfo: ShapePoint) => Point[];
}

export type ShapeMarkerSymbol = (x: number, y: number, r: number) => PathCommand[];
