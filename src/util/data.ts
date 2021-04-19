import { groupToMap } from '@antv/util';
import { Data } from '../types';

/**
 * 对数据按照分组字段，进行分组处理
 * // TODO https://github.com/antvis/G2/blob/e132a303c3b09f224371a8286d5592f3f3fbe356/src/geometry/util/group-data.ts#L5
 * @param data
 * @param fields
 */
export function groupData(data: Data, fields: string[]): Data[] {
  if (!fields) {
    return [data];
  }

  const groups = groupToMap(data, fields);

  return Object.values(groups);
}
