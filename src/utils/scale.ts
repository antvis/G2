import { sort } from '@antv/vendor/d3-array';

export function isOrdinalScale(scale) {
  return !!scale.getBandWidth;
}

export function invert(scale, x) {
  if (!isOrdinalScale(scale)) return scale.invert(x);
  const domain = scale.getOptions().domain;
  const range = scale.adjustedRange;
  const step = scale.getStep();
  const bandwidth = scale.getBandWidth?.() ?? step;

  // compute centers of each band
  const centers = range.map((r) => r + bandwidth / 2);

  // find nearest center
  let min = Infinity;
  let index = 0;

  for (let i = 0; i < centers.length; i++) {
    const d = Math.abs(x - centers[i]);
    if (d < min) {
      min = d;
      index = i;
    }
  }

  return domain[index];
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
  const abstract = (point) => {
    const [px, py] = coordinate.invert(point);
    return [invert(scaleX, px), invert(scaleY, py)];
  };
  const p0 = abstract([x, y]);
  const p1 = abstract([x1, y1]);
  const domainX = domainOf(scaleX, p0[0] !== undefined ? [p0[0], p1[0]] : []);
  const domainY = domainOf(scaleY, p0[1] !== undefined ? [p0[1], p1[1]] : []);
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
