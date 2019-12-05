import { isArray } from '@antv/util';

export function parseFields(field: string | string[]): string[] {
  if (isArray(field)) {
    return field;
  }

  return field.split('*');
}
