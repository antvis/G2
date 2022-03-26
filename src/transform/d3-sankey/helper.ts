export function constant(x: any) {
  return function () {
    return x;
  };
}

export function sumBy(arr, func) {
  let r = 0;
  for (let i = 0; i < arr.length; i++) {
    r += func(arr[i]);
  }

  return r;
}

/**
 * 计算最大值
 * @param arr
 * @param func
 */
export function maxValueBy(arr, func): number {
  let r = -Infinity;
  for (let i = 0; i < arr.length; i++) {
    r = Math.max(func(arr[i]), r);
  }

  return r;
}

/**
 * 计算最小值
 * @param arr
 * @param func
 */
export function minValueBy(arr, func): number {
  let r = Infinity;
  for (let i = 0; i < arr.length; i++) {
    r = Math.min(func(arr[i]), r);
  }

  return r;
}
