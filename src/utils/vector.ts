export type Vector2 = [number, number];

export function sub([x1, y1]: Vector2, [x2, y2]: Vector2): Vector2 {
  return [x1 - x2, y1 - y2];
}

export function dist([x0, y0]: Vector2, [x1, y1]: Vector2): number {
  return Math.sqrt((x0 - x1) ** 2 + (y0 - y1) ** 2);
}

export function angle([x, y]: Vector2): number {
  const theta = Math.atan2(y, x);
  return theta;
}
