import { isArray } from '@antv/util';
import { IGroup } from '../../../dependents';
import { Point, ShapeInfo, ShapeMarkerCfg, ShapePoint } from '../../../interface';

import { registerShape } from '../base';
import { getStyle } from '../util/get-style';

// 根据数据点生成 tick shape 的 6 个关键点
function getTickPoints(pointInfo: ShapePoint): Point[] {
  const { x, y, y0, size } = pointInfo;
  let yMin;
  let yMax;
  if (isArray(y)) {
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

/** I 形状柱状图，常用于 error bar chart */
registerShape('interval', 'tick', {
  getPoints(shapePoint: ShapePoint) {
    return getTickPoints(shapePoint);
  },
  draw(cfg: ShapeInfo, container: IGroup) {
    const style = getStyle(cfg, true, false);
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
  getMarker(markerCfg: ShapeMarkerCfg) {
    const { color } = markerCfg;
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
      style: {
        r: 5,
        stroke: color,
      },
    };
  },
});
