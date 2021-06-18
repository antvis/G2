/**
 * 1. Geometry 进行数据处理之后
 * 2. 将分组数据映射成 Element
 * 3. Element 对自己包含的数据，调用对应的 shape 进行具体绘制（转化成 G API）
 */
import { parsePathString } from '@antv/path-util';
import { RegisterShapeRenderer, ShapeRenderer } from '../types/factory';
import { Point } from '../types/common';
import { PathCommand, Shape } from '../types/g';
import { ShapeInfo } from '../types/geometry';
import { convertPolarPath, convertNormalPath } from '../util/path';

/**
 * SHAPE_BASE 基础方法
 */
const SHAPE_RENDERER_BASE: ShapeRenderer = {
  /** geometry 类型 */
  geometry: '',
  /** shape 的类型 */
  shapeType: '',
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
 * 所有的 shapeRenderer
 */
const SHAPE_RENDERER_MAP = new Map<string, ShapeRenderer>();

/** 生成 key 的逻辑，兼容大小写 */
function getMapKey(geometryType: string, shapeType: string): string {
  return `${geometryType}-${shapeType}`.toLowerCase();
}

/**
 * 注册一个自定义 shape 图形。开发者进行自定义图形的顶级 API
 * @param geometry
 * @param shapeType
 * @param cfg
 */
export function registerShape(geometry: string, shapeType: string, cfg: RegisterShapeRenderer) {
  // 合并基础方法，然后放入到池子中
  const renderer = {
    ...SHAPE_RENDERER_BASE,
    ...cfg,
    // 存入额外信息
    geometry,
    shapeType,
  };

  SHAPE_RENDERER_MAP.set(getMapKey(geometry, shapeType), renderer);

  return renderer;
}

/**
 * 获取 shape renderer
 * @param geometry
 * @param shapeType
 * @returns
 */
export function getShape(geometry: string, shapeType: string): ShapeRenderer {
  return SHAPE_RENDERER_MAP.get(getMapKey(geometry, shapeType));
}
