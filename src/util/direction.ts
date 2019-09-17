import { BBox } from '@antv/g';
import { DIRECTION } from '../chart';
import { Position } from '../interface';

/**
 * 方位常量转实际的 bbox 位置大小
 * @param parentBBox
 * @param bbox
 * @param direction
 */
export function directionToPosition(parentBBox: BBox, bbox: BBox, direction: DIRECTION): Position {
  if (direction === DIRECTION.TOP) {
    return [parentBBox.width / 2 - bbox.width / 2 + parentBBox.minX, parentBBox.minY];
  }
  if (direction === DIRECTION.TOP_LEFT) {
    return [0, 0];
  }
  if (direction === DIRECTION.TOP_RIGHT) {
    return [0, 0];
  }

  if (direction === DIRECTION.BOTTOM) {
    return [parentBBox.width / 2 - bbox.width / 2, parentBBox.maxY - bbox.height];
  }
  if (direction === DIRECTION.BOTTOM_LEFT) {
    return [0, 0];
  }
  if (direction === DIRECTION.BOTTOM_RIGHT) {
    return [0, 0];
  }

  if (direction === DIRECTION.LEFT) {
    return [parentBBox.minX, parentBBox.height / 2 - bbox.height / 2];
  }
  if (direction === DIRECTION.LEFT_TOP) {
    return [0, 0];
  }
  if (direction === DIRECTION.LEFT_BOTTOM) {
    return [0, 0];
  }

  if (direction === DIRECTION.RIGHT) {
    return [parentBBox.maxX - bbox.width, parentBBox.height / 2 - bbox.height / 2 + parentBBox.minX];
  }
  if (direction === DIRECTION.RIGHT_TOP) {
    return [0, 0];
  }
  if (direction === DIRECTION.RIGHT_BOTTOM) {
    return [0, 0];
  }

  return [0, 0];
}
