import { DisplayObject } from '@antv/g';
import { maxIndex } from 'd3-array';
import { ContrastReverseLabelTransform } from '../spec';
import { LabelTransformComponent as LLC } from '../runtime';
import { parseToRGB } from '../utils/color';

export type ContrastReverseOptions = Omit<
  ContrastReverseLabelTransform,
  'type'
>;

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
function contrast(foreground, background): number {
  const { r, g, b } = foreground;
  const { r: rb, g: gb, b: bb } = background;
  const L1 = getL(r, g, b);
  const L2 = getL(rb, gb, bb);
  return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
}

/**
 * Reverse color for max contrast.
 */
function mostContrast(color, palette: string[]): string {
  const i = maxIndex(palette, (c) => contrast(color, parseToRGB(c)));
  return palette[i];
}

/**
 * Reverse the label color when the contrast is lower then `threshold`.
 * The default value of `threshold` is 4.5.
 * More about contract, see https://webaim.org/resources/contrastchecker/
 */
export const ContrastReverse: LLC<ContrastReverseOptions> = (options) => {
  const { threshold = 4.5, palette = ['#000', '#fff'] } = options;
  return (labels: DisplayObject[]) => {
    labels.forEach((l) => {
      const background = l.attr('dependentElement').parsedStyle.fill;
      const foreground = l.parsedStyle.fill;
      const c = contrast(foreground, background);
      if (c < threshold) l.attr('fill', mostContrast(background, palette));
    });
    return labels;
  };
};
