export type Vector2 = [number, number];

export function sub([x1, y1]: Vector2, [x2, y2]: Vector2): Vector2 {
  return [x1 - x2, y1 - y2];
}

export function dist([x0, y0]: Vector2, [x1, y1]: Vector2): number {
  return Math.sqrt((x0 - x1) ** 2 + (y0 - y1) ** 2);
}

/**
 * Calculate angle of [x, y] from -Math.PI / 2.
 */
export function angle([x, y]: Vector2): number {
  const theta = Math.atan2(y, x) + Math.PI / 2;
  return theta;
}

export function angleBetween(v0: Vector2, v1: Vector2): number {
  const a0 = angle(v0);
  const a1 = angle(v1);
  if (a0 < a1) return a1 - a0;
  return Math.PI * 2 - (a0 - a1);
}

export function calcBBox(points: Vector2[]) {
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  for (const [x, y] of points) {
    minX = Math.min(x, minX);
    maxX = Math.max(x, maxX);
    minY = Math.min(y, minY);
    maxY = Math.max(y, maxY);
  }
  const width = maxX - minX;
  const height = maxY - minY;
  return [minX, minY, width, height];
}
