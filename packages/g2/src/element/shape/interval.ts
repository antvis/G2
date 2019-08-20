/**
 * @description Interval Element shapes
 */
import * as _ from '@antv/util';
import { Marker, Group } from '@antv/g';
import { registerShapeFactory, registerShape, ShapeFactoryCFG } from './base';
import { setFillStyle, setStrokeStyle } from '../util/shape';
import { getPointAngle } from '../util/path';
import { IntervalSymbols } from '../util/symbol';
import {
  ShapePointInfo,
  PointObject,
  ShapeDrawCFG,
  ShapeMarkerCfg,
} from '../../interface';

_.each(IntervalSymbols, (func, symbol) => {
  // Interval 中需要用到的 symbol
  // 使用 Marker 提供的静态方法注册进去
  // 用户有可能使用动态加载 Element，所以需要注册
  Marker.symbolsFactory.register(symbol, func);
});

// 获取填充图形的图形属性
function _getFillAttrs(cfg) {
  const attrs = cfg.style;
  setFillStyle(attrs, cfg);
  return attrs;
}

// 获取描边图形的图形属性
function _getLineAttrs(cfg) {
  const attrs = cfg.style;
  setStrokeStyle(attrs, cfg);
  return attrs;
}

// 根据数据点生成矩形的四个关键点
function _getRectPoints(cfg: ShapePointInfo, isPyramid = false) {
  const { x, y, y0, size } = cfg;
  // 有 4 种情况，
  // 1. x, y 都不是数组
  // 2. y是数组，x不是
  // 3. x是数组，y不是
  // 4. x, y 都是数组
  let yMin;
  let yMax;
  if (_.isArray(y)) {
    yMin = y[0];
    yMax = y[1];
  } else {
    yMin = y0;
    yMax = y;
  }

  let xMin;
  let xMax;
  if (_.isArray(x)) {
    xMin = x[0];
    xMax = x[1];
  } else {
    xMin = x - size / 2;
    xMax = x + size / 2;
  }

  const points = [
    { x: xMin, y: yMin },
    { x: xMin, y: yMax },
  ];

  if (isPyramid) { // 绘制尖底漏斗图
    // 金字塔漏斗图的关键点
    // 1
    // |   2
    // 0
    points.push({
      x: xMax,
      y: (yMax + yMin) / 2,
    });
  } else {
    // 矩形的四个关键点，结构如下（左下角顺时针连接）
    // 1 ---- 2
    // |      |
    // 0 ---- 3
    points.push(
      { x: xMax, y: yMax },
      { x: xMax, y: yMin },
    );
  }

  return points;
}
// 根据矩形关键点绘制 path
function _getRectPath(points) {
  const path = [];
  const firstPoint = points[0];
  path.push([ 'M', firstPoint.x, firstPoint.y ]);
  for (let i = 1, len = points.length; i < len; i++) {
    path.push([ 'L', points[i].x, points[i].y ]);
  }
  path.push([ 'L', firstPoint.x, firstPoint.y ]); // 需要闭合
  path.push([ 'z' ]);
  return path;
}

// 根据数据点生成 Line 的两个关键点
function _getLinePoints(cfg: ShapePointInfo): PointObject[] {
  const { x, y, y0 } = cfg;

  if (_.isArray(y)) {
    return y.map((yItem, idx) => {
      return {
        x: _.isArray(x) ? x[idx] : x,
        y: yItem,
      };
    });
  }

  return [
    { x: <number>x, y },
    { x: <number>x, y: y0 },
  ];
}

// 根据数据点生成 tick shape 的 6 个关键点
function _getTickPoints(cfg: ShapePointInfo): PointObject[] {
  const { x, y, y0, size } = cfg;
  let yMin;
  let yMax;
  if (_.isArray(y)) {
    yMin = y[0];
    yMax = y[1];
  } else {
    yMin = y0;
    yMax = y;
  }

  const xMax = <number>x + size / 2;
  const xMin = <number>x - size / 2;

  // tick 关键点顺序
  // 0 - 2 - 1
  //     |
  // 4 - 3 - 5
  return [
    { x: xMin, y: yMax },
    { x: xMax, y: yMax },
    { x: <number>x, y: yMax },
    { x: <number>x, y: yMin },
    { x: xMin, y: yMin },
    { x: xMax, y: yMin },
  ];
}

