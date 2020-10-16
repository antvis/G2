import { reduce, isNumber } from '@antv/util';

/**
 * 获得中位数
 * @param array
 */
export function getMedian(array: number[]) {
  const arr = [...array];
  // 先排序
  arr.sort((a: number, b: number) => {
    return a - b;
  });

  const len = arr.length;

  // median
  // 0
  if (len === 0) {
    return 0
  }

  // 奇数
  if (len % 2 === 1) {
    return arr[(len - 1) / 2];
  }

  // 偶数
  return (arr[len / 2] + arr[len / 2 - 1]) / 2;
}

/**
 * 获得平均值
 * @param array
 */
export function getMean(array: number[]) {
  const sum = reduce(array, (r: number, num: number) => {
    return r += (isNaN(num) || !isNumber(num) ? 0 : num);
  }, 0);

  return array.length === 0 ? 0 : sum / array.length;
}