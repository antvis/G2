import * as _ from '@antv/util';
import { Point, ShapeDrawCFG, ShapePoint } from '../../interface';
import { doAnimate } from '../animate/';
import Element from '../element';
import { registerShape, registerShapeFactory } from './base';

// 根据数据点生成矩形的四个关键点
function getRectPoints(cfg: ShapePoint, isPyramid = false) {
  const { x, y, y0, size } = cfg;
  // 有 4 种情况，
  // 1. x, y 都不是数组
  // 2. y是数组，x不是
  // 3. x是数组，y不是
  // 4. x, y 都是数组
  let yMin;
  let yMax;
  if (_.isArray(y)) {
    [yMin, yMax] = y;
  } else {
    yMin = y0;
    yMax = y;
  }

  let xMin;
  let xMax;
  if (_.isArray(x)) {
    [xMin, xMax] = x;
  } else {
    xMin = x - size / 2;
    xMax = x + size / 2;
  }

  const points = [{ x: xMin, y: yMin }, { x: xMin, y: yMax }];

  if (isPyramid) {
    // 绘制尖底漏斗图
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
    points.push({ x: xMax, y: yMax }, { x: xMax, y: yMin });
  }

  return points;
}

// 根据矩形关键点绘制 path
function getRectPath(points: Point[]) {
  const path = [];
  const firstPoint = points[0];
  path.push(['M', firstPoint.x, firstPoint.y]);
  for (let i = 1, len = points.length; i < len; i++) {
    path.push(['L', points[i].x, points[i].y]);
  }
  path.push(['L', firstPoint.x, firstPoint.y]); // 需要闭合
  path.push(['z']);
  return path;
}

/** Interval 的 shape 工厂 */
const IntervalShapeFactory = registerShapeFactory('interval', {
  defaultShapeType: 'rect',
  getDefaultPoints(pointInfo: ShapePoint): Point[] {
    return getRectPoints(pointInfo);
  },
});

registerShape('interval', 'rect', {
  draw(cfg: ShapeDrawCFG, element: Element) {
    const style = cfg.style;
    if (cfg.color) {
      style.fill = cfg.color;
    }
    const path = this.parsePath(getRectPath(cfg.points));
    const container = element.container;
    const shape = container.addShape('path', {
      attrs: {
        ...style,
        path,
      },
    });

    if (cfg.animate) {
      doAnimate(shape, cfg);
    }

    return shape;
  },
  update(cfg: ShapeDrawCFG, element: Element) {
    const shape = element.shape;
    // todo 重复代码优化
    const style = cfg.style;
    if (cfg.color) {
      style.fill = cfg.color;
    }
    const path = this.parsePath(getRectPath(cfg.points));
    const attrs = {
      ...style,
      path,
    };
    if (cfg.animate) {
      doAnimate(shape, cfg, attrs);
    } else {
      shape.attr({
        ...style,
        path,
      });
    }
  },
});

export default IntervalShapeFactory;
