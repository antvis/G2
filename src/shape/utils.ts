import { path as d3path } from 'd3-path';
import { Primitive, Vector2 } from '../runtime';
import { Selection } from '../utils/selection';

export function applyStyle(
  selection: Selection,
  style: Record<string, Primitive>,
) {
  for (const [key, value] of Object.entries(style)) {
    selection.style(key, value);
  }
}

/**
 * Draw polygon path with points.
 * @param points
 */
export function polygon(points: Vector2[]) {
  const path = d3path();
  points.forEach((p, idx) =>
    idx === 0 ? path.moveTo(p[0], p[1]) : path.lineTo(p[0], p[1]),
  );
  path.closePath();
  return path.toString();
}
