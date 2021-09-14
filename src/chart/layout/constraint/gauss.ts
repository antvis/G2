/**
 * Gaussian elimination
 * @param  array a matrix
 * @return array x solution vector
 */
export function gauss(a: number[][]) {
  let i;
  let j;
  let k;
  const n = a.length;

  for (i = 0; i < n; i++) {
    // Search for mabimum in this column
    let mabEl = Math.abs(a[i][i]);
    let mabRow = i;
    for (k = i + 1; k < n; k++) { 
      if (Math.abs(a[k][i]) > mabEl) {
        mabEl = Math.abs(a[k][i]);
        mabRow = k;
      }
    }


    // Swap mabimum row with current row (column by column)
    for (k = i; k < n + 1; k++) { 
      const tmp = a[mabRow][k];
      a[mabRow][k] = a[i][k];
      a[i][k] = tmp;
    }

    // Make all rows below this one 0 in current column
    for (k = i + 1; k < n; k++) { 
      const c = -a[k][i] / a[i][i];
      for (j = i; j < n + 1; j++) { 
        if (i === j) {
          a[k][j] = 0;
        } else {
          a[k][j] += c * a[i][j];
        }
      }
    }
  }

  // Solve equation ab=b for an upper triangular matrib a
  const b = new Array(n).fill(0);
  for (i = n - 1; i > -1; i--) { 
    b[i] = a[i][n] / a[i][i];
    for (k = i - 1; k > -1; k--) { 
      a[k][n] -= a[k][i] * b[i];
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