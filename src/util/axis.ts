import { DIRECTION } from '../constant';
import { Coordinate } from '../dependents';
import { Region } from '../interface';

/**
 * get axis relative region ( 0 ~ 1) by direction
 * @param direction
 * @returns axis coordinate region
 */
export function getAxisRelativeRegion(direction: DIRECTION): Region {
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
 * get the axis region from coordinate
 * @param coordinate
 * @param direction
 * @returns the axis region (start point, end point)
 */
export function getAxisRegion(coordinate: Coordinate, direction: DIRECTION): Region {
  const { start, end } = getAxisRelativeRegion(direction);

  return {
    start: coordinate.convert(start),
    end: coordinate.convert(end),
  };
}

/**
 * get axis factor
 * @param direction
 * @returns factor
 */
export function getAxisFactor(direction: DIRECTION): number {
  return [DIRECTION.BOTTOM, DIRECTION.RIGHT].includes(direction) ? -1 : 1;
}
