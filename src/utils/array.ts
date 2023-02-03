/**
 * Calls a defined callback function on each key:value of a object,
 * and returns a object contains the result.
 */
export function mapObject<T, U>(
  object: Record<string, T>,
  callbackfn: (value: T, key?: string, object?: Record<string, T>) => U,
): Record<string, U> {
  return Object.entries(object).reduce((obj, [key, value]) => {
    obj[key] = callbackfn(value, key, object);
    return obj;
  }, {});
}

export function indexOf<T>(array: T[]): number[] {
  return array.map((_, i) => i);
}

/**
 * @example [[1, 2, 3], ['a', 'b', 'c']] => [[1, 'a'], [2, 'b'], [3, 'c']]
 */
export function transpose<T>(matrix: T[][]): T[][] {
  const row = matrix.length;
  const col = matrix[0].length;
  // Note: new Array(col).fill(new Array(row)) is not ok!!!
  // Because in this case it will fill new Array(col) with the same array: new Array(row).
  const transposed = new Array(col).fill(0).map(() => new Array(row));
  for (let i = 0; i < col; i++) {
    for (let j = 0; j < row; j++) {
      transposed[i][j] = matrix[j][i];
    }
  }
  return transposed;
}

export function firstOf<T>(array: T[]) {
  return array[0];
}

export function lastOf<T>(array: T[]) {
  return array[array.length - 1];
}

export function isFlatArray<T>(array: (T | T[])[]): array is T[] {
  return !array.some(Array.isArray);
}

export function unique<T>(array: T[]): T[] {
  return Array.from(new Set(array));
}

export function divide<T>(
  array: T[],
  callbackfn: (item: T) => boolean,
): [T[], T[]] {
  const result: [T[], T[]] = [[], []];
  array.forEach((item) => {
    result[callbackfn(item) ? 0 : 1].push(item);
  });
  return result;
}

function comb<T>(array: T[], len = array.length): T[][] {
  if (len === 1) return array.map((item) => [item]);
  const result: T[][] = [];
  for (let i = 0; i < array.length; i++) {
    const rest = array.slice(i + 1);
    const restComb = comb(rest, len - 1);
    restComb.forEach((comb) => {
      result.push([array[i], ...comb]);
    });
  }
  return result;
}

/**
 * get all combinations of two elements in an array
 * @example [1, 2, 3] => [[1], [2], [3], [1, 2], [1, 3], [2, 3], [1, 2, 3]]
 * @param array
 * @returns
 */
export function combine<T>(array: T[]): T[][] {
  if (array.length === 1) return [array];
  const result: T[][] = [];
  for (let i = 1; i <= array.length; i++) {
    result.push(...comb(array, i));
  }
  return result;
}
