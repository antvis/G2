import * as _ from '@antv/util';
import { DataPointType } from '../../interface';

/**
 * 分割数据，用于处理存在 null、undefined 值的折线图、区域图
 * @param data 需要进行分割的数据
 * @param connectNulls 是否连接空值数据
 * @param field 字段名
 */
export function splitData(data: DataPointType[], connectNulls: boolean, field: string): DataPointType[][] {
  if (!data.length) return [];

  const splitData = [];
  let tmp = [];
  let yValue;
  data.forEach((obj) => {
    yValue = obj._origin ? obj._origin[field] : obj[field];
    if (connectNulls) { // 如果忽视 Null 直接连接节点，则将 value = null 的数据过滤掉
      if (!_.isNil(yValue)) {
        tmp.push(obj);
      }
    } else {
      if ((_.isArray(yValue) && _.isNil(yValue[0])) || _.isNil(yValue)) {
        if (tmp.length) {
          splitData.push(tmp);
          tmp = [];
        }
      } else {
        tmp.push(obj);
      }
    }
  });

  tmp.length && splitData.push(tmp);
  return splitData;
}
