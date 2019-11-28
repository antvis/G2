import * as _ from '@antv/util';
import { ShapeInfo } from '../../interface';

/**
 * Determines whether model is change
 * @param currentModel
 * @param preModel
 * @returns
 */
export function isModelChange(currentModel: ShapeInfo, preModel: ShapeInfo) {
  return _.some(['color', 'shape', 'size', 'x', 'y', 'isInCircle', 'data', 'style'], (key: string) => {
    return !_.isEqual(currentModel[key], preModel[key]);
  });
}
