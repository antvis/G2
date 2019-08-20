/**
 * @description Shape 的管理注册机制
 */
// @ts-ignore
import { Group, Shape } from '@antv/g';
import * as _ from '@antv/util';
import * as pathUtil from '@antv/path-util';
import { Coord } from '../../dependents';
import {
  PointObject,
  DataPointType,
  ShapeDrawCFG,
  ShapePointInfo,
  ShapeMarkerCfg,
  ShapeStateCfg,
} from '../../interface';
import { convertPolarPath, convertNormalPath } from '../util/path';
import Global from '../../global';

// 注册每一个 Element 对应的 shapeFactory 的配置
interface RegisterShapeFactoryCFG {
  defaultShapeType: string; // 默认的 shape 类型
  getDefaultPoints?: (pointInfo: ShapePointInfo) => PointObject[]; // 返回 shape 绘制默认的关键点
  getInactiveStyle?: (type: string, inactiveCfg: ShapeStateCfg) => DataPointType; // 返回 shape 置灰 inactive 的样式配置
  getActiveStyle?: (type: string, activeCfg: ShapeStateCfg) => DataPointType; // 返回 shape 激活后的样式配置
  getSelectedStyle?: (type: string, selectedCfg: ShapeStateCfg) => DataPointType; // 返回 shape 选中后的样式配置
  getMarkerStyle?: (type: string, markerCfg: ShapeMarkerCfg) => DataPointType; // 返回 shape 对应缩略图的配置
  drawShape?: (type: string | string[], cfg: ShapeDrawCFG, container: Group) => Shape; // 创建具体的 G.Shape 实例
}

// 注册具体的 shape 的配置
interface RegisterShapeCFG {
  draw: (cfg: ShapeDrawCFG, container: Group) => Shape;
  getPoints?: (pointInfo: ShapePointInfo) => PointObject[]; // 计算绘制需要的关键点，在注册具体的 shape 时由开发者自己定义
  getMarkerStyle?: (markerCfg: ShapeMarkerCfg) => DataPointType; // 获取 shape 对应的缩略图样式配置，在注册具体的 shape 时由开发者自己定义
  getInactiveStyle?: (inactiveCfg: ShapeStateCfg) => DataPointType; // 获取 shape inactive 时的样式配置，由开发者自己定义
  getActiveStyle?: (activeCfg: ShapeStateCfg) => DataPointType; // 获取 shape active 时的样式配置，在注册具体的 shape 时由开发者自己定义
  getSelectedStyle?: (selectedCfg: ShapeStateCfg) => DataPointType; // 获取 shape 被选中时的样式配置，在注册具体的 shape 时由开发者自己定义
}

export interface ShapeCFG extends RegisterShapeCFG {
  name?: string; // shape 名称
  _coord: Coord;
  getCoord: () => Coord;
  parsePath: (path: string, islineToArc: boolean) => any[];  // 0～1 path 转 画布 path
  parsePoint: (point: PointObject) => PointObject; // 0～1 point 转 画布 point
  parsePoints: (points: PointObject[]) => PointObject[]; // 0～1 points 转 画布 points
}

export interface ShapeFactoryCFG extends RegisterShapeFactoryCFG {
  _theme: DataPointType; // shape 主题
  _coord: Coord; // 坐标系对象
  setCoord: (coord: Coord) => void; // 设置坐标系
  setTheme: (theme: DataPointType) => void; // 设置主题
  getShape: (type: string | string[]) => ShapeCFG; // 根据名称获取具体的 shape 对象
  getShapePoints: (type: string | string[], pointInfo: ShapePointInfo) => PointObject[]; // 获取构成 shape 的关键点
  name?: string;
}

const ShapeBase = {
  _coord: null,
  getCoord() {
    return this._coord;
  },
  /**
   * 0～1 path 转 画布 path
   * @param path 路径
   * @param islineToArc 是否转换成圆弧
   * @return path 转换到画布坐标的path
   */
  parsePath(path: string, islineToArc: boolean): any[] {
    const coord = this._coord;
    let parsedPath = pathUtil.parsePathString(path);
    if (coord.isPolar && islineToArc !== false) {
      parsedPath = convertPolarPath(coord, parsedPath);
    } else {
      parsedPath = convertNormalPath(coord, parsedPath);
    }
    return parsedPath;
  },
  /**
   * 0～1 point 转 画布 point
   * @param  point 节点
   * @return point 转换后的点
   */
  parsePoint(point: PointObject) {
    const coord = this._coord;
    return coord.convertPoint(point);
  },
  /**
   * 0～1 points 转 画布 points
   * @param points 节点集合
   * @return points 转换后的多个节点
   */
  parsePoints(points: PointObject[]) {
    const coord = this._coord;
    return points.map((point) => {
      return coord.convertPoint(point);
    });
  },
  /**
   * @override
   * 创建具体的 G.Shape 实例，并将其添加至 container 绘图容器中，在注册具体的 shape 时由开发者自己定义
   */
  draw(/* cfg: ShapeDrawCFG, container: Group */) {},
};

