import * as _ from '@antv/util';
import { Coordinate } from '../../dependents';
import { Point, Position, Shape, ShapeDrawCFG, ShapePoint } from '../../interface';
import { doAnimate } from '../animate/index';
import Element from '../element';
import { registerShape, registerShapeFactory } from './base';
import { getPathPoints } from './util/get-path-points';
import { getLinePath, getSplinePath } from './util/path';

function getPath(
  points: Point[],
  isInCircle: boolean,
  smooth: boolean,
  registeredShape: Shape,
  constraint?: Position[]
) {
  const topLinePoints = []; // area 区域上部分
  let bottomLinePoints = []; // area 区域下部分
  _.each(points, (point) => {
    topLinePoints.push(point[1]);
    bottomLinePoints.push(point[0]);
  });
  bottomLinePoints = bottomLinePoints.reverse();

  let path = [];
  _.each([topLinePoints, bottomLinePoints], (pointsData, index) => {
    let subPath = [];
    const parsedPoints = registeredShape.parsePoints(pointsData);
    const p1 = parsedPoints[0];
    if (isInCircle) {
      parsedPoints.push({ x: p1.x, y: p1.y });
    }
    if (smooth) {
      subPath = getSplinePath(parsedPoints, false, constraint);
    } else {
      subPath = getLinePath(parsedPoints, false);
    }

    if (index > 0) {
      subPath[0][0] = 'L';
    }
    path = path.concat(subPath);
  });

  path.push(['Z']);
  return path;
}

function getStyle(shapeName: string, cfg: ShapeDrawCFG) {
  const attrs = {
    ...cfg.style,
  };
  const isStroke = ['line', 'smoothLine'].includes(shapeName);
  if (cfg.color) {
    if (isStroke) {
      attrs.stroke = cfg.color;
    } else {
      attrs.fill = cfg.color;
    }
  }
  if (isStroke && cfg.size) {
    attrs.lineWidth = cfg.size;
  }

  return attrs;
}

function getAttrs(
  shapeName: string,
  cfg: ShapeDrawCFG,
  smooth: boolean,
  registeredShape: Shape,
  constraint?: Position[]
) {
  const attrs = getStyle(shapeName, cfg);
  const { connectNulls, isInCircle, points } = cfg;
  const pathPoints = getPathPoints(points, connectNulls); // 根据 connectNulls 配置获取图形关键点

  let path = [];
  _.each(pathPoints, (eachPoints: Point[]) => {
    path = path.concat(getPath(eachPoints, isInCircle, smooth, registeredShape, constraint));
  });
  attrs.path = path;

  return attrs;
}

function getConstraint(coordinate: Coordinate): Position[] {
  const { start, end } = coordinate;
  return [[start.x, end.y], [end.x, start.y]];
}

const AreaShapeFactory = registerShapeFactory('area', {
  defaultShapeType: 'area',
  getDefaultPoints(pointInfo: ShapePoint): Point[] {
    // area 基本标记的绘制需要获取上下两边的顶点
    const { x, y0 } = pointInfo;
    const y = _.isArray(pointInfo.y) ? pointInfo.y : [y0, pointInfo.y];

    return y.map((yItem: number) => {
      return {
        x: x as number,
        y: yItem,
      };
    });
  },
});

// 填充的区域图
registerShape('area', 'area', {
  draw(cfg: ShapeDrawCFG, element: Element) {
    const attrs = getAttrs('area', cfg, false, this);
    const shape = element.container.addShape({
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
    const attrs = getAttrs('area', cfg, false, this);
    if (cfg.animate) {
      doAnimate(shape, cfg, this.coordinate, attrs);
    } else {
      shape.attr(attrs);
    }
  },
});

// 描边不填充的区域图
registerShape('area', 'line', {
  draw(cfg: ShapeDrawCFG, element: Element) {
    const attrs = getAttrs('line', cfg, false, this);
    const shape = element.container.addShape({
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
    const attrs = getAttrs('line', cfg, false, this);
    if (cfg.animate) {
      doAnimate(shape, cfg, this.coordinate, attrs);
    } else {
      shape.attr(attrs);
    }
  },
});

// 填充的平滑曲面图
registerShape('area', 'smooth', {
  draw(cfg: ShapeDrawCFG, element: Element) {
    const coordinate = this.coordinate;
    const attrs = getAttrs('smooth', cfg, true, this, getConstraint(coordinate));
    const shape = element.container.addShape({
      type: 'path',
      attrs,
    });

    if (cfg.animate) {
      doAnimate(shape, cfg, coordinate);
    }

    return shape;
  },
  update(cfg: ShapeDrawCFG, element: Element) {
    const shape = element.shape;
    const coordinate = this.coordinate;
    const attrs = getAttrs('smooth', cfg, true, this, getConstraint(coordinate));
    if (cfg.animate) {
      doAnimate(shape, cfg, coordinate, attrs);
    } else {
      shape.attr(attrs);
    }
  },
});

// 描边的平滑曲面图
registerShape('area', 'smoothLine', {
  draw(cfg: ShapeDrawCFG, element: Element) {
    const coordinate = this.coordinate;
    const attrs = getAttrs('smoothLine', cfg, true, this, getConstraint(coordinate));
    const shape = element.container.addShape({
      type: 'path',
      attrs,
    });

    if (cfg.animate) {
      doAnimate(shape, cfg, coordinate);
    }

    return shape;
  },
  update(cfg: ShapeDrawCFG, element: Element) {
    const shape = element.shape;
    const coordinate = this.coordinate;
    const attrs = getAttrs('smoothLine', cfg, true, this, getConstraint(coordinate));
    if (cfg.animate) {
      doAnimate(shape, cfg, coordinate, attrs);
    } else {
      shape.attr(attrs);
    }
  },
});

export default AreaShapeFactory;
