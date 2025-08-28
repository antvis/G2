import { bisectLeft, sort } from '@antv/vendor/d3-array';

function constrain(x, lo, hi) {
  return Math.min(hi, Math.max(lo, x));
}

export function isOrdinalScale(scale) {
  return !!scale.getBandWidth;
}

export function invert(scale, x, start) {
  if (!isOrdinalScale(scale)) return scale.invert(x);
  const { adjustedRange } = scale;
  if (adjustedRange.includes(x)) {
    return scale.invert(x);
  }
  const { domain } = scale.getOptions();
  const offset = start ? -1 : 0;
  const step = scale.getStep();
  const range = start ? adjustedRange : adjustedRange.map((d) => d + step);
  // R[i0 - 1] < x <= R[i0]
  const i0 = bisectLeft(range, x);
  const i1 = constrain(i0 + offset, 0, domain.length - 1);
  return domain[i1];
}

export function domainOf(scale, values, ratioX?) {
  if (!values) return scale.getOptions().domain;
  if (!isOrdinalScale(scale)) {
    const sortedDomain = sort(values);
    if (!ratioX) return sortedDomain;
    const [d] = sortedDomain;
    const { range } = scale.getOptions();
    const [r0, r1] = range;
    const v = r0 > r1 ? -1 : 1;
    const d1 = scale.invert(scale.map(d) + v * ratioX);
    return [d, d1];
  }
  const { domain } = scale.getOptions();
  const v1 = values[0];
  const start = domain.indexOf(v1);
  if (ratioX) {
    const end = start + Math.round(domain.length * ratioX);
    return domain.slice(start, end);
  }
  const v2 = values[values.length - 1];
  const end = domain.indexOf(v2);
  return domain.slice(start, end + 1);
}

export function selectionOf(x, y, x1, y1, scale, coordinate) {
  const { x: scaleX, y: scaleY } = scale;
  const abstractDomain = (point, start) => {
    const [x, y] = coordinate.invert(point);
    return [invert(scaleX, x, start), invert(scaleY, y, start)];
  };
  const p0 = abstractDomain([x, y], true);
  const p1 = abstractDomain([x1, y1], false);
  const domainX = domainOf(scaleX, [p0[0], p1[0]]);
  const domainY = domainOf(scaleY, [p0[1], p1[1]]);
  return [domainX, domainY];
}

export function abstractOf(domain, scale) {
  const [d0, d1] = domain;
  const maybeStep = (scale) => (scale.getStep ? scale.getStep() : 0);
  return [scale.map(d0), scale.map(d1) + maybeStep(scale)];
}

// For slider display, use direct index-based mapping instead of scale.map()
// to avoid inaccuracies caused by padding, band width, etc.
export const sliderAbstractOf = (domain, scale) => {
  const [d0, d1] = domain;
  const scaleDomain = scale.getOptions?.()?.domain || [];

  const index0 = scaleDomain.indexOf(d0);
  const index1 = scaleDomain.indexOf(d1);

  if (index0 === -1 || index1 === -1) {
    return [scale.map(d0), scale.map(d1)];
  }

  const count = scaleDomain.length;
  if (count <= 1) {
    return [0, 1];
  }

  return [index0 / (count - 1), index1 / (count - 1)];
};

export function pixelsOf(selection, scale, coordinate) {
  const { x: scaleX, y: scaleY } = scale;
  const [X, Y] = selection;
  const AX = abstractOf(X, scaleX);
  const AY = abstractOf(Y, scaleY);
  const p0 = [AX[0], AY[0]];
  const p1 = [AX[1], AY[1]];
  const [x, y] = coordinate.map(p0);
  const [x1, y1] = coordinate.map(p1);
  return [x, y, x1, y1];
}
