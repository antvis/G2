/**
 * Clamp number within the inclusive range within the lower and upper bounds.
 */
export function clamp(v: number, lower: number, upper: number): number {
  return Math.max(lower, Math.min(v, upper));
}
