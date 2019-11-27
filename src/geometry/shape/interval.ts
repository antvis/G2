import * as _ from '@antv/util';
import { IGroup } from '../../dependents';
import { Point, ShapeInfo, ShapePoint } from '../../interface';
import { registerShape, registerShapeFactory } from './base';

// 根据数据点生成矩形的四个关键点
function getRectPoints(pointInfo: ShapePoint, isPyramid = false): Point[] {
  const { x, y, y0, size } = pointInfo;
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

  const points = [
    { x: xMin, y: yMin },
    { x: xMin, y: yMax },
  ];

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

// 根据数据点生成 Line 的两个关键点
function getLinePoints(pointInfo: ShapePoint): Point[] {
  const { x, y, y0 } = pointInfo;

  if (_.isArray(y)) {
    return y.map((yItem, idx) => {
      return {
        x: _.isArray(x) ? x[idx] : x,
        y: yItem,
      };
    });
  }

  // 起始点从 y0 开始
  return [
    { x: x as number, y: y0 },
    { x: x as number, y },
  ];
}

// 根据数据点生成 tick shape 的 6 个关键点
function getTickPoints(pointInfo: ShapePoint): Point[] {
  const { x, y, y0, size } = pointInfo;
  let yMin;
  let yMax;
  if (_.isArray(y)) {
    [yMin, yMax] = y;
  } else {
    yMin = y0;
    yMax = y;
  }

  const xMax = (x as number) + size / 2;
  const xMin = (x as number) - size / 2;

  // tick 关键点顺序
  // 4 - 1 - 5
  //     |
  // 2 - 0 - 3
  return [
    { x: x as number, y: yMin },
    { x: x as number, y: yMax },
    { x: xMin, y: yMin },
    { x: xMax, y: yMin },
    { x: xMin, y: yMax },
    { x: xMax, y: yMax },
  ];
}

// 根据 tick 关键点绘制 path
function getTickPath(points: Point[]) {
  return [
    ['M', points[0].x, points[0].y],
    ['L', points[1].x, points[1].y],
    ['M', points[2].x, points[2].y],
    ['L', points[3].x, points[3].y],
    ['M', points[4].x, points[4].y],
    ['L', points[5].x, points[5].y],
  ];
}

// 根据 funnel 关键点绘制漏斗图的 path
function getFunnelPath(points: Point[], nextPoints: Point[], isFunnel: boolean) {
  const path = [];
  if (!_.isNil(nextPoints)) {
    path.push(
      ['M', points[0].x, points[0].y],
      ['L', points[1].x, points[1].y],
      ['L', nextPoints[1].x, nextPoints[1].y],
      ['L', nextPoints[0].x, nextPoints[0].y],
      ['Z']
    );
  } else if (isFunnel) {
    // 漏斗图最底部
    path.push(
      ['M', points[0].x, points[0].y],
      ['L', points[1].x, points[1].y],
      ['L', points[2].x, points[2].y],
      ['L', points[3].x, points[3].y],
      ['Z']
    );
  } else {
    // 金字塔最底部
    path.push(
      ['M', points[0].x, points[0].y],
      ['L', points[1].x, points[1].y],
      ['L', points[2].x, points[2].y],
      ['L', points[2].x, points[2].y],
      ['Z']
    );
  }

  return path;
}

/** Interval 的 shape 工厂 */
const IntervalShapeFactory = registerShapeFactory('interval', {
  defaultShapeType: 'rect',
  getDefaultPoints(pointInfo: ShapePoint): Point[] {
    return getRectPoints(pointInfo);
  },
});

// 矩形柱图
registerShape('interval', 'rect', {
  draw(cfg: ShapeInfo, container: IGroup) {
    const style = cfg.style;
    if (cfg.color) {
      style.fill = cfg.color;
    }
    const path = this.parsePath(getRectPath(cfg.points as Point[]));
    const shape = container.addShape('path', {
      attrs: {
        ...style,
        path,
      },
      name: 'interval',
    });

    return shape;
  },
  getMarker(color: string, isInPolar: boolean) {
    if (isInPolar) {
      return {
        symbol: 'circle',
        r: 4.5,
        fill: color,
      };
    }

    return {
      symbol: 'square',
      r: 4,
      fill: color,
    };
  },
});

// 描边柱状图
registerShape('interval', 'hollowRect', {
  draw(cfg: ShapeInfo, container: IGroup) {
    const style = cfg.style;
    if (cfg.color) {
      style.stroke = cfg.color;
    }
    const path = this.parsePath(getRectPath(cfg.points as Point[]));
    const shape = container.addShape('path', {
      attrs: {
        ...style,
        path,
      },
      name: 'interval',
    });

    return shape;
  },
  getMarker(color: string, isInPolar: boolean) {
    if (isInPolar) {
      return {
        symbol: 'circle',
        r: 4.5,
        stroke: color,
      };
    }

    return {
      symbol: 'square',
      r: 4,
      stroke: color,
    };
  },
});

// 直线柱图
registerShape('interval', 'line', {
  getPoints(shapePoint: ShapePoint) {
    return getLinePoints(shapePoint);
  },
  draw(cfg: ShapeInfo, container: IGroup) {
    const style = cfg.style;
    if (cfg.color) {
      style.stroke = cfg.color;
    }
    if (cfg.size) {
      style.lineWidth = cfg.size;
    }
    const path = this.parsePath(getRectPath(cfg.points as Point[]));
    const shape = container.addShape('path', {
      attrs: {
        ...style,
        path,
      },
      name: 'interval',
    });

    return shape;
  },
  getMarker(color: string, isInPolar: boolean) {
    return {
      symbol: (x: number, y: number, r: number) => {
        return [
          ['M', x, y - r],
          ['L', x, y + r],
        ];
      },
      r: 5,
      stroke: color,
    };
  },
});

// I 形状柱状图，常用于 error bar chart
registerShape('interval', 'tick', {
  getPoints(shapePoint: ShapePoint) {
    return getTickPoints(shapePoint);
  },
  draw(cfg: ShapeInfo, container: IGroup) {
    const style = cfg.style;
    if (cfg.color) {
      style.stroke = cfg.color;
    }
    const path = this.parsePath(getTickPath(cfg.points as Point[]));
    const shape = container.addShape('path', {
      attrs: {
        ...style,
        path,
      },
      name: 'interval',
    });

    return shape;
  },
  getMarker(color: string, isInPolar: boolean) {
    return {
      symbol: (x: number, y: number, r: number) => {
        return [
          ['M', x - r / 2, y - r],
          ['L', x + r / 2, y - r],
          ['M', x, y - r],
          ['L', x, y + r],
          ['M', x - r / 2, y + r],
          ['L', x + r / 2, y + r],
        ];
      },
      r: 5,
      stroke: color,
    };
  },
});

// 漏斗图
registerShape('interval', 'funnel', {
  getPoints(shapePoint: ShapePoint) {
    shapePoint.size = shapePoint.size * 2; // 漏斗图的 size 是柱状图的两倍
    return getRectPoints(shapePoint);
  },
  draw(cfg: ShapeInfo, container: IGroup) {
    const style = cfg.style;
    if (cfg.color) {
      style.fill = cfg.color;
    }
    const path = this.parsePath(getFunnelPath(cfg.points as Point[], cfg.nextPoints as Point[], true));
    const shape = container.addShape('path', {
      attrs: {
        ...style,
        path,
      },
      name: 'interval',
    });
    return shape;
  },
  getMarker(color: string, isInPolar: boolean) {
    return {
      symbol: 'square',
      r: 4,
      fill: color,
    };
  },
});

// 金字塔图，尖底漏斗图
registerShape('interval', 'pyramid', {
  getPoints(shapePoint: ShapePoint) {
    shapePoint.size = shapePoint.size * 2; // 漏斗图的 size 是柱状图的两倍
    return getRectPoints(shapePoint, true);
  },
  draw(cfg: ShapeInfo, container: IGroup) {
    const style = cfg.style;
    if (cfg.color) {
      style.fill = cfg.color;
    }
    const path = this.parsePath(getFunnelPath(cfg.points as Point[], cfg.nextPoints as Point[], false));
    const shape = container.addShape('path', {
      attrs: {
        ...style,
        path,
      },
      name: 'interval',
    });

    return shape;
  },
  getMarker(color: string, isInPolar: boolean) {
    return {
      symbol: 'square',
      r: 4,
      fill: color,
    };
  },
});

export default IntervalShapeFactory;