const ShapeFactoryBase = {
  _theme: Global.theme.shape, // shape 主题
  _coord: null, // 坐标系对象
  _getShapeStyleByState(shapeName: string, shapeState: string, cfg: ShapeStateCfg) {
    const theme = this._theme;
    const elementName = this.name;

    if (theme && theme[elementName] && theme[elementName][shapeName]) {
      let style = theme[elementName][shapeName][shapeState];
      if (_.isFunction(style)) {
        style = style(cfg);
      }
      return style;
    }
  },
  defaultShapeType: null, // 默认的 shape 类型
  setCoord(coord: Coord) {
    this._coord = coord;
  },
  setTheme(theme: DataPointType) {
    this._theme = theme;
  },
  getShape(type: string | string[]) {
    const t = _.isArray(type) ? type[0] : type;

    const shape = this[<string>t] || this[this.defaultShapeType];
    shape._coord = this._coord;
    return shape;
  },
  getShapePoints(type: string | string[], pointInfo: ShapePointInfo) {
    const shape = this.getShape(type);
    return shape.getPoints ? shape.getPoints(pointInfo) : this.getDefaultPoints(pointInfo);
  },
  /**
   * @override
   */
  getDefaultPoints(/* pointInfo: ShapePointInfo */) {
    return [];
  },
  /**
   * @override
   * 获取每个 shape 对应的缩略图样式
   * @param type 图形类型
   * @param cfg shape 的绘图属性
   */
  getMarkerStyle(type: string, markerCfg: ShapeMarkerCfg) {
    const shape = this.getShape(type);
    if (shape.getMarkerStyle) {
      let markerStyle = shape.getMarkerStyle(markerCfg);
      const theme = this._theme;
      const shapeName = shape.name;
      const elementName = this.name;

      if (theme && theme[elementName] && theme[elementName][shapeName]) {
        markerStyle = _.mix({}, theme[elementName][shapeName].default, markerStyle);
      }
      return markerStyle;
    }
  },
  /**
   * @override
   * 获取对应 type 的 shape 的 inactive 样式
   * @param type shape 类型
   * @param cfg shape 的绘图属性
   */
  getInactiveStyle(type: string, inactiveCfg: ShapeStateCfg) {
    const shape = this.getShape(type);
    if (shape.getInactiveStyle) {
      return shape.getInactiveStyle(inactiveCfg);
    }

    return this._getShapeStyleByState(shape.name, 'inactive', inactiveCfg);
  },
  /**
   * @override
   * 获取对应 type 的 shape 的激活样式
   * @param type shape 类型
   * @param cfg shape 的绘图属性
   */
  getActiveStyle(type: string, activeCfg: ShapeStateCfg) {
    const shape = this.getShape(type);
    if (shape.getActiveStyle) {
      return shape.getActiveStyle(activeCfg);
    }

    return this._getShapeStyleByState(shape.name, 'active', activeCfg);
  },
  /**
   * @override
   * 获取对应 type 的 shape 的选中样式
   * @param type shape 类型
   * @param cfg shape 的绘图属性
   */
  getSelectedStyle(type: string, selectedCfg: ShapeStateCfg) {
    const shape = this.getShape(type);
    if (shape.getSelectedStyle) {
      return shape.getSelectedStyle(selectedCfg);
    }

    return this._getShapeStyleByState(shape.name, 'selected', selectedCfg);
  },
  /**
   * @override
   * 调用具体的 shape 的绘制方法
   */
  drawShape(type: string | string[], cfg: ShapeDrawCFG, container: Group) {
    const shape = this.getShape(type);

    // 应用 shape 主题配置
    const shapeName = shape.name;
    const theme = this._theme;
    const elementName = this.name;
    if (theme && theme[elementName] && theme[elementName][shapeName]) {
      const defaultShapeStyle = theme[elementName][shapeName].default;
      cfg.style = _.mix({}, defaultShapeStyle, cfg.style);
    }

    const gShape = shape.draw(cfg, container);
    if (gShape) {
      // TODO 支持 Group
      gShape.setSilent('origin', cfg.origin);
      gShape.id = cfg.yIndex ? cfg.id + cfg.yIndex : cfg.id;
      gShape.name = this.name;
    }
    return gShape;
  },
};

const ShapeFactoryMap = {};

// 注册 Element 获取图形的入口
export function registerShapeFactory(factoryName: string, cfg: RegisterShapeFactoryCFG): ShapeFactoryCFG {
  const className = _.upperFirst(factoryName);
  const geomObj = {
    ...ShapeFactoryBase,
    ...cfg,
    name: factoryName,
  };
  ShapeFactoryMap[className] = geomObj;
  return geomObj;
}

// 注册具体的 shape
export function registerShape(factoryName: string, shapeType: string, cfg: RegisterShapeCFG): ShapeCFG {
  const className = _.upperFirst(factoryName);
  const factory = ShapeFactoryMap[className];
  const shapeObj = {
    ...ShapeBase,
    ...cfg,
    name: shapeType,
  };
  factory[shapeType] = shapeObj;
  return shapeObj;
}

// 获取 Element 对应的 shapeFactory
export function getShapeFactory(factoryName: string): ShapeFactoryCFG {
  const className = _.upperFirst(factoryName);
  return ShapeFactoryMap[className];
}
