import { color } from 'd3-color';

export type Color = {
  r: number;
  g: number;
  b: number;
};

export function parseToRGB(c: string | Color): Color {
  if (typeof c === 'object') return c;
  return color(c);
}
