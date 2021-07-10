import { each, isArray } from '@antv/util';
import { getShapeStyle } from '../../../util/element';
import { catmullRom2bezier } from '../../../util/path';
import { Point, Position, RangePoint } from '../../../types';
import { PathCommand, ShapeAttrs } from '../../../types/g';
import { ShapeInfo, ShapeMarkerCfg } from '../../../types/geometry';
import { LineSymbols } from './symbol';
import { getPathPoints } from './path';

function _points2path(points: Point[], isInCircle: boolean): PathCommand[] {
  const path = [];
  if (points.length) {
    path.push(['M', points[0].x, points[0].y]);
    for (let i = 1, length = points.length; i < length; i += 1) {
      const item = points[i];
      path.push(['L', item.x, item.y]);
    }

    if (isInCircle) {
      path.push(['Z']);
    }
  }

  return path;
}

/**
 * 将点连接成路径 path
 */
function getLinePath(points: Point[], isInCircle?: boolean): PathCommand[] {
  return _points2path(points, isInCircle);
}

/**
 * 根据关键点获取限定了范围的平滑线
 */
function getSplinePath(points: Point[], isInCircle?: boolean, constaint?: Position[]): PathCommand[] {
  const data = [];
  const first = points[0];
  let prePoint = null;
  if (points.length <= 2) {
    // 两点以内直接绘制成路径
    return getLinePath(points, isInCircle);
  }
  for (let i = 0, len = points.length; i < len; i++) {
    const point = points[i];
    if (!prePoint || !(prePoint.x === point.x && prePoint.y === point.y)) {
      data.push(point.x);
      data.push(point.y);
      prePoint = point;
    }
  }
  const constraint = constaint || [
    // 范围
    [0, 0],
    [1, 1],
  ];
  const splinePath = catmullRom2bezier(data, isInCircle, constraint);
  splinePath.unshift(['M', first.x, first.y]);
  return splinePath;
}

// 单条 path
function getSinglePath(
  points: Point[],
  isInCircle: boolean,
  smooth?: boolean,
  constraint?: Position[],
  style?: ShapeAttrs,
) {
  if (points.length === 1) {
    // 只有一个点时
    return [
      ['M', points[0].x, points[0].y - style.lineWidth / 2],
      ['L', points[0].x, points[0].y],
      ['L', points[0].x, points[0].y + style.lineWidth / 2],
    ];
  }

  let path;
  if (!smooth) {
    path = getLinePath(points, false);
    if (isInCircle) {
      path.push(['Z']);
    }
  } else {
    // 直角坐标系下绘制曲线时限制最大值、最小值
    if (isInCircle && points.length) {
      points.push({ x: points[0].x, y: points[0].y });
    }
    path = getSplinePath(points, false, constraint);
  }

  return path;
}

/**
 * 拆分点数据
 * @example
 * // result: [{x: 20, y: 20}, {x: 20, y: 30}]
 * splitPoints({x: 20,y: [20, 30]});
 * @example
 * // result: [{x: 20, y: 20}, {x: 30, y: 30}]
 * splitPoints({x: [20, 30],y: [20, 30]});
 * @param obj
 */
function splitPoints(obj: RangePoint): Point[] {
  // y 有可能是数组，对应原始数据中 y 为一个区间数据，如 [19, 30]，为了统一也将 x 转换为数组
  const x = obj.x;
  const y = isArray(obj.y) ? obj.y : [obj.y];

  return y.map((eachY, index) => {
    return {
      x: isArray(x) ? x[index] : x,
      y: eachY,
    };
  });
}

function getRangePath(
  points: RangePoint[],
  isInCircle: boolean,
  isStack?: boolean,
  smooth?: boolean,
  constraint?: Position[],
  style?: ShapeAttrs,
) {
  const topPoints = [];
  const bottomPoints = [];
  each(points, (point: RangePoint) => {
    const result = splitPoints(point);
    topPoints.push(result[1]); // 上边
    bottomPoints.push(result[0]); // 底边
  });

  const topPath = getSinglePath(topPoints, isInCircle, smooth, constraint, style);
  const bottomPath = getSinglePath(bottomPoints, isInCircle, smooth, constraint, style);
  if (isStack) {
    return topPath;
  }
  return topPath.concat(bottomPath);
}

function getPath(
  points: Point[] | RangePoint[],
  isInCircle: boolean,
  isStack?: boolean,
  smooth?: boolean,
  constraint?: Position[],
  style?: ShapeAttrs,
) {
  if (points.length) {
    const first = points[0];

    return isArray(first.y)
      ? getRangePath(points as RangePoint[], isInCircle, isStack, smooth, constraint, style)
      : getSinglePath(points as Point[], isInCircle, smooth, constraint, style);
  }
  return [];
}

export function getLineShapeAttrs(cfg: ShapeInfo, smooth?: boolean, constraint?: Position[]) {
  const { isStack, connectNulls, isInCircle, showSinglePoint } = cfg;
  const shapeAttrs = getShapeStyle(cfg, true, false, 'lineWidth');

  const points = getPathPoints(cfg.points, connectNulls, showSinglePoint); // 根据 connectNulls 值处理 points
  let path = [];
  for (let i = 0, len = points.length; i < len; i++) {
    const eachLinePoints = points[i];
    path = path.concat(getPath(eachLinePoints, isInCircle, isStack, smooth, constraint, shapeAttrs));
  }
  shapeAttrs.path = path;

  return shapeAttrs;
}

/**
 * Gets line marker
 * @ignore
 * @param markerCfg
 * @param shapeType
 * @returns 返回 Line 的 marker 配置
 */
export function getLineMarker(markerCfg: ShapeMarkerCfg, shapeType: string) {
  const { color } = markerCfg;
  return {
    symbol: LineSymbols[shapeType],
    style: {
      // fixme 这里应该允许用户
      lineWidth: 2,
      r: 6,
      stroke: color,
    },
  };
}
