/**
 * 1. Geometry 进行数据处理之后
 * 2. 将分组数据映射成 Element
 * 3. Element 对自己包含的数据，调用对应的 shape 进行具体绘制（转化成 G API）
 */
import { get, deepMix } from '@antv/util';
import { parsePathString } from '@antv/path-util';
import { RegisterShape, RegisterShapeFactory, ShapeRenderer, ShapeFactory } from '../types/factory';
import { PlainObject, Point } from '../types/common';
import { PathCommand, Shape } from '../types/g';
import { ShapePoint, ShapeMarkerCfg, ShapeMarkerAttrs, ShapeInfo } from '../types/geometry';
import { convertPolarPath, convertNormalPath } from '../util/path';

/**
 * SHAPE_FACTORY 基础方法
 */
const SHAPE_FACTORY_BASE = {
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
  getDefaultStyle(geometryTheme: PlainObject): PlainObject {
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
  drawShape(shapeType: string, cfg: ShapeInfo, container: Shape): Shape {
    const shape = this.getShape(shapeType);
    return shape.draw(cfg, container);
  },
};

/**
 * SHAPE_BASE 基础方法
 */
const SHAPE_BASE = {
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
  draw(cfg: ShapeInfo, container: Shape) {},
};

/**
 * 所有的 shapeFactory
 */
const SHAPE_FACTORY_MAP = new Map<string, ShapeFactory>();

/**
 * 所有的 shapeRenderer
 */
const SHAPE_RENDERER_MAP = new Map<string, ShapeRenderer>();

/**
 * 注册自定义的 shapeFactory，理论上是每一个 geometry 一个 factor
 * @param shapeFactoryType
 * @param cfg
 * @returns
 */
export function registerShapeFactory(shapeFactoryType: string, cfg: RegisterShapeFactory) {
  const shapeFactory = shapeFactoryType.toLowerCase();

  const factory = {
    ...SHAPE_FACTORY_BASE,
    ...cfg,
    geometryType: shapeFactory,
  };

  SHAPE_FACTORY_MAP.set(shapeFactory, factory);

  return factory;
}

/**
 * 获取 shapeFactory
 * @param shapeFactoryType
 */
export function getFactory(shapeFactoryType: string) {
  return SHAPE_FACTORY_MAP.get(shapeFactoryType.toLowerCase());
}

/**
 * 注册一个自定义 shape 图形。开发者进行自定义图形的顶级 API
 * @param shapeFactoryType
 * @param shapeType
 * @param cfg
 */
export function registerShape(shapeFactoryType: string, shapeType: string, cfg: RegisterShape) {
  // 兼容大小写
  const key = `${shapeFactoryType}-${shapeType}`.toLowerCase();
  // 合并基础方法，然后放入到池子中
  const renderer = {
    ...SHAPE_BASE,
    ...cfg,
  };

  SHAPE_RENDERER_MAP.set(key, renderer);

  return renderer;
}

/**
 * 获取 shape renderer
 * @param shapeFactoryType
 * @param shapeType
 * @returns
 */
export function getShape(shapeFactoryType: string, shapeType: string) {
  const key = `${shapeFactoryType}-${shapeType}`.toLowerCase();
  return SHAPE_RENDERER_MAP.get(key);
}
