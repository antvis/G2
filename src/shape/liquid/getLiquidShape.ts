/**
 *
 * @param x 中心 x
 * @param y 中心 y
 * @param width 外接矩形的宽
 * @param height 外接矩形的高
 */
function circle(x: number, y: number, width: number, height: number) {
  const rx = width / 2;
  const ry = height / 2;
  return `
      M ${x} ${y - ry} 
      a ${rx} ${ry} 0 1 0 0 ${ry * 2}
      a ${rx} ${ry} 0 1 0 0 ${-ry * 2}
      Z
    `;
}

/**
 *
 * @param x 中心 x
 * @param y 中心 y
 * @param width 外接矩形的宽
 * @param height 外接矩形的高
 */
function rect(x: number, y: number, width: number, height: number) {
  const GOLDEN_SECTION_RATIO = 0.618;
  const h = height / 2;
  const w = (width / 2) * GOLDEN_SECTION_RATIO;
  return `
      M ${x - w} ${y - h}
      L ${x + w} ${y - h}
      L ${x + w} ${y + h}
      L ${x - w} ${y + h}
      Z
    `;
}

/**
 *
 * @param x 中心 x
 * @param y 中心 y
 * @param width 外接矩形的宽
 * @param height 外接矩形的高
 */
function diamond(x: number, y: number, width: number, height: number) {
  const h = height / 2;
  const w = width / 2;
  return `
      M ${x} ${y - h}
      L ${x + w} ${y}
      L ${x} ${y + h}
      L ${x - w} ${y}
      Z
    `;
}

/**
 *
 * @param x 中心 x
 * @param y 中心 y
 * @param width 外接矩形的宽
 * @param height 外接矩形的高
 */
function triangle(x: number, y: number, width: number, height: number) {
  const h = height / 2;
  const w = width / 2;
  return `
      M ${x} ${y - h}
      L ${x + w} ${y + h}
      L ${x - w} ${y + h}
      Z
    `;
}

/**
 *
 * @param x 中心 x
 * @param y 中心 y
 * @param width 外接矩形的宽
 * @param height 外接矩形的高
 */
function pin(x: number, y: number, width: number, height: number) {
  const w = (width * 2) / 3;
  const h = Math.max(w, height);
  const r = w / 2;

  // attrs of the upper circle
  const cx = x;
  const cy = r + y - h / 2;
  const theta = Math.asin(r / ((h - r) * 0.85));
  const dy = Math.sin(theta) * r;
  const dx = Math.cos(theta) * r;

  // the start point of the path
  const x0 = cx - dx;
  const y0 = cy + dy;

  // control point
  const cpX = x;
  const cpY = cy + r / Math.sin(theta);

  return `
      M ${x0} ${y0}
      A ${r} ${r} 0 1 1 ${x0 + dx * 2} ${y0}
      Q ${cpX} ${cpY} ${x} ${y + h / 2}
      Q ${cpX} ${cpY} ${x0} ${y0}
      Z 
    `;
}

export const getLiquidShape = (shape = 'circle') =>
  ({
    pin,
    rect,
    circle,
    diamond,
    triangle,
  }[shape] || circle);
