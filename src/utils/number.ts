/**
 * Clamp number within the inclusive range within the lower and upper bounds.
 */
export function clamp(v: number, lower: number, upper: number): number {
  return Math.max(lower, Math.min(v, upper));
}

/**
 * Precision conversion
 */
export function prettyNumber(n: number, precision = 10) {
  if (typeof n !== 'number') return n;
  if (Math.abs(n) < 1e-15) return n;
  // Values below 0.1 get one more decimal per leading zero, so that they keep
  // `precision` significant digits instead of being rounded to 0 (2e-11).
  const exponent = Math.floor(Math.log10(Math.abs(n)));
  const decimals = Math.max(precision, precision - exponent - 1);
  return parseFloat(n.toFixed(decimals));
}
