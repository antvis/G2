import { isArray } from '@antv/util';
import { IGroup, PathCommand } from '../../../dependents';
import { Point, ShapeInfo, ShapeMarkerCfg, ShapePoint } from '../../../interface';

import { padEnd } from '../../../util/helper';
import { registerShape } from '../base';
import { getStyle } from '../util/get-style';

function getCandleYValues(value: number | number[]) {
  const array = !isArray(value) ? [value] : value;
  // 从大到小排序
  const sorted = array.sort((a, b) => b - a);
  return padEnd(sorted, 4, sorted[sorted.length - 1]);
}

// get candle shape's key points
function getCandlePoints(x: number, y: number[], size: number): Point[] {
  const yValues = getCandleYValues(y);
  return [
    { x, y: yValues[0] },
    { x, y: yValues[1] },
    { x: x - size / 2, y: yValues[2] },
    { x: x - size / 2, y: yValues[1] },
    { x: x + size / 2, y: yValues[1] },
    { x: x + size / 2, y: yValues[2] },
    { x, y: yValues[2] },
    { x, y: yValues[3] },
  ];
}

function getCandlePath(points): PathCommand[] {
  return [
    ['M', points[0].x, points[0].y],
    ['L', points[1].x, points[1].y],
    ['M', points[2].x, points[2].y],
    ['L', points[3].x, points[3].y],
    ['L', points[4].x, points[4].y],
    ['L', points[5].x, points[5].y],
    ['Z'],
    ['M', points[6].x, points[6].y],
    ['L', points[7].x, points[7].y],
  ];
}

// k line shape
registerShape('schema', 'candle', {
  getPoints(shapePoint: ShapePoint) {
    const { x, y, size } = shapePoint;
    return getCandlePoints(x as number, y as number[], size);
  },
  draw(cfg: ShapeInfo, container: IGroup) {
    const style = getStyle(cfg, true, true);
    const path = this.parsePath(getCandlePath(cfg.points));
    const shape = container.addShape('path', {
      attrs: {
        ...style,
        path,
        name: 'schema',
      },
    });

    return shape;
  },
  getMarker(markerCfg: ShapeMarkerCfg) {
    const { color } = markerCfg;
    return {
      symbol(x: number, y: number, r: number) {
        const yValues = [y + 7.5, y + 3, y - 3, y - 7.5];
        const points = getCandlePoints(x, yValues, r);
        return [
          ['M', points[0].x, points[0].y],
          ['L', points[1].x, points[1].y],
          ['M', points[2].x, points[2].y],
          ['L', points[3].x, points[3].y],
          ['L', points[4].x, points[4].y],
          ['L', points[5].x, points[5].y],
          ['Z'],
          ['M', points[6].x, points[6].y],
          ['L', points[7].x, points[7].y],
        ];
      },
      style: {
        lineWidth: 1,
        stroke: color,
        fill: color,
        r: 6,
      },
    };
  },
});
