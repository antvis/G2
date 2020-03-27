import { isArray, isString } from '@antv/util';

/**
 * @ignore
 * Determines whether between is
 * @param value
 * @param start
 * @param end
 * @returns true if between
 */
export function isBetween(value: number, start: number, end: number): boolean {
  const min = Math.min(start, end);
  const max = Math.max(start, end);

  return value >= min && value <= max;
}

/**
 * @ignore
 * pads the current string/array with a given value (repeated, if needed) so that the resulting reaches a given length.
 * The padding is applied from the end of the current value.
 *
 * @param source
 * @param targetLength
 * @param padValue
 * @returns
 */
export function padEnd(source: string | any[], targetLength: number, padValue: any) {
  if (isString(source)) {
    return source.padEnd(targetLength, padValue);
  } else if (isArray(source)) {
    const sourceLength = source.length;
    if (sourceLength < targetLength) {
      const diff = targetLength - sourceLength;
      for (let i = 0; i < diff; i++) {
        source.push(padValue);
      }
    }
  }

  return source;
}

/**
 * @ignore
 * omit keys of an object.
 * @param obj
 * @param keys
 */
export function omit<T = any>(obj: T, keys: string[]): T {
  keys.forEach((key: string) => {
    delete obj[key];
  });

  return obj;
}

/**
 * @ignore
 * @param sourceArray
 * @param targetArray
 * @param map
 */
export function uniq(sourceArray: any[], targetArray: any[] = [], map: object = {}) {
  for (const source of sourceArray) {
    if (!map[source]) {
      targetArray.push(source);
      map[source] = true;
    }
  }
  return targetArray;
}
