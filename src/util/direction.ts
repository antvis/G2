import { DIRECTION } from '../constant';
import { Coordinate } from '../dependents';
import { Position } from '../interface';
import { BBox } from './bbox';

/**
 * @ignore
 * 方位常量转实际的 bbox 位置大小
 * @param parentBBox
 * @param bbox
 * @param direction
 */
export function directionToPosition(parentBBox: BBox, bbox: BBox, direction: DIRECTION): Position {
  if (direction === DIRECTION.TOP) {
    return [parentBBox.minX + parentBBox.width / 2 - bbox.width / 2, parentBBox.minY];
  }
  if (direction === DIRECTION.BOTTOM) {
    return [parentBBox.minX + parentBBox.width / 2 - bbox.width / 2, parentBBox.maxY - bbox.height];
  }
  if (direction === DIRECTION.LEFT) {
    return [parentBBox.minX, parentBBox.minY + parentBBox.height / 2 - bbox.height / 2];
  }
  if (direction === DIRECTION.RIGHT) {
    return [parentBBox.maxX - bbox.width, parentBBox.minY + parentBBox.height / 2 - bbox.height / 2];
  }

  if (direction === DIRECTION.TOP_LEFT || direction === DIRECTION.LEFT_TOP) {
    return [parentBBox.tl.x, parentBBox.tl.y];
  }
  if (direction === DIRECTION.TOP_RIGHT || direction === DIRECTION.RIGHT_TOP) {
    return [parentBBox.tr.x - bbox.width, parentBBox.tr.y];
  }
  if (direction === DIRECTION.BOTTOM_LEFT || direction === DIRECTION.LEFT_BOTTOM) {
    return [parentBBox.bl.x, parentBBox.bl.y - bbox.height];
  }
  if (direction === DIRECTION.BOTTOM_RIGHT || direction === DIRECTION.RIGHT_BOTTOM) {
    return [parentBBox.br.x - bbox.width, parentBBox.br.y - bbox.height];
  }

  return [0, 0];
}

/**
 * get direction after coordinate transpose
 * @param direction
 * @param coordinate
 * @returns direction after transpose or not
 */
function getTransposedDirection(direction: DIRECTION, coordinate: Coordinate): DIRECTION {
  if (coordinate.isTransposed) {
    switch (direction) {
      case DIRECTION.BOTTOM:
        return DIRECTION.LEFT;
      case DIRECTION.LEFT:
        return DIRECTION.BOTTOM;
      case DIRECTION.RIGHT:
        return DIRECTION.TOP;
      case DIRECTION.TOP:
        return DIRECTION.RIGHT;
    }
  }
  return direction;
}

function reflectX(direct: DIRECTION): DIRECTION {
  if (direct === DIRECTION.LEFT) {
    return DIRECTION.RIGHT;
  }

  if (direct === DIRECTION.RIGHT) {
    return DIRECTION.LEFT;
  }

  return direct;
}

function reflectY(direct: DIRECTION): DIRECTION {
  if (direct === DIRECTION.TOP) {
    return DIRECTION.BOTTOM;
  }
  if (direct === DIRECTION.BOTTOM) {
    return DIRECTION.TOP;
  }

  return direct;
}

/**
 * get direction after coordinate.scale
 * @param direction
 * @param coordinate
 */
function getScaleDirection(direction: DIRECTION, coordinate: Coordinate): DIRECTION {
  const x = coordinate.matrix[0];
  const y = coordinate.matrix[4];

  let d = direction;
  if (x < 0) {
    d = reflectX(d);
  }
  if (y < 0) {
    d = reflectY(d);
  }
  return d;
}

/**
 *
 * @param direction
 * @param coordinate
 */
function getReflectDirection(direction: DIRECTION, coordinate: Coordinate): DIRECTION {
  let d = direction;

  if (coordinate.isReflect('x')) {
    d = reflectX(d);
  }
  if (coordinate.isReflect('y')) {
    d = reflectY(d);
  }

  return d;
}

/**
 * @ignore
 * get direction after coordinate translate
 * @param direction
 * @param coordinate
 */
export function getTranslateDirection(direction: DIRECTION, coordinate: Coordinate): DIRECTION {
  let d = direction;
  d = getTransposedDirection(d, coordinate);
  d = getScaleDirection(d, coordinate);
  d = getReflectDirection(d, coordinate);

  return d;
}
