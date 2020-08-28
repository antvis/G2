/** 判断两个数值是否相近 */
export function near(a: number, b: number, e: number = Number.EPSILON ** 0.5) {
  return Math.abs(a - b) < e;
}
