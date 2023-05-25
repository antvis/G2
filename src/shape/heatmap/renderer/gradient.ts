import { HeatmapGradient } from './types';

/**
 * Parse heatmap gradient.
 */
export function parseGradient(
  gradient: HeatmapGradient,
): Array<[number, string]> {
  if (typeof gradient === 'string') {
    return gradient.split(' ').map((stop) => {
      const [r, c] = stop.split(':');
      return [+r, c];
    });
  }
  return gradient;
}
