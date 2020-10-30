import { reduce } from '@antv/util';

export function omit(obj: any, keys: string[]): object {
  // @ts-ignore
  return reduce(obj, (r: any, curr: any, key: string) => {
    if (!keys.includes(key)) {
      r[key] = curr;
    }
    return r;
  }, {});
}
