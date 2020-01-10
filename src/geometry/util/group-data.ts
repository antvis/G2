import { each, groupToMap } from '@antv/util';
import { Data } from '../../interface';

export function group(data: Data, fields: string[], appendConditions: Record<string, any[]> = {}) {
  if (!fields) {
    return [ data ];
  }
  const groups = groupToMap(data, fields);
  const array = [];
  if (fields.length === 1 && appendConditions[fields[0]]) {
    const values = appendConditions[fields[0]];
    for (const value of values) {
      array.push(groups[`_${value}`]);
    }
  } else {
    each(groups, (eachGroup: any[]) => {
      array.push(eachGroup);
    })
  }

  return array;
}
