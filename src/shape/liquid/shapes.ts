/**
 * @param x center x
 * @param y center y
 * @param radius
 */
function circle(x: number, y: number, r: number) {
  return `
      M ${x} ${y - r} 
      a ${r} ${r} 0 1 0 0 ${r * 2}
      a ${r} ${r} 0 1 0 0 ${-r * 2}
      Z
    `;
}

/**
 * @param x center x
 * @param y center y
 * @param radius
 */
function rect(x: number, y: number, r: number) {
  const GOLDEN_SECTION_RATIO = 0.618;
  const w = r * GOLDEN_SECTION_RATIO;
  return `
      M ${x - w} ${y - r}
      L ${x + w} ${y - r}
      L ${x + w} ${y + r}
      L ${x - w} ${y + r}
      Z
    `;
}

/**
 * @param x center x
 * @param y center y
 * @param radius
 */
function diamond(x: number, y: number, r: number) {
  return `
      M ${x} ${y - r}
      L ${x + r} ${y}
      L ${x} ${y + r}
      L ${x - r} ${y}
      Z
    `;
}

/**
 * @param x center x
 * @param y center y
 * @param radius
 */
function triangle(x: number, y: number, r: number) {
  return `
      M ${x} ${y - r}
      L ${x + r} ${y + r}
      L ${x - r} ${y + r}
      Z
    `;
}

/**
 * @param x center x
 * @param y center y
 * @param radius
 */
function pin(x: number, y: number, radius: number) {
  const w = (radius * 4) / 3;
  const h = Math.max(w, radius * 2);
  const r = w / 2;

  // Attrs of the upper circle.
  const cx = x;
  const cy = r + y - h / 2;
  const theta = Math.asin(r / ((h - r) * 0.85));
  const dy = Math.sin(theta) * r;
  const dx = Math.cos(theta) * r;

  // The start point of the path.
  const x0 = cx - dx;
  const y0 = cy + dy;

  // Control point.
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

export const LiquidShapesPath = {
  pin,
  rect,
  circle,
  diamond,
  triangle,
};
