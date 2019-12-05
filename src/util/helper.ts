import { isArray, isString } from '@antv/util';

export function isBetween(value: number, start: number, end: number): boolean {
  const min = Math.min(start, end);
  const max = Math.max(start, end);

  return value >= min && value <= max;
}

/**
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