// 根据 tick 关键点绘制 path
function _getTickPath(points) {
  return [
    [ 'M', points[0].x, points[0].y ],
    [ 'L', points[1].x, points[1].y ],
    [ 'M', points[2].x, points[2].y ],
    [ 'L', points[3].x, points[3].y ],
    [ 'M', points[4].x, points[4].y ],
    [ 'L', points[5].x, points[5].y ],
  ];
}

// 根据关键点绘制漏斗图的 path
function _getFunnelPath(cfg, isFunnel: boolean) {
  const path = [];
  const { points, nextPoints } = cfg;
  if (!_.isNil(nextPoints)) {
    path.push(
      [ 'M', points[0].x, points[0].y ],
      [ 'L', points[1].x, points[1].y ],
      [ 'L', nextPoints[1].x, nextPoints[1].y ],
      [ 'L', nextPoints[0].x, nextPoints[0].y ],
      [ 'Z' ],
    );
  } else if (isFunnel) {
    path.push(
      [ 'M', points[0].x, points[0].y ],
      [ 'L', points[1].x, points[1].y ],
      [ 'L', points[2].x, points[2].y ],
      [ 'L', points[3].x, points[3].y ],
      [ 'Z' ],
    );
  } else {
    path.push(
      [ 'M', points[0].x, points[0].y ],
      [ 'L', points[1].x, points[1].y ],
      [ 'L', points[2].x, points[2].y ],
      // [ 'L', points[2].x, points[2].y ],
      [ 'Z' ],
    );
  }

  return path;
}

function _getThetaAngle(point, coord) {
  let startAngle;
  let endAngle;
  let startPoint;
  let endPoint;

  if (!_.isArray(point.x) && _.isArray(point.y)) { // 如果x是一个值，y是数组，将x转成数组
    point.x = [ point.x, point.x ];
  }
  if (_.isArray(point.x)) {
    startPoint = {
      x: point.x[0],
      y: point.y[0],
    };
    endPoint = {
      x: point.x[1],
      y: point.y[1],
    };
    startAngle = getPointAngle(coord, startPoint);
    endAngle = getPointAngle(coord, endPoint);
    if (endAngle <= startAngle) { // 考虑占比百分百的情形
      endAngle = endAngle + Math.PI * 2;
    }
  } else {
    endPoint = point;
    startAngle = coord.startAngle;
    endAngle = getPointAngle(coord, endPoint);
  }
  return {
    startAngle,
    endAngle,
  };
}

const IntervalShapeFactory: ShapeFactoryCFG = registerShapeFactory('interval', {
  defaultShapeType: 'rect',
  getDefaultPoints(pointInfo: ShapePointInfo): PointObject[] {
    return _getRectPoints(pointInfo);
  },
});

// 默认 rect
registerShape('interval', 'rect', {
  draw(cfg: ShapeDrawCFG, container: Group) {
    const attrs = _getFillAttrs(cfg);
    let path = _getRectPath(cfg.points);
    path = this.parsePath(path);

    return container.addShape('path', {
      attrs: {
        ...attrs,
        path,
      },
    });
  },
  getMarkerStyle(markerCfg: ShapeMarkerCfg) {
    const isInCircle = markerCfg.isInCircle;
    const markerStyle = {
      symbol: isInCircle ? 'circle' : 'square',
      radius: isInCircle ? 4.5 : 4,
    };
    setFillStyle(markerStyle, markerCfg);

    return markerStyle;
  },
});

// 描边矩形
registerShape('interval', 'hollowInterval', {
  draw(cfg: ShapeDrawCFG, container: Group) {
    const attrs = _getLineAttrs(cfg);
    let path = _getRectPath(cfg.points);
    path = this.parsePath(path);

    return container.addShape('path', {
      attrs: {
        ...attrs,
        path,
      },
    });
  },
  getMarkerStyle(markerCfg: ShapeMarkerCfg) {
    const isInCircle = markerCfg.isInCircle;
    const markerStyle = {
      symbol: isInCircle ? 'circle' : 'square',
      radius: isInCircle ? 4.5 : 4,
    };
    setStrokeStyle(markerStyle, markerCfg);
    return markerStyle;
  },
});

