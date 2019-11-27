import * as _ from '@antv/util';
import { ShapeInfo } from '../../interface';

/**
 * Determines whether model is change
 * @param currentModel
 * @param preModel
 * @returns
 */
export function isModelChange(currentModel: ShapeInfo, preModel: ShapeInfo) {
  let result = false;
  // 判断映射数据以及原始数据是否发生改变
  const keys = ['color', 'shape', 'size', 'x', 'y', 'isInCircle', 'data', 'style'];
  _.each(keys, (key) => {
    if (!_.isEqual(currentModel[key], preModel[key])) {
      result = true;
      return false;
    }
  });

  return result;
}
