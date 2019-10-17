/** @module Shape */
import * as _ from '@antv/util';

import { parsePathString } from '@antv/path-util';
import { Coordinate } from '../../dependents';
import {
  LooseObject,
  Point,
  RegisterShape,
  RegisterShapeFactory,
  Shape,
  ShapeDrawCFG,
  ShapeFactory,
  ShapePoint,
} from '../../interface';
import { doAnimate } from '../animate/index';
import Element from '../element';
import { convertNormalPath, convertPolarPath } from './util/path';

/** ShapeFactory 基类 */
const ShapeFactoryBase = {
  /** 坐标系对象 */
  coordinate: null,
  /** 默认绘制的 Shape 类型 */
  defaultShapeType: null,

  setCoordinate(coordinate: Coordinate) {
    this.coordinate = coordinate;
  },
  /**
   * 获取 shape 绘制需要的关键点
   * @todo shapePoints 的类型定义
   * @param shapeType shape 类型
   * @param shapePoint 每条数据映射后的坐标点以及 size 数值
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
  getShape(shapeType: string) {
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
   * 获取 shape 对应的缩略图
   * @override
   * @param shapeType shape 类型
   * @param markerCfg 样式配置
   * @returns
   */
  getMarker(shapeType: string, markerCfg: LooseObject) {
    const shape = this.getShape(shapeType);

    if (shape.getMarker) {
      return shape.getMarker(markerCfg);
    }
  },
  /**
   * 绘制 shape
   * @override
   * @param shapeType 绘制的 shape 类型
   * @param cfg 绘制 shape 需要的信息
   * @param element 容器
   */
  drawShape(shapeType: string, cfg: ShapeDrawCFG, element: Element) {
    const shape = this.getShape(shapeType);
    return shape.draw(cfg, element);
  },
  /**
   * 更新 shape
   * @override
   * @param shapeType shape 类型
   * @param attrs 更新的图形属性配置
   * @param element 容器
   */
  updateShape(shapeType: string, cfg: ShapeDrawCFG, element: Element) {
    const shape = this.getShape(shapeType);
    shape.update(cfg, element);
  },
  /**
   * 销毁 shape
   * @param shapeType shape 类型
   * @param cfg
   * @param element
   */
  destroyShape(shapeType: string, cfg: ShapeDrawCFG, element: Element) {
    const shape = this.getShape(shapeType);
    shape.destroy(cfg, element);
  },
  /**
   * 设置 shape 状态
   * @override
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
const ShapeBase = {
  coordinate: null,

  getCoordinate(): Coordinate {
    return this.coordinate;
  },
  /**
   * 将归一化的 path 转换成坐标系下的 path
   * @param path 归一化的路径
   * @param isLineToArc 是否转换成圆弧
   */
  parsePath(path: string, isLineToArc: boolean = true) {
    const coordinate = this.coordinate;
    let parsedPath = parsePathString(path);
    if (coordinate.isPolar && isLineToArc !== false) {
      parsedPath = convertPolarPath(coordinate, parsedPath);
    } else {
      parsedPath = convertNormalPath(coordinate, parsedPath);
    }
    return parsedPath;
  },
  /**
   * 将归一化的坐标转换成画布坐标
   * @param point 归一化的坐标点数据
   */
  parsePoint(point: Point): Point {
    const coordinate = this.coordinate;
    return coordinate.convertPoint(point);
  },
  /**
   * 0～1 points 转 画布 points
   * @param points 节点集合
   */
  parsePoints(points: Point[]): Point[] {
    const coordinate = this.coordinate;
    return points.map((point) => {
      return coordinate.convertPoint(point);
    });
  },
  /**
   * 绘制 shape
   * @override
   */
  draw(cfg: ShapeDrawCFG, element: Element) {},
  /**
   * 更新 shape
   * @override
   */
  update(cfg: ShapeDrawCFG, element: Element) {},
  /**
   * 销毁
   * @override
   */
  destroy(cfg: ShapeDrawCFG, element: Element) {
    const shape = element.shape;
    const animate = cfg.animate;
    if (animate) {
      // 指定了动画配置则执行动画
      doAnimate(shape, cfg);
    } else {
      // 否则直接销毁
      shape.remove(true);
    }
  },
  /**
   * 响应具体的状态量
   * @override
   * @param stateName
   * @param stateStatus
   * @param element
   */
  setState(stateName: string, stateStatus: boolean, element: Element) {
    const states = element.getStates(); // 获取当前的状态集合
    const gShape = element.shape; // 默认 element 都只包含一个 shape，如果是 group 的场景用户自己定义 setState 方法

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
      const currentStyle = {
        ...originStyle,
      };
      _.each(states, (state) => {
        _.mix(currentStyle, element.getStateStyle(state));
      });
      _.each(stateStyle, (value, attr) => {
        if (!currentStyle.hasOwnProperty(attr)) {
          currentStyle[attr] = null;
        }
      });

      gShape.attr(currentStyle);
    }
  },
};

const ShapeFactoryMap = {};

/** 注册 ShapeFacroty 接口 */
export function registerShapeFactory(factoryName: string, cfg: RegisterShapeFactory): ShapeFactory {
  const className = _.upperFirst(factoryName);
  const geomObj = {
    ...ShapeFactoryBase,
    ...cfg,
    geometryType: factoryName,
  };
  ShapeFactoryMap[className] = geomObj;
  return geomObj;
}

/** 注册 Shape 接口 */
export function registerShape(factoryName: string, shapeType: string, cfg: RegisterShape): Shape {
  const className = _.upperFirst(factoryName);
  const factory = ShapeFactoryMap[className];
  const shapeObj = {
    ...ShapeBase,
    ...cfg,
  };
  factory[shapeType] = shapeObj;
  return shapeObj;
}

/** 获取 Geometry 对应的 shapeFactory */
export function getShapeFactory(factoryName: string): ShapeFactory {
  const className = _.upperFirst(factoryName);
  return ShapeFactoryMap[className];
}
