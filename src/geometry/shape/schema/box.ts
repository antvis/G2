import { isArray, isNil } from '@antv/util';
import { IGroup, PathCommand } from '../../../dependents';
import { Point, ShapeInfo, ShapeMarkerCfg, ShapePoint } from '../../../interface';

import { registerShape } from '../base';
import { getStyle } from '../util/get-style';

function parseValue(value: number[]) {
  const array = !isArray(value) ? [value] : value;

  const min = array[0]; // 最小值
  const max = array[array.length - 1]; // 最大值
  const min1 = array.length > 1 ? array[1] : min;
  const max1 = array.length > 3 ? array[3] : max;
  const median = array.length > 2 ? array[2] : min1;

  return {
    min, // 最小值
    max, // 最大值
    min1,
    max1,
    median,
  };
}

function getBoxPoints(x: number | number[], y: number | number[], size: number): Point[] {
  const halfSize = size / 2;
  let pointsArray;
  if (isArray(y)) {
    // 2维
    const { min, max, median, min1, max1 } = parseValue(y);
    const minX = (x as number) - halfSize;
    const maxX = (x as number) + halfSize;
    pointsArray = [
      [minX, max],
      [maxX, max],
      [x as number, max],
      [x as number, max1],
      [minX, min1],
      [minX, max1],
      [maxX, max1],
      [maxX, min1],
      [x as number, min1],
      [x as number, min],
      [minX, min],
      [maxX, min],
      [minX, median],
      [maxX, median],
    ];
  } else {
    // 只有一个维度
    y = isNil(y) ? 0.5 : y;
    const { min, max, median, min1, max1 } = parseValue(x as number[]);
    const minY = y - halfSize;
    const maxY = y + halfSize;
    pointsArray = [
      [min, minY],
      [min, maxY],
      [min, y],
      [min1, y],
      [min1, minY],
      [min1, maxY],
      [max1, maxY],
      [max1, minY],
      [max1, y],
      [max, y],
      [max, minY],
      [max, maxY],
      [median, minY],
      [median, maxY],
    ];
  }

  return pointsArray.map((arr) => {
    return {
      x: arr[0],
      y: arr[1],
    };
  });
}

function getBoxPath(points): PathCommand[] {
  return [
    ['M', points[0].x, points[0].y],
    ['L', points[1].x, points[1].y],
    ['M', points[2].x, points[2].y],
    ['L', points[3].x, points[3].y],
    ['M', points[4].x, points[4].y],
    ['L', points[5].x, points[5].y],
    ['L', points[6].x, points[6].y],
    ['L', points[7].x, points[7].y],
    ['L', points[4].x, points[4].y], // 封闭 z
    ['Z'],
    ['M', points[8].x, points[8].y],
    ['L', points[9].x, points[9].y],
    ['M', points[10].x, points[10].y],
    ['L', points[11].x, points[11].y],
    ['M', points[12].x, points[12].y],
    ['L', points[13].x, points[13].y],
  ];
}

// box shape
registerShape('schema', 'box', {
  getPoints(shapePoint: ShapePoint) {
    const { x, y, size } = shapePoint;
    return getBoxPoints(x as number, y as number[], size);
  },
  draw(cfg: ShapeInfo, container: IGroup) {
    const style = getStyle(cfg, true, false);
    const path = this.parsePath(getBoxPath(cfg.points));
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
        const yValues = [y - 6, y - 3, y, y + 3, y + 6];
        const points = getBoxPoints(x, yValues, r);
        return [
          ['M', points[0].x + 1, points[0].y],
          ['L', points[1].x - 1, points[1].y],
          ['M', points[2].x, points[2].y],
          ['L', points[3].x, points[3].y],
          ['M', points[4].x, points[4].y],
          ['L', points[5].x, points[5].y],
          ['L', points[6].x, points[6].y],
          ['L', points[7].x, points[7].y],
          ['L', points[4].x, points[4].y],
          ['Z'],
          ['M', points[8].x, points[8].y],
          ['L', points[9].x, points[9].y],
          ['M', points[10].x + 1, points[10].y],
          ['L', points[11].x - 1, points[11].y],
          ['M', points[12].x, points[12].y],
          ['L', points[13].x, points[13].y],
        ];
      },
      style: {
        r: 6,
        lineWidth: 1,
        stroke: color,
      },
    };
  },
});
