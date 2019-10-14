import * as _ from '@antv/util';
import { Position } from '../interface';
import { registerShape, registerShapeFactory } from '../shape/base';
import { getLinePath, getSplinePath } from './util/path';
import { splitPoints } from './util/split-points';

function getShapeAttrs(cfg) {
  if (cfg.color) {
    cfg.style.stroke = cfg.color;
  }
  if (cfg.size) {
    cfg.style.lineWidth = cfg.size;
  }
  return cfg.style;
}

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
    : getSinglePath(points, smooth, isInCircle, constraint);
}

const LineShapeFactory = registerShapeFactory('line', {
  defaultShapeType: 'line',
});

registerShape('line', 'line', {
  draw(cfg, element) {
    const container = element.container;
    const attrs = getShapeAttrs(cfg);
    const { isStack, points, isInCircle } = cfg;
    let path = [];
    // FIXME: 喵呜，需要更合理的命名
    _.each(points, (linePoints) => {
      path = path.concat(getPath(linePoints, isInCircle, isStack));
    });

    const shape = container.addShape({
      type: 'path',
      attrs: {
        ...attrs,
        path,
      },
    });

    return shape;
  },
  update(cfg, element) {
    const shape = element.shape;
    const attrs = getShapeAttrs(cfg);
    const { isStack, points, isInCircle } = cfg;
    let path = [];
    // FIXME: 喵呜，需要更合理的命名
    _.each(points, (linePoints) => {
      path = path.concat(getPath(linePoints, isInCircle, isStack));
    });

    shape.attr({
      ...attrs,
      path,
    });
  },
});
