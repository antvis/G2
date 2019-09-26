import * as Util from '@antv/util';
import { ShapePoint } from 'geometry/interface';
import { Point } from 'interface';
import { registerShape, registerShapeFactory } from '../shape';

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
  if (Util.isArray(y)) {
    yMin = y[0];
    yMax = y[1];
  } else {
    yMin = y0;
    yMax = y;
  }

  let xMin;
  let xMax;
  if (Util.isArray(x)) {
    xMin = x[0];
    xMax = x[1];
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
  draw(cfg, element) {
    const style = cfg.style;
    if (cfg.color) {
      style.fill = cfg.color;
    }
    const path = this.parsePath(getRectPath(cfg.points));
    const container = element.container;

    return container.addShape('path', {
      attrs: {
        ...style,
        path,
      },
    });
  },
  update(cfg, element) {
    const shape = element.shape;
    // todo 重复代码优化
    const style = cfg.style;
    if (cfg.color) {
      style.fill = cfg.color;
    }
    const path = this.parsePath(getRectPath(cfg.points));
    shape.attr({
      ...style,
      path,
    });
  },
});

export default IntervalShapeFactory;
