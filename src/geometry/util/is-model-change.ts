import { isEqual, some } from '@antv/util';
import { ShapeInfo } from '../../interface';

/**
 * Determines whether model is change
 * @param currentModel
 * @param preModel
 * @returns
 */
export function isModelChange(currentModel: ShapeInfo, preModel: ShapeInfo) {
  return some(['color', 'shape', 'size', 'x', 'y', 'isInCircle', 'data', 'style', 'points', 'mappingData'], (key: string) => {
    return !isEqual(currentModel[key], preModel[key]);
  });
}
