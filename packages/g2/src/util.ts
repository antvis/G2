import * as _ from '@antv/util';

/**
 * 解析 padding 格式为标准的上、右、下、左格式
 * @param padding 内边距，可以是数组、数字或者 'auto'
 */
export function parsePadding<T>(padding: T): T[] {
  let top: T;
  let left: T;
  let right: T;
  let bottom: T;

  if (_.isNumber(padding) || _.isString(padding)) {
    top = left = right = bottom = padding;
  } else if (_.isArray(padding)) {
    top = padding[0];
    right = !_.isNil(padding[1]) ? padding[1] : padding[0];
    bottom = !_.isNil(padding[2]) ? padding[2] : padding[0];
    left = !_.isNil(padding[3]) ? padding[3] : right;
  }

  return [ top, right, bottom, left ];
}
