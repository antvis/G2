// need some basic operations on vectors, rather than adding a dependency,
// just define here
export function zeros(x) {
  const r = new Array(x);
  for (let i = 0; i < x; ++i) {
    r[i] = 0;
  }
  return r;
}
export function zerosM(x, y) {
  return zeros(x).map(() => zeros(y));
}

export function dot(a, b) {
  let ret = 0;
  for (let i = 0; i < a.length; ++i) {
    ret += a[i] * b[i];
  }
  return ret;
}

export function norm2(a) {
  return Math.sqrt(dot(a, a));
}

export function scale(ret, value, c?: any) {
  for (let i = 0; i < value.length; ++i) {
    ret[i] = value[i] * c;
  }
}

export function weightedSum(ret, w1, v1, w2, v2) {
  for (let j = 0; j < ret.length; ++j) {
    ret[j] = w1 * v1[j] + w2 * v2[j];
  }
}

export function gemv(output, A, x) {
  for (let i = 0; i < output.length; ++i) {
    output[i] = dot(A[i], x);
  }
}
