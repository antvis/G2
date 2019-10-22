import * as _ from '@antv/util';
import { Point, Position, RangePoint, ShapeDrawCFG } from '../../interface';
import { doAnimate } from '../animate/index';
import Element from '../element';
import { registerShape, registerShapeFactory } from './base';
import { getPathPoints } from './util/get-path-points';
import { getLinePath, getSplinePath } from './util/path';
import { splitPoints } from './util/split-points';

function getStyle(cfg: ShapeDrawCFG) {
  const { style, color, size } = cfg;
  const result = {
    ...style,
  };
  if (color) {
    result.stroke = color;
  }
  if (size) {
    result.lineWidth = size;
  }

  return result;
}

function getShapeAttrs(cfg: ShapeDrawCFG, smooth?: boolean, constraint?: Position[]) {
  const { isStack, connectNulls, isInCircle } = cfg;
  const points = getPathPoints(cfg.points, connectNulls); // 根据 connectNulls 值处理 points

  let path = [];
  _.each(points, (eachLinePoints: Point[] | RangePoint[]) => {
    path = path.concat(getPath(eachLinePoints, isInCircle, isStack, smooth, constraint));
  });

  return {
    ...getStyle(cfg),
    path,
  };
}

// 单条 path
function getSinglePath(points: Point[], isInCircle: boolean, smooth?: boolean, constraint?: Position[]) {
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

function getRangePath(
  points: RangePoint[],
  isInCircle: boolean,
  isStack?: boolean,
  smooth?: boolean,
  constraint?: Position[]
) {
  const topPoints = [];
  const bottomPoints = [];
  _.each(points, (point: RangePoint) => {
    const result = splitPoints(point);
    topPoints.push(result[0]); // 上边
    bottomPoints.push(result[1]); // 底边
  });

  const topPath = getSinglePath(topPoints, isInCircle, smooth, constraint);
  const bottomPath = getSinglePath(bottomPoints, isInCircle, smooth, constraint);
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
  constraint?: Position[]
) {
  const first = points[0];

  return _.isArray(first.y)
    ? getRangePath(points as RangePoint[], isInCircle, isStack, smooth, constraint)
    : getSinglePath(points as Point[], isInCircle, smooth, constraint);
}

const interpolateCallback = (point: Point, nextPoint: Point, shapeType: string) => {
  const x = point.x as number;
  const y = point.y as number;
  const nextX = nextPoint.x as number;
  const nextY = nextPoint.y as number;
  let result;

  switch (shapeType) {
    case 'hv':
      result = [{ x: nextX, y }];
      break;
    case 'vh':
      result = [{ x, y: nextY }];
      break;
    case 'hvh':
      const middleX = (nextX + x) / 2;
      result = [{ x: middleX, y }, { x: middleX, y: nextY }];
      break;
    case 'vhv':
      const middleY = (y + nextY) / 2;
      result = [{ x, y: middleY }, { x: nextX, y: middleY }];
      break;
    default:
      break;
  }

  return result;
};

function getInterpolatePoints(points: Point[], shapeType: string) {
  let result = [];
  _.each(points, (point: Point, index) => {
    const nextPoint = points[index + 1];
    result.push(point);
    if (nextPoint) {
      const interpolatePoint = interpolateCallback(point, nextPoint, shapeType);
      result = result.concat(interpolatePoint);
    }
  });
  return result;
}

// 插值的图形path，不考虑null
function getInterpolatePath(points: Point[]) {
  return points.map((point, index) => {
    return index === 0 ? ['M', point.x, point.y] : ['L', point.x, point.y];
  });
}

// 插值的图形
function getInterpolateShapeAttrs(cfg: ShapeDrawCFG, shapeType: string) {
  const points = getPathPoints(cfg.points, cfg.connectNulls); // 根据 connectNulls 值处理 points
  let path = [];
  _.each(points, (eachLinePoints) => {
    const interpolatePoints = getInterpolatePoints(eachLinePoints, shapeType);
    path = path.concat(getInterpolatePath(interpolatePoints));
  });

  return {
    ...getStyle(cfg),
    path,
  };
}

const LineShapeFactory = registerShapeFactory('line', {
  defaultShapeType: 'line',
});

// 'line' 默认折线
// 'dot' 点线 ···
// 'dash' 断线 - - -
_.each(['line', 'dot', 'dash', 'smooth'], (shapeType) => {
  registerShape('line', shapeType, {
    draw(cfg: ShapeDrawCFG, element: Element) {
      const container = element.container;
      const smooth = shapeType === 'smooth';
      let constraint;
      if (smooth) {
        const { start, end } = this.coordinate;
        constraint = [[start.x, end.y], [end.x, start.y]];
      }

      const attrs = getShapeAttrs(cfg, smooth, constraint);
      const shape = container.addShape({
        type: 'path',
        attrs,
      });
      if (cfg.animate) {
        doAnimate(shape, cfg, this.coordinate);
      }
      return shape;
    },
    update(cfg: ShapeDrawCFG, element: Element) {
      const shape = element.shape;
      const smooth = shapeType === 'smooth';
      let constraint;
      if (smooth) {
        const { start, end } = this.coordinate;
        constraint = [[start.x, end.y], [end.x, start.y]];
      }

      const attrs = getShapeAttrs(cfg, smooth, constraint);
      if (cfg.animate) {
        doAnimate(shape, cfg, this.coordinate, attrs);
      } else {
        shape.attr(attrs);
      }
    },
  });
});

// step line
_.each(['hv', 'vh', 'hvh', 'vhv'], (shapeType) => {
  registerShape('line', shapeType, {
    draw(cfg: ShapeDrawCFG, element: Element) {
      const container = element.container;
      const attrs = getInterpolateShapeAttrs(cfg, shapeType);
      const shape = container.addShape({
        type: 'path',
        attrs,
      });
      if (cfg.animate) {
        doAnimate(shape, cfg, this.coordinate);
      }
      return shape;
    },
    update(cfg: ShapeDrawCFG, element: Element) {
      const shape = element.shape;
      const attrs = getInterpolateShapeAttrs(cfg, shapeType);
      if (cfg.animate) {
        doAnimate(shape, cfg, this.coordinate, attrs);
      } else {
        shape.attr(attrs);
      }
    },
  });
});

export default LineShapeFactory;
