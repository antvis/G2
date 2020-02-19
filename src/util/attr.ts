import { Attribute } from '../dependents';

/**
 * @ignore
 * get the mapping value by attribute, if mapping value is nil, return def
 * @param attr
 * @param value
 * @param def
 * @returns get mapping value
 */
export function getMappingValue(attr: Attribute, value: any, def: string): string {
  if (!attr) {
    return def;
  }

  let r;
  // 多参数映射，阻止程序报错
  if (attr.callback && attr.callback.length > 1) {
    const restArgs = Array(attr.callback.length - 1).fill('');
    r = attr.mapping(value, ...restArgs).join('');
  } else {
    r = attr.mapping(value).join('');
  }

  return r || def;
}
