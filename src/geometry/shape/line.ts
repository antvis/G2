import { each, isArray } from '@antv/util';
import { IGroup } from '../../dependents';
import { Point, Position, RangePoint, ShapeInfo, ShapeMarkerCfg } from '../../interface';
import { registerShape, registerShapeFactory } from './base';
import { getPathPoints } from './util/get-path-points';
import { getStyle } from './util/get-style';
import { getLinePath, getSplinePath } from './util/path';
import { splitPoints } from './util/split-points';

const LineSymbols = {
  line: (x: number, y: number, r: number) => {
    return [
      ['M', x - r, y],
      ['L', x + r, y],
    ];
  },
  dot: (x: number, y: number, r: number) => {
    return [
      ['M', x - r, y],
      ['L', x + r, y],
    ];
  },
  dash: (x: number, y: number, r: number) => {
    return [
      ['M', x - r, y],
      ['L', x + r, y],
    ];
  },
  smooth: (x: number, y: number, r: number) => {
    return [
      ['M', x - r, y],
      ['A', r / 2, r / 2, 0, 1, 1, x, y],
      ['A', r / 2, r / 2, 0, 1, 0, x + r, y],
    ];
  },
  hv: (x: number, y: number, r: number) => {
    return [
      ['M', x - r - 1, y - 2.5],
      ['L', x, y - 2.5],
      ['L', x, y + 2.5],
      ['L', x + r + 1, y + 2.5],
    ];
  },
  vh: (x: number, y: number, r: number) => {
    return [
      ['M', x - r - 1, y + 2.5],
      ['L', x, y + 2.5],
      ['L', x, y - 2.5],
      ['L', x + r + 1, y - 2.5],
    ];
  },
  hvh: (x: number, y: number, r: number) => {
    return [
      ['M', x - (r + 1), y + 2.5],
      ['L', x - r / 2, y + 2.5],
      ['L', x - r / 2, y - 2.5],
      ['L', x + r / 2, y - 2.5],
      ['L', x + r / 2, y + 2.5],
      ['L', x + r + 1, y + 2.5],
    ];
  },
  vhv: (x: number, y: number) => {
    // 宽 13px，高 8px
    return [
      ['M', x - 5, y + 2.5],
      ['L', x - 5, y],
      ['L', x, y],
      ['L', x, y - 3],
      ['L', x, y + 3],
      ['L', x + 6.5, y + 3],
    ];
  },
};

function getShapeAttrs(cfg: ShapeInfo, smooth?: boolean, constraint?: Position[]) {
  const { isStack, connectNulls, isInCircle } = cfg;
  const points = getPathPoints(cfg.points, connectNulls); // 根据 connectNulls 值处理 points

  let path = [];
  each(points, (eachLinePoints: Point[] | RangePoint[]) => {
    path = path.concat(getPath(eachLinePoints, isInCircle, isStack, smooth, constraint));
  });

  return {
    ...getStyle(cfg, true, false, 'lineWidth'),
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
  each(points, (point: RangePoint) => {
    const result = splitPoints(point);
    topPoints.push(result[1]); // 上边
    bottomPoints.push(result[0]); // 底边
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

  return isArray(first.y)
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
      result = [
        { x: middleX, y },
        { x: middleX, y: nextY },
      ];
      break;
    case 'vhv':
      const middleY = (y + nextY) / 2;
      result = [
        { x, y: middleY },
        { x: nextX, y: middleY },
      ];
      break;
    default:
      break;
  }

  return result;
};

function getInterpolatePoints(points: Point[], shapeType: string) {
  let result = [];
  each(points, (point: Point, index) => {
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
function getInterpolateShapeAttrs(cfg: ShapeInfo, shapeType: string) {
  const points = getPathPoints(cfg.points, cfg.connectNulls); // 根据 connectNulls 值处理 points
  let path = [];
  each(points, (eachLinePoints) => {
    const interpolatePoints = getInterpolatePoints(eachLinePoints, shapeType);
    path = path.concat(getInterpolatePath(interpolatePoints));
  });

  return {
    ...getStyle(cfg, true, false, 'lineWidth'),
    path,
  };
}

const LineShapeFactory = registerShapeFactory('line', {
  defaultShapeType: 'line',
});

// 'line' 默认折线
// 'dot' 点线 ···
// 'dash' 断线 - - -
each(['line', 'dot', 'dash', 'smooth'], (shapeType) => {
  registerShape('line', shapeType, {
    draw(cfg: ShapeInfo, container: IGroup) {
      const smooth = shapeType === 'smooth';
      let constraint;
      if (smooth) {
        const { start, end } = this.coordinate;
        constraint = [
          [start.x, end.y],
          [end.x, start.y],
        ];
      }

      const attrs = getShapeAttrs(cfg, smooth, constraint);
      const shape = container.addShape({
        type: 'path',
        attrs,
        name: 'line',
      });

      return shape;
    },
    getMarker(markerCfg: ShapeMarkerCfg) {
      const { color } = markerCfg;
      return {
        symbol: LineSymbols[shapeType],
        style: {
          lineWidth: 2,
          r: 6,
          stroke: color,
        },
      };
    },
  });
});

// step line
each(['hv', 'vh', 'hvh', 'vhv'], (shapeType) => {
  registerShape('line', shapeType, {
    draw(cfg: ShapeInfo, container: IGroup) {
      const attrs = getInterpolateShapeAttrs(cfg, shapeType);
      const shape = container.addShape({
        type: 'path',
        attrs,
        name: 'line',
      });

      return shape;
    },
    getMarker(markerCfg: ShapeMarkerCfg) {
      const { color } = markerCfg;
      return {
        symbol: LineSymbols[shapeType],
        style: {
          lineWidth: 2,
          r: 6,
          stroke: color,
        },
      };
    },
  });
});

export default LineShapeFactory;
