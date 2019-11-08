import * as _ from '@antv/util';
import { DIRECTION } from '../constant';
import { Coordinate } from '../dependents';
import { Region } from '../interface';

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
  if (coordinate.isRect) {
    return [DIRECTION.BOTTOM, DIRECTION.RIGHT].includes(direction) ? -1 : 1;
  }

  return 1;
  // if (coordinate.isPolar) {
  //   const startAngle = coordinate.x.start;
  //   return startAngle < 0 ? -1 : 1;
  // }
  //
  // return 1;
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
  const center = coordinate.circleCenter;
  // @ts-ignore
  const radius = coordinate.polarRadius;
  return {
    center,
    radius,
  };
}
