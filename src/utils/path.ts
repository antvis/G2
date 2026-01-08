import { isArray } from '@antv/util';
import { path as d3Path } from '@antv/vendor/d3-path';
import { Vector2 } from '../runtime';

// Split path commands
export function splitPathCommands(d: string): string[] {
  return d
    .trim()
    .replaceAll('\n', '')
    .split(/(\s*)(?=[MmLlHhVvCcSsQqTtAaZz])/)
    .filter((s) => s.trim() !== '');
}

/**
 * Create rounded path
 * Generate SVG path with rounded corners based on given points array and corner radius
 *
 * @param points - Array of points, each point is a Vector2 object [x, y]
 * @param radius - Corner radius, can be a single number or an array of numbers
 *                 If an array, the radii are applied to corner points in sequence
 * @param closePath - Whether to close the path, defaults to false
 * @returns Generated SVG path string
 */
export function createRoundedPath(
  points: Vector2[],
  radius: number[] | number,
  closePath?: boolean,
) {
  const p = d3Path();
  // Process points array: if closing path, add extra points at start and end for smooth connection
  const _points = closePath
    ? [points[points.length - 1], ...points, points[0]]
    : [...points];

  p.moveTo(..._points.shift());

  let i = 0;
  // Iterate through points array, adding rounded corners to each corner point
  do {
    // Get radius for current corner (cycle through array if radius is an array)
    const _radius = isArray(radius) ? radius[i % radius.length] : radius;
    p.arcTo(..._points[0], ..._points[1], _radius);
    _points.shift();
    i++;
  } while (_points.length > 1);

  // If path needs to be closed
  if (closePath) {
    p.closePath();
    const newPath = p.toString();

    // Split path commands to handle special case for closed paths
    const borders = splitPathCommands(newPath);

    // If there are not enough commands, it means no arc was drawn.
    // The path is likely just a point or a line, so no special handling is needed.
    if (borders.length < 2) {
      return newPath;
    }
    // Remove the starting point, the last rounded corner has already drawn this point
    // Ensure the first command is a move command (M)
    borders.shift();
    borders[0] = 'M' + borders[0].slice(1);

    return borders.join(' ');
  }

  // For non-closed paths, add the final straight line
  p.lineTo(..._points[_points.length - 1]);
  const newPath = p.toString();

  return newPath;
}
