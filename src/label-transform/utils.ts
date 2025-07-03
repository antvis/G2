import { maxIndex } from '@antv/vendor/d3-array';
import { parseToRGB } from '../utils/color';

function getsRGB(s: number) {
  let c = s / 255;
  c = c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  return c;
}

function getL(r: number, g: number, b: number) {
  return 0.2126 * getsRGB(r) + 0.7152 * getsRGB(g) + 0.0722 * getsRGB(b);
}

/**
 * Calculate the contrast. see https://webaim.org/resources/contrastchecker/
 * @param foreground
 * @param background
 */
export function contrast(foreground, background): number {
  if (!foreground || !background || foreground === background) return 1;
  const { r, g, b } = foreground;
  const { r: rb, g: gb, b: bb } = background;
  const L1 = getL(r, g, b);
  const L2 = getL(rb, gb, bb);
  return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
}

/**
 * Reverse color for max contrast.
 */
export function mostContrast(color, palette: string[]): string {
  const i = maxIndex(palette, (c) => contrast(color, parseToRGB(c)));
  return palette[i];
}
