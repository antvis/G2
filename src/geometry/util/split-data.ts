import * as _ from '@antv/util';
import { FIELD_ORIGIN } from '../../constant';
import { Data, Datum } from '../../interface';

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
export function splitData(data: Data, field: string, connectNulls?: boolean) {
  if (!data.length) {
    return [];
  }

  if (connectNulls) {
    // 即忽略 field 对应值为 null 的场景
    const filtered = _.filter(data, (obj: Datum) => {
      const yValue = _.get(obj, [FIELD_ORIGIN, field], obj[field]);
      return !isValueNil(yValue);
    });
    return [filtered];
  }

  const result = [];
  let tmp = [];
  data.forEach((obj: Datum) => {
    const yValue = _.get(obj, [FIELD_ORIGIN, field], obj[field]);
    if (isValueNil(yValue)) {
      if (tmp.length) {
        result.push(tmp);
        tmp = [];
      }
    } else {
      tmp.push(obj);
    }
  });

  if (tmp.length) {
    result.push(tmp);
  }
  return result;
}
