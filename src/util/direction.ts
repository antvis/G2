import { DIRECTION } from '../constant';
import { Position } from '../interface';
import { BBox } from './bbox';

/**
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
 * @param isTransposed
 * @returns direction after transpose or not
 */
export function getTransposedDirection(direction: DIRECTION, isTransposed: boolean): DIRECTION {
  if (isTransposed) {
    return direction === DIRECTION.BOTTOM
      ? DIRECTION.LEFT
      : direction === DIRECTION.LEFT
      ? DIRECTION.BOTTOM
      : direction;
  }
  return direction;
}
