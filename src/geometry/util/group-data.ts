import { groupToMap } from '@antv/util';
import { Data } from '../../interface';

/** @ignore */
export function group(data: Data, fields: string[], appendConditions: Record<string, any[]> = {}) {
  if (!fields) {
    return [data];
  }
  const groups = groupToMap(data, fields);
  const array = [];
  if (fields.length === 1 && appendConditions[fields[0]]) {
    const values = appendConditions[fields[0]];
    for (const value of values) {
      const arr = groups[`_${value}`];
      if (arr) {
        // 可能存在用户设置 values ，但是数据中没有对应的字段，则这时候 arr 就为 null
        array.push(arr);
      }
    }
  } else {
    for (const k in groups) {
      if (groups.hasOwnProperty(k)) {
        const eachGroup = groups[k];
        array.push(eachGroup);
      }
    }
  }

  return array;
}
