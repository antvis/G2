import * as _ from '@antv/util';

export function parseFields(field: string | string[]): string[] {
  if (_.isArray(field)) {
    return field;
  }

  return field.split('*');
}