// 直线柱图
registerShape('interval', 'line', {
  getPoints(pointInfo: ShapePointInfo) {
    return _getLinePoints(pointInfo);
  },
  draw(cfg: ShapeDrawCFG, container: Group) {
    const attrs = _getLineAttrs(cfg);
    attrs.lineWidth = cfg.size || 1;
    let path = _getRectPath(cfg.points);
    path = this.parsePath(path);

    return container.addShape('path', {
      attrs: {
        ...attrs,
        path,
      },
    });
  },
  getMarkerStyle(markerCfg: ShapeMarkerCfg) {
    const markerStyle = {
      symbol: 'line',
      radius: 5,
    };
    setStrokeStyle(markerStyle, markerCfg);
    return markerStyle;
  },
});

// I 形柱状图
registerShape('interval', 'tick', {
  getPoints(pointInfo: ShapePointInfo) {
    return _getTickPoints(pointInfo);
  },
  draw(cfg: ShapeDrawCFG, container: Group) {
    const attrs = _getLineAttrs(cfg);
    let path = _getTickPath(cfg.points);
    path = this.parsePath(path);

    return container.addShape('path', {
      attrs: {
        ...attrs,
        path,
      },
    });
  },
  getMarkerStyle(markerCfg: ShapeMarkerCfg) {
    const markerStyle = {
      symbol: 'tick',
      radius: 5,
    };
    setStrokeStyle(markerStyle, markerCfg);
    return markerStyle;
  },
});

// 漏斗图
registerShape('interval', 'funnel', {
  getPoints(pointInfo: ShapePointInfo) {
    pointInfo.size = pointInfo.size * 2; // 漏斗图的 size 是柱状图的两倍
    return _getRectPoints(pointInfo);
  },
  draw(cfg: ShapeDrawCFG, container: Group) {
    const attrs = _getFillAttrs(cfg);
    let path = _getFunnelPath(cfg, true);
    path = this.parsePath(path);
    return container.addShape('path', {
      attrs: {
        ...attrs,
        path,
      },
    });
  },
  getMarkerStyle(markerCfg: ShapeMarkerCfg) {
    const markerStyle = {
      symbol: 'square',
      radius: 4,
    };
    setFillStyle(markerStyle, markerCfg);
    return markerStyle;
  },
});

// 金字塔图，即尖底漏斗图
registerShape('interval', 'pyramid', {
  getPoints(pointInfo: ShapePointInfo) {
    pointInfo.size = pointInfo.size * 2; // 漏斗图的 size 是柱状图的两倍
    return _getRectPoints(pointInfo, true);
  },
  draw(cfg: ShapeDrawCFG, container: Group) {
    const attrs = _getFillAttrs(cfg);
    let path = _getFunnelPath(cfg, false);
    path = this.parsePath(path);

    return container.addShape('path', {
      attrs: {
        ...attrs,
        path,
      },
    });
  },
  getMarkerStyle(markerCfg: ShapeMarkerCfg) {
    const markerStyle = {
      symbol: 'square',
      radius: 4,
    };
    setFillStyle(markerStyle, markerCfg);
    return markerStyle;
  },
});

// TODO：top-line 这个 shape 后续是否可以直接由上层业务自己去封装
// 带顶部描边的柱状图，用于满足业务视觉上对层叠柱状图以及直方图描边的需求
registerShape('interval', 'top-line', {
  draw(cfg: ShapeDrawCFG, container: Group) {
    const attrs = _.mix({}, _getFillAttrs(cfg));
    const { style, points } = cfg;

    let rectPath = _getRectPath(points);
    rectPath = this.parsePath(rectPath);
    delete attrs.stroke; // 不允许为柱子描边

    const rectShape = container.addShape('path', {
      attrs: {
        ...attrs,
        zIndex: 0,
        path: rectPath,
      },
    });

    // 绘制 top line
    const topLinePath = [
      [ 'M', points[1].x, points[1].y ],
      [ 'L', points[2].x, points[2].y ],
    ];
    container.addShape('path', {
      zIndex: 1,
      attrs: {
        stroke: style.stroke || 'white',
        lineWidth: style.lineWidth || 1,
        path: this.parsePath(topLinePath),
      },
    });

    return rectShape;
  },
  getMarkerStyle(markerCfg: ShapeMarkerCfg) {
    const isInCircle = markerCfg.isInCircle;
    const markerStyle = {
      symbol: isInCircle ? 'circle' : 'square',
      radius: isInCircle ? 4.5 : 4,
    };
    setFillStyle(markerStyle, markerCfg);
    return markerStyle;
  },
});

export default IntervalShapeFactory;
