import { isArray } from '@antv/util';
import { IGroup, PathCommand } from '../../dependents';
import { Point, ShapeInfo, ShapeMarkerCfg, ShapePoint } from '../../interface';
import { padEnd } from '../../util/helper';
import { registerShape, registerShapeFactory } from './base';
import { getStyle } from './util/get-style';

function getCandleYValues(value: number | number[]) {
  const array = !isArray(value) ? [value] : value;
  // 从大到小排序
  const sorted = array.sort((a, b) => b - a);
  return padEnd(sorted, 4, sorted[sorted.length - 1]);
}

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

function getBoxPoints(x: number, y: number | number[], size: number): Point[] {
  const halfSize = size / 2;
  let pointsArray;
  if (isArray(y)) {
    // 2维
    const { min, max, median, min1, max1 } = parseValue(y);
    pointsArray = [
      [x - halfSize, max],
      [x + halfSize, max],
      [x, max],
      [x, max1],
      [x - halfSize, min1],
      [x - halfSize, max1],
      [x + halfSize, max1],
      [x + halfSize, min1],
      [x, min1],
      [x, min],
      [x - halfSize, min],
      [x + halfSize, min],
      [x - halfSize, median],
      [x + halfSize, median],
    ];
  } else {
    // 只有一个维度
    y = y || 0.5;
    const { min, max, median, min1, max1 } = parseValue([y]);
    pointsArray = [
      [min, y - halfSize],
      [min, y + halfSize],
      [min, y],
      [min1, y],
      [min1, y - halfSize],
      [min1, y + halfSize],
      [max1, y + halfSize],
      [max1, y - halfSize],
      [max1, y],
      [max, y],
      [max, y - halfSize],
      [max, y + halfSize],
      [median, y - halfSize],
      [median, y + halfSize],
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

const SchemaShapeFactory = registerShapeFactory('schema', {
  defaultShapeType: '', // 'schema' is for some custom shapes, so will not specify defaultShapeType
});

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

export default SchemaShapeFactory;
