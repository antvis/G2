import { groupToMap } from '@antv/util';
import { Data } from '../../interface';

/**
 * @ignore
 * 将数据按照 fields 进行分组
 * @param data
 * @param fields
 * @param appendConditions
 */
export function group(data: Data, fields: string[], appendConditions: Record<string, any[]> = {}) {
  if (!fields) {
    return [data];
  }

  // 分出出来的数据是 { key: arr }
  const groups = groupToMap(data, fields);

  // 根据 appendConditions 中 scale 的 values 信息，过滤出 values 的分组
  if (fields.length === 1 && appendConditions[fields[0]]) {
    const array = [];
    const values = appendConditions[fields[0]];
    for (let i = 0, len = values.length; i < len; i ++) {
      const value = values[i];
      const arr = groups[`_${value}`]; // TODO 耦合逻辑，和 groupToMap 中的 key 要对应起来
      if (arr) {
        // 可能存在用户设置 values ，但是数据中没有对应的字段，则这时候 arr 就为 null
        array.push(arr);
      }
    }
    return array;
  }

  return Object.values(groups);
}
