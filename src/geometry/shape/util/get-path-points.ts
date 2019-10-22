import * as _ from '@antv/util';
import { RangePoint } from '../../../interface';

function isValueNil(value) {
  return (_.isArray(value) && _.isNil(value[0])) || _.isNil(value);
}

/**
 * 分割数据，用于处理在一组数据中，field 对应的数值存在 null/undefined 的情况
 * 应用于折线图、区域图以及路径图
 * @example
 * // return [[{x: 1, y: 2}, {x: 3, y: 3}]]
 * splitData([{x: 1, y: 2}, {x: 2, y: null}, {x: 3, y: 3}], 'y', true);
 * @example
 * // return [[{x: 1, y: 2}], [{x: 3, y: 3}]]
 * splitData([{x: 1, y: 2}, {x: 2, y: null}, {x: 3, y: 3}], 'y', false);
 *
 * @param data 要进行处理的数据
 * @param field 判断空值的字段名
 * @param connectNulls 是否连接空值数据
 */
export function getPathPoints(points: RangePoint[], connectNulls?: boolean) {
  if (!points.length) {
    return [];
  }

  if (connectNulls) {
    // 即 y 值为空的场景
    const filtered = _.filter(points, (point: RangePoint) => {
      return !isValueNil(point.y);
    });
    return [filtered];
  }

  const result = [];
  let tmp = [];
  points.forEach((point: RangePoint) => {
    if (isValueNil(point.y)) {
      if (tmp.length) {
        result.push(tmp);
        tmp = [];
      }
    } else {
      tmp.push(point);
    }
  });

  if (tmp.length) {
    result.push(tmp);
  }
  return result;
}
