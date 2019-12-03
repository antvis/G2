import * as _ from '@antv/util';
import { DIRECTION } from '../constant';
import { Coordinate } from '../dependents';
import { Point, Region } from '../interface';

/**
 * get axis relative region ( 0 ~ 1) by direction when coordinate is rect
 * @param direction
 * @returns axis coordinate region
 */
export function getLineAxisRelativeRegion(direction: DIRECTION): Region {
  let start;
  let end;

  switch (direction) {
    case DIRECTION.TOP:
      start = { x: 0, y: 1 };
      end = { x: 1, y: 1 };
      break;
    case DIRECTION.RIGHT:
      start = { x: 1, y: 0 };
      end = { x: 1, y: 1 };
      break;
    case DIRECTION.BOTTOM:
      start = { x: 0, y: 0 };
      end = { x: 1, y: 0 };
      break;
    case DIRECTION.LEFT:
      start = { x: 0, y: 0 };
      end = { x: 0, y: 1 };
      break;
    default:
      start = end = { x: 0, y: 0 };
  }

  return { start, end };
}

/**
 * get axis relative region ( 0 ~ 1) by direction when coordinate is polar
 * @param coordinate
 * @returns axis coordinate region
 */
export function getCircleAxisRelativeRegion(coordinate: Coordinate) {
  let start;
  let end;
  if (coordinate.isTransposed) {
    start = {
      x: 0,
      y: 0,
    };
    end = {
      x: 1,
      y: 0,
    };
  } else {
    start = {
      x: 0,
      y: 0,
    };
    end = {
      x: 0,
      y: 1,
    };
  }

  return { start, end };
}

/**
 * get the axis region from coordinate
 * @param coordinate
 * @param direction
 * @returns the axis region (start point, end point)
 */
export function getAxisRegion(coordinate: Coordinate, direction: DIRECTION): Region {
  let region = { start: { x: 0, y: 0 }, end: { x: 0, y: 0 } };
  if (coordinate.isRect) {
    region = getLineAxisRelativeRegion(direction);
  } else if (coordinate.isPolar) {
    region = getCircleAxisRelativeRegion(coordinate);
  }

  const { start, end } = region;
  return {
    start: coordinate.convert(start),
    end: coordinate.convert(end),
  };
}

/**
 * get axis factor
 * @param coordinate
 * @param direction
 * @returns factor
 */
export function getAxisFactor(coordinate: Coordinate, direction: DIRECTION): number {
  // rect coordinate, by direction
  if (coordinate.isRect) {
    return coordinate.isTransposed
      ? [DIRECTION.RIGHT, DIRECTION.BOTTOM].includes(direction)
        ? 1
        : -1
      : [DIRECTION.BOTTOM, DIRECTION.RIGHT].includes(direction)
      ? -1
      : 1;
  }

  // polar y axis, by angle
  if (coordinate.isPolar) {
    const startAngle = coordinate.x.start;
    return startAngle < 0 ? -1 : 1;
  }

  return 1;
}

/**
 * whether the axis isVertical
 * @param region
 * @returns isVertical
 */
export function isVertical(region: Region): boolean {
  const { start, end } = region;

  return start.x === end.x;
}

/**
 * get factor by region (real position)
 * @param region
 * @param center
 * @returns factor
 */
export function getAxisFactorByRegion(region: Region, center: Point): number {
  const { start, end } = region;

  const isAxisVertical = isVertical(region);

  // 垂直
  if (isAxisVertical) {
    // 左方,从下到上、右方,从上到下
    if ((start.y - end.y) * (center.x - start.x) > 0) {
      return 1;
    } else {
      return -1;
    }
  } else {
    // 下方,从左到右、上方,从右到做
    if ((end.x - start.x) * (start.y - center.y) > 0) {
      return -1;
    } else {
      return 1;
    }
  }
}

/**
 * get the axis cfg from theme
 * @param theme view theme object
 * @param direction axis direction
 * @returns axis theme cfg
 */
export function getAxisThemeCfg(theme: object, direction: string): object {
  return _.get(theme, ['components', 'axis', direction], {});
}

/**
 * get circle axis center and radius
 * @param coordinate
 */
export function getCircleAxisCenterRadius(coordinate: Coordinate) {
  // @ts-ignore
  const { startAngle, endAngle, circleCenter: center, polarRadius: radius } = coordinate;
  return {
    center,
    radius,
    startAngle,
    endAngle,
  };
}
