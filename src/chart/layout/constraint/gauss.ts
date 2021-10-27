/**
 * Gaussian elimination
 * @param  array a matrix
 * @return array x solution vector
 */
export function gauss(a: number[][]): number[] {
  const row = a.length;
  const col = a[0].length;

  const m = row; // 方程的个数
  const n = col - 1; // 变量的个数(最后一列是常量)

  /**
   * 先对 a 进行排序，排序规则为：
   * - 第 i 列对应从 i 行到最后一行的最大值，放到当前行
   */
  for (let i = 0; i < n; i++) {
    // 1. 找到这一列的最大值、已经行索引
    let max = Number.MIN_SAFE_INTEGER;
    let maxRow;
    // 找到这一列的最大值、已经行索引
    for (let j = i; j < m; j++) {
      if (Math.abs(a[j][i]) > max) {
        max = Math.abs(a[j][i]);
        maxRow = j;
      }
    }

    // 2. 找到这一列的最大值之后，交换行
    const tmp = a[maxRow];
    a[maxRow] = a[i];
    a[i] = tmp;

    // 3. 这一行下面，在这一列上的数据全部为 0
    for (let j = i + 1; j < m; j++) {
      // 配平系数
      const c = -a[j][i] / a[i][i];
      // 这一行的元素全部处理
      for (let k = i; k < n + 1; k++) {
        a[j][k] += c * a[i][k];
      }
    }
  }

  /**
   * 反向迭代，计算变量值
   */
  const b = new Array(n).fill(0);

  // 只有 n 个变量（n 后的方程直接忽略）
  for (let i = n - 1; i >= 0; i--) {
    b[i] = a[i][n] / a[i][i];

    // 向上带入归零
    for (let j = i - 1; j >= 0; j--) {
      const c = -a[j][i] / a[i][i];
      a[j][i] += a[i][i] * c;
      a[j][n] += a[i][n] * c;
    }
  }

  return b;
}

/**
 * 乘法
 * @param v
 */
export function multiply(v: number[]) {
  return v.reduce((r, c) => r * c, 1);
}
