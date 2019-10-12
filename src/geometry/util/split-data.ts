import * as _ from '@antv/util';
import { FIELD_ORIGIN } from '../../constant';
import { Data, Datum } from '../../interface';

/**
 * 分割数据，用于处理在一组数据中，field 对应的数值存在 null/undefined 的情况
 * 应用于折线图、区域图以及路径图
 * @example
 * // return [{x: 1, y: 2}, {x: 3, y: 3}]
 * splitData([{x: 1, y: 2}, {x: 2, y: null}, {x: 3, y: 3}], true, 'y');
 * @example
 * // return [[{x: 1, y: 2}], [{x: 3, y: 3}]]
 * splitData([{x: 1, y: 2}, {x: 2, y: null}, {x: 3, y: 3}], false, 'y');
 *
 * @param data 要进行分割的数据
 * @param connectNulls 是否连接空值数据
 * @param field 判断空值的字段名
 * @returns data 返回处理的结果
 */
export function splitData(data: Data, connectNulls?: boolean, field?: string) {
  if (!data.length) {
    return [];
  }

  const result = [];
  let tmp = [];
  let yValue;
  data.forEach((obj: Datum) => {
    yValue = _.get(obj, [FIELD_ORIGIN, field], obj[field]);
    if (connectNulls) {
      // 如果忽视 null 直接连接节点，则将 value = null 的数据过滤掉
      if (!_.isNil(yValue)) {
        tmp.push(obj);
      }
    } else {
      if ((_.isArray(yValue) && _.isNil(yValue[0])) || _.isNil(yValue)) {
        if (tmp.length) {
          result.push(tmp);
          tmp = [];
        }
      } else {
        tmp.push(obj);
      }
    }
  });

  if (tmp.length) {
    result.push(tmp);
  }
  return result;
}
