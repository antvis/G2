import { isEqual, some } from '@antv/util';
import { ShapeInfo } from '../../interface';

/**
 * @ignore
 * Determines whether model is change
 * @param currentModel
 * @param preModel
 * @returns
 */
export function isModelChange(currentModel: ShapeInfo, preModel: ShapeInfo) {
  return some(
    ['color', 'shape', 'size', 'x', 'y', 'isInCircle', 'data', 'style', 'defaultStyle', 'points', 'mappingData'],
    (key: string) => {
      return !isEqual(currentModel[key], preModel[key]);
    }
  );
}
