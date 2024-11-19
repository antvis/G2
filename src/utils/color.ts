import { parseColor } from '@antv/g';

export type Color = {
  r: number;
  g: number;
  b: number;
};

export function parseToRGB(c: string | Color): Color {
  if (typeof c === 'object') return c;
  const out = parseColor(c) as Color;
  if (
    typeof out?.r !== 'number' ||
    typeof out?.g !== 'number' ||
    typeof out?.b !== 'number'
  ) {
    console.warn(`parseToRGB: Invalid color: ${c}`);
  }
  return out;
}
