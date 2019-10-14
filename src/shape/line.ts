import * as _ from '@antv/util';
import { Position } from '../interface';
import { registerShape, registerShapeFactory } from '../shape/base';
import { getLinePath, getSplinePath } from './util/path';
import { splitPoints } from './util/split-points';

// 单条 path
function getSinglePath(points, isInCircle: boolean, smooth?: boolean, constraint?: Position[]) {
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

function getRangePath(points, isInCircle: boolean, isStack?: boolean, smooth?: boolean, constraint?: Position[]) {
  const topPoints = [];
  const bottomPoints = [];
  _.each(points, (point) => {
    const result = splitPoints(point);
    topPoints.push(result);
    bottomPoints.push(result);
  });

  const topPath = getSinglePath(topPoints, isInCircle, smooth, constraint);
  const bottomPath = getSinglePath(bottomPoints, isInCircle, smooth, constraint);
  if (isStack) {
    return topPath;
  }
  return topPath.concat(bottomPath);
}

function getPath(points, isInCircle, isStack?: boolean, smooth?: boolean, constraint?: Position[]) {
  const first = points[0];

  return _.isArray(first.y)
    ? getRangePath(points, isInCircle, isStack, smooth, constraint)
    : getSinglePath(points, isInCircle, smooth, constraint);
}

function getStyle(cfg) {
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

function getShapeAttrs(cfg, smooth?: boolean, constraint?: Position[]) {
  const { isStack, points, isInCircle } = cfg;

  let path = [];
  // FIXME: 喵呜，需要更合理的命名
  _.each(points, (linePoints) => {
    path = path.concat(getPath(linePoints, isInCircle, isStack, smooth, constraint));
  });

  return {
    ...getStyle(cfg),
    path,
  };
}

function getInterpolatePoints(points, fn) {
  let tmpPoints = [];
  _.each(points, (point, index) => {
    const nextPoint = points[index + 1];
    tmpPoints.push(point);
    if (nextPoint) {
      tmpPoints = tmpPoints.concat(fn(point, nextPoint));
    }
  });
  return tmpPoints;
}

// 插值的图形path，不考虑null
function getInterpolatePath(points) {
  return points.map((point, index) => {
    return index === 0 ? ['M', point.x, point.y] : ['L', point.x, point.y];
  });
}

// 插值的图形
function getInterpolateShapeAttrs(cfg, fn) {
  const points = cfg.points;
  let path = [];
  // FIXME: 喵呜，需要更合理的命名
  _.each(points, (linePoints) => {
    const interpolatePoints = getInterpolatePoints(linePoints, fn);
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
    draw(cfg, element) {
      const container = element.container;
      const smooth = shapeType === 'smooth';
      let constraint;
      if (smooth) {
        const { start, end } = this.getCoordinate();
        constraint = [[start.x, end.y], [end.x, start.y]];
      }

      const attrs = getShapeAttrs(cfg, smooth, constraint);
      return container.addShape({
        type: 'path',
        attrs,
      });
    },
    update(cfg, element) {
      const shape = element.shape;
      const smooth = shapeType === 'smooth';
      let constraint;
      if (smooth) {
        const { start, end } = this.getCoordinate();
        constraint = [[start.x, end.y], [end.x, start.y]];
      }

      const attrs = getShapeAttrs(cfg, smooth, constraint);
      shape.attr(attrs);
    },
  });
});

const callbackMap = {
  hv: (point, nextPoint) => {
    return [
      {
        x: nextPoint.x,
        y: point.y,
      },
    ];
  },
  vh: (point, nextPoint) => {
    return [
      {
        x: point.x,
        y: nextPoint.y,
      },
    ];
  },
  hvh: (point, nextPoint) => {
    const middleX = (nextPoint.x + point.x) / 2;
    return [{ x: middleX, y: point.y }, { x: middleX, y: nextPoint.y }];
  },
  vhv: (point, nextPoint) => {
    const middleY = (point.y + nextPoint.y) / 2;
    return [{ x: point.x, y: middleY }, { x: nextPoint.x, y: middleY }];
  },
};

// step line
_.each(['hv', 'vh', 'hvh', 'vhv'], (shapeType) => {
  registerShape('line', shapeType, {
    draw(cfg, element) {
      const container = element.container;
      const attrs = getInterpolateShapeAttrs(cfg, callbackMap[shapeType]);
      return container.addShape({
        type: 'path',
        attrs,
      });
    },
    update(cfg, element) {
      const shape = element.shape;
      const attrs = getInterpolateShapeAttrs(cfg, callbackMap[shapeType]);
      shape.attr(attrs);
    },
  });
});
