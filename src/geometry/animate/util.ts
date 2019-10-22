import * as _ from '@antv/util';
import { Coordinate, Shape } from '../../dependents';
import { Point, ShapeDrawCFG } from '../../interface';

// 获取图形的包围盒
function getPointsBox(points: Point[]) {
  if (_.isEmpty(points)) {
    return null;
  }

  let minX = points[0].x;
  let maxX = points[0].x;
  let minY = points[0].y;
  let maxY = points[0].y;
  _.each(points, (point) => {
    minX = minX > point.x ? point.x : minX;
    maxX = maxX < point.x ? point.x : maxX;
    minY = minY > point.y ? point.y : minY;
    maxY = maxY < point.y ? point.y : maxY;
  });

  return {
    minX,
    maxX,
    minY,
    maxY,
    centerX: (minX + maxX) / 2,
    centerY: (minY + maxY) / 2,
  };
}

export function polarToCartesian(centerX: number, centerY: number, radius: number, angleInRadian: number) {
  return {
    x: centerX + radius * Math.cos(angleInRadian),
    y: centerY + radius * Math.sin(angleInRadian),
  };
}

export function getSectorPath(
  centerX: number,
  centerY: number,
  radius: number,
  startAngleInRadian: number,
  endAngleInRadian: number
) {
  const start = polarToCartesian(centerX, centerY, radius, endAngleInRadian);
  const end = polarToCartesian(centerX, centerY, radius, startAngleInRadian);

  if (endAngleInRadian - startAngleInRadian === Math.PI * 2) {
    return [
      ['M', centerX, centerY],
      ['m', -radius, 0],
      ['a', radius, radius, 0, 1, 0, radius * 2, 0],
      ['a', radius, radius, 0, 1, 0, -radius * 2, 0],
    ];
  }

  const arcSweep = endAngleInRadian - startAngleInRadian <= Math.PI ? 0 : 1;
  return [
    ['M', start.x, start.y],
    ['A', radius, radius, 0, arcSweep, 0, end.x, end.y],
    ['L', centerX, centerY],
    ['L', start.x, start.y],
  ];
}

export function getCoordinateClipCfg(coordinate: Coordinate) {
  const { start, end } = coordinate;
  const width = coordinate.getWidth();
  const height = coordinate.getHeight();
  const margin = 20;
  let clip;

  if (coordinate.isPolar) {
    const { startAngle, endAngle } = coordinate;
    const center = coordinate.getCenter();
    // @ts-ignore 需要 coordinate 基类上支持
    const radius = coordinate.getRadius();
    // @ts-ignore 待 G 4.0 支持
    // 初始状态
    clip = new Shape.Path({
      isClipShape: true,
      attrs: {
        path: getSectorPath(center.x, center.y, radius + margin, startAngle, startAngle),
      },
    });

    return {
      type: 'path',
      attrs: {
        path: getSectorPath(center.x, center.y, radius + margin, startAngle, startAngle),
      },
      endState: (ratio) => {
        const diff = (endAngle - startAngle) * ratio + startAngle;
        const path = getSectorPath(center.x, center.y, radius + margin, startAngle, diff);
        return {
          path,
        };
      },
    };
  }

  let endState;
  if (coordinate.isTransposed) {
    endState = {
      height: height + margin * 2,
    };
  } else {
    endState = {
      width: width + margin * 2,
    };
  }

  return {
    type: 'rect',
    attrs: {
      x: start.x - margin,
      y: end.y - margin,
      width: coordinate.isTransposed ? width + margin * 2 : 0,
      height: coordinate.isTransposed ? 0 : height + margin * 2,
    },
    endState,
  };
}

export function getAngle(shapeModel: ShapeDrawCFG, coordinate: Coordinate) {
  const points = shapeModel.points;
  const box = getPointsBox(points);
  let endAngle;
  let startAngle;
  const { startAngle: coordStartAngle, endAngle: coordEndAngle } = coordinate;
  const diffAngle = coordEndAngle - coordStartAngle;

  if (coordinate.isTransposed) {
    endAngle = box.maxY * diffAngle;
    startAngle = box.minY * diffAngle;
  } else {
    endAngle = box.maxX * diffAngle;
    startAngle = box.minX * diffAngle;
  }
  endAngle += coordStartAngle;
  startAngle += coordStartAngle;
  return {
    startAngle,
    endAngle,
  };
}
