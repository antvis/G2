import { bisectLeft, sort } from 'd3-array';

function isOrdinalScale(scale) {
  return scale.getBandWidth;
}

function constrain(x, lo, hi) {
  return Math.min(hi, Math.max(lo, x));
}

export function invert(scale, x, start) {
  if (!isOrdinalScale(scale)) return scale.invert(x);
  const { adjustedRange } = scale;
  const { domain } = scale.getOptions();
  const offset = start ? -1 : 0;
  const step = scale.getStep();
  const range = start ? adjustedRange : adjustedRange.map((d) => d + step);
  // R[i0 - 1] < x <= R[i0]
  const i0 = bisectLeft(range, x);
  const i1 = constrain(i0 + offset, 0, domain.length - 1);
  return domain[i1];
}

export function domainOf(scale, values) {
  if (!isOrdinalScale(scale)) return sort(values);
  const { domain } = scale.getOptions();
  const [v1, v2] = values;
  const start = domain.indexOf(v1);
  const end = domain.indexOf(v2);
  return domain.slice(start, end + 1);
}
