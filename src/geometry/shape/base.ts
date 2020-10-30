import { LooseObject } from '@antv/g-svg';
import { parsePathString } from '@antv/path-util';
import { deepMix, get, upperFirst } from '@antv/util';
import { IGroup, IShape, PathCommand } from '../../dependents';
import {
  Point,
  RegisterShape,
  RegisterShapeFactory,
  Shape,
  ShapeFactory,
  ShapeInfo,
  ShapeMarkerAttrs,
  ShapeMarkerCfg,
  ShapePoint,
} from '../../interface';

import { convertNormalPath, convertPolarPath } from './util/path';

/** ShapeFactory 基类 */
const ShapeFactoryBase = {
  /** 坐标系对象 */
  coordinate: null,
  /** 默认绘制的 Shape 类型 */
  defaultShapeType: null,
  /** 主题样式 */
  theme: null,
  /**
   * 获取 shape 绘制需要的关键点
   * @param shapeType shape 类型
   * @param shapePoint 每条数据映射后的坐标点以及 size 数值
   * @returns 图形关键点信息
   */
  getShapePoints(shapeType: string, shapePoint: ShapePoint) {
    const shape = this.getShape(shapeType);
    if (shape.getPoints) {
      return shape.getPoints(shapePoint);
    }

    return this.getDefaultPoints(shapePoint);
  },
  /**
   * 根据 shape 类型获取具体的 shape 实例
   * @param shapeType string shape 的类型
   * @returns
   */
  getShape(shapeType: string): Shape {
    const shape = this[shapeType] || this[this.defaultShapeType];
    shape.coordinate = this.coordinate;

    return shape;
  },
  /**
   * 获取 shape 的默认关键点
   * @override
   */
  getDefaultPoints() {
    return [];
  },
  /**
   * 获取 shape 的默认绘制样式 (内置的 shapeFactory 均有注册默认样式)
   */
  getDefaultStyle(geometryTheme: LooseObject): LooseObject {
    return get(geometryTheme, [this.defaultShapeType, 'default', 'style'], {});
  },
  /**
   * 获取 shape 对应的缩略图配置信息。
   * @param shapeType shape 类型
   * @param color 颜色
   * @param isInPolar 是否在极坐标系下
   * @returns 返回缩略图 marker 配置。
   */
  getMarker(shapeType: string, markerCfg: ShapeMarkerCfg): ShapeMarkerAttrs {
    let shape = this.getShape(shapeType);

    if (!shape.getMarker) {
      const defaultShapeType = this.defaultShapeType;
      shape = this.getShape(defaultShapeType);
    }

    const theme = this.theme;
    const shapeStyle = get(theme, [shapeType, 'default'], {});
    const markerStyle = shape.getMarker(markerCfg);

    return deepMix({}, shapeStyle, markerStyle);
  },
  /**
   * 绘制 shape
   * @override
   * @param shapeType 绘制的 shape 类型
   * @param cfg 绘制 shape 需要的信息
   * @param element Element 实例
   * @returns
   */
  drawShape(shapeType: string, cfg: ShapeInfo, container: IGroup): IShape | IGroup {
    const shape = this.getShape(shapeType);
    return shape.draw(cfg, container);
  },
};

/** Shape 基类 */
const ShapeBase = {
  /** 坐标系对象 */
  coordinate: null,
  /**
   * 将归一化的 path 转换成坐标系下的 path
   * @param path 归一化的路径
   * @returns
   */
  parsePath(path: string): PathCommand[] {
    const coordinate = this.coordinate;
    let parsedPath = parsePathString(path);
    if (coordinate.isPolar) {
      parsedPath = convertPolarPath(coordinate, parsedPath);
    } else {
      parsedPath = convertNormalPath(coordinate, parsedPath);
    }
    return parsedPath;
  },
  /**
   * 将归一化的坐标转换成画布坐标
   * @param point 归一化的坐标点数据
   * @returns
   */
  parsePoint(point: Point): Point {
    const coordinate = this.coordinate;
    return coordinate.convert(point);
  },
  /**
   * 0～1 points 转 画布 points
   * @param points 节点集合
   * @returns
   */
  parsePoints(points: Point[]): Point[] {
    const coordinate = this.coordinate;
    return points.map((point) => {
      return coordinate.convert(point);
    });
  },
  /**
   * 绘制 shape
   * @override
   */
  draw(cfg: ShapeInfo, container: IGroup) {},
};

const ShapeFactoryMap = {};

/**
 * 注册 ShapeFactory。
 * @param factoryName  ShapeFactory 名称，对应 Geometry 几何标记名称。
 * @param cfg 注册 ShapeFactory 需要覆写定义的属性。
 * @returns 返回 ShapeFactory 对象。
 */
export function registerShapeFactory(factoryName: string, cfg: RegisterShapeFactory): ShapeFactory {
  const className = upperFirst(factoryName);
  const geomObj = {
    ...ShapeFactoryBase,
    ...cfg,
    geometryType: factoryName,
  };
  ShapeFactoryMap[className] = geomObj;
  return geomObj;
}

/**
 * 注册 Shape。
 * @param factoryName 对应的 ShapeFactory 名称。
 * @param shapeType 注册的 shape 名称。
 * @param cfg 注册 Shape 需要覆写定义的属性。
 * @returns shape 返回注册的 shape 对象。
 */
export function registerShape(factoryName: string, shapeType: string, cfg: RegisterShape): Shape {
  const className = upperFirst(factoryName);
  const factory = ShapeFactoryMap[className];
  const shapeObj = {
    ...ShapeBase,
    ...cfg,
  };
  factory[shapeType] = shapeObj;
  return shapeObj;
}

/**
 * 获取 factoryName 对应的 shapeFactory
 * @param factoryName
 * @returns shape factory
 */
export function getShapeFactory(factoryName: string): ShapeFactory {
  const className = upperFirst(factoryName);
  return ShapeFactoryMap[className];
}
