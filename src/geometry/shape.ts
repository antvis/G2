/** @module Shape */
import * as Util from '@antv/util';

import { Coord } from '@antv/coord/lib/factory';
import Element from './element';

import { parsePathString } from '@antv/path-util';
import { convertNormalPath, convertPolarPath } from './util/path';

import { PointObject, ShapeDrawCFG } from '../interface';

/** 每条数据映射后的坐标点以及 size 数值，均为归一化数据 */
export interface ShapePointCfg {
  x: number | number[];
  y: number | number[];
  y0?: number;
  size?: number;
  _size?: number;
}

/** ShapeFactory 基类 */
const ShapeFactoryBase = {
  /** Shape 的主题配置 */
  // theme: null,
  /** 坐标系对象 */
  coord: null,
  /** 默认绘制的 Shape 类型 */
  defaultShapeType: null,

  // setTheme(theme: object) {
  //   this.theme = theme;
  // },
  setCoord(coord: Coord) {
    this.coord = coord;
  },
  /**
   * 获取 shape 的默认关键点
   * @override
   */
  getDefaultPoints() {
    return [];
  },

  /**
   * 获取 shape 绘制需要的关键点
   * @param shapeType shape 类型
   * @param shapePointCfg 每条数据映射后的坐标点以及 size 数值
   */
  getShapePoints(shapeType: string, shapePointCfg: ShapePointCfg) {
    const shape = this.getShape(shapeType);
    if (shape.getPoints) {
      return shape.getPoints(shapePointCfg);
    }

    return this.getDefaultPoints(shapePointCfg);
  },

  /**
   * 根据 shape 类型获取具体的 shape 实例
   * @param shapeType string shape 的类型
   * @returns
   */
  getShape(shapeType: string) {
    const shape = this[shapeType] || this[this.defaultShapeType];
    shape.coord = this.coord;

    return shape;
  },

  // TODO
  getMarker(shapeType: string, markerCfg: object) {
    const shape = this.getShape(shapeType);

    // TODO @simaqi
    if (shape.getMarker) {
      return shape.getMarker(markerCfg);
    }
  },

  /**
   * 绘制 shape
   * @param shapeType 绘制的 shape 类型
   * @param cfg 绘制 shape 需要的信息
   * @param element 容器
   */
  drawShape(shapeType: string, cfg: ShapeDrawCFG, element: Element) {
    // TODO: 完善 cfg 的类型定义
    const shape = this.getShape(shapeType);
    return shape.draw(cfg, element);
  },

  /**
   * 更新 shape
   * @param shapeType shape 类型
   * @param attrs 更新的图形属性配置
   * @param element 容器
   */
  updateShape(shapeType: string, cfg: ShapeDrawCFG, element: Element) {
    const shape = this.getShape(shapeType);

    shape.update(cfg, element);
  },

  /**
   * 设置 shape 状态
   * @param shapeType shape 类型
   * @param stateName 状态类型
   * @param stateStatus 状态是否开启
   */
  setState(shapeType: string, stateName: string, stateStatus: boolean, element: Element) {
    const shape = this.getShape(shapeType);
    shape.setState(stateName, stateStatus, element);
  },
};

/** Shape 基类 */
const Shape = {
  coord: null,
  name: null,
  // geometryName: null,
  /** shape 的主题配置 */
  // theme: null,
  /** shape 初始化的样式 */
  // originStyle: null,

  getCoord(): Coord {
    return this.coord;
  },

  /**
   * 将归一化的 path 转换成坐标系下的 path
   * @param path 归一化的路径
   * @param isLineToArc 是否转换成圆弧
   */
  parsePath(path: string, isLineToArc: boolean = true) {
    const coord = this.coord;
    let parsedPath = parsePathString(path);
    if (coord.isPolar && isLineToArc !== false) {
      parsedPath = convertPolarPath(coord, parsedPath);
    } else {
      parsedPath = convertNormalPath(coord, parsedPath);
    }
    return parsedPath;
  },

  /**
   * 将归一化的坐标转换成画布坐标
   * @param point 归一化的坐标点数据
   */
  parsePoint(point: PointObject) {
    const coord = this.coord;
    return coord.convertPoint(point);
  },

  /**
   * 0～1 points 转 画布 points
   * @param points 节点集合
   */
  parsePoints(points: PointObject[]) {
    const coord = this.coord;
    return points.map((point) => {
      return coord.convertPoint(point);
    });
  },

  /** 绘制 shape */
  draw(cfg: ShapeDrawCFG, element: Element) {},
  /** 更新 shape */
  update(cfg: ShapeDrawCFG, element: Element) {},
  destroy() {},
  getMarker(markerCfg: object) {},

  setState(stateName: string, stateStatus: boolean, element: Element) {
    const states = element.getStates(); // 获取当前的状态集合
    const gShape = element.get('shape');

    if (!gShape) {
      return;
    }

    const stateStyle = element.getStateStyle(stateName);
    if (stateStatus) {
      // 进行状态的叠加
      gShape.attr(stateStyle);
    } else {
      // 移除当前状态，依次叠加保留状态量的样式
      const originStyle = element.getOriginStyle();
      const currentStyle = Util.mix({}, originStyle);
      Util.each(states, (state) => {
        Util.mix(currentStyle, element.getStateStyle(state));
      });

      gShape.attr(currentStyle);
    }
  },
};

const ShapeFactoryMap = {};

/** 注册 ShapeFacroty 接口 */
export function registerShapeFactory(factoryName: string, cfg) {
  const className = Util.upperFirst(factoryName);
  const geomObj = {
    ...ShapeFactoryBase,
    ...cfg,
    name: factoryName,
  };
  ShapeFactoryMap[className] = geomObj;
  return geomObj;
}

/** 注册 Shape 接口 */
export function registerShape(factoryName: string, shapeType: string, cfg) {
  const className = Util.upperFirst(factoryName);
  const factory = ShapeFactoryMap[className];
  const shapeObj = {
    ...Shape,
    ...cfg,
    name: shapeType,
    // geometryName: factory.name,
    // theme: factory.theme,
  };
  factory[shapeType] = shapeObj;
  return shapeObj;
}

/** 获取 Geometry 对应的 shapeFactory */
export function getShapeFactory(factoryName: string) {
  const className = Util.upperFirst(factoryName);
  return ShapeFactoryMap[className];
}
