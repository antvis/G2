import { DisplayObject } from '@antv/g';
import { maxIndex } from '@antv/vendor/d3-array';
import { isUndefined } from '@antv/util';
import { ContrastReverseLabelTransform } from '../spec';
import { LabelTransformComponent as LLC } from '../runtime';
import { parseToRGB } from '../utils/color';
import { isOverflow, parseAABB } from '../utils/bounds';
import { bboxOf } from '../interaction/utils';

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
function mostContrast(color, palette: string[]): string {
  const i = maxIndex(palette, (c) => contrast(color, parseToRGB(c)));
  return palette[i];
}

/**
 * Get bounds of element considering animation state.
 * If element has animations, get the final state bounds.
 */
function getBoundsWithAnimation(element: DisplayObject) {
  const animations = element.getAnimations();

  // If no animations, use regular bboxOf.
  if (!animations || animations.length === 0) {
    return bboxOf(element);
  }

  // Clone element and apply final animation state.
  const cloneElement = element.cloneNode(true) as DisplayObject;
  cloneElement.style.visibility = 'hidden';

  animations.forEach((animation) => {
    const keyframes = animation.effect.getKeyframes();
    if (keyframes && keyframes.length > 0) {
      cloneElement.attr(keyframes[keyframes.length - 1]);
    }
  });

  element.parentNode?.appendChild(cloneElement);
  const bounds = bboxOf(cloneElement);
  cloneElement.destroy();

  return bounds;
}

/**
 * Reverse the label color when the contrast is lower then `threshold`.
 * The default value of `threshold` is 4.5.
 * More about contract, see https://webaim.org/resources/contrastchecker/
 */
export const ContrastReverse: LLC<ContrastReverseOptions> = (options) => {
  const {
    autoStroke = false,
    threshold = 4.5,
    palette = ['#000', '#fff'],
  } = options;

  return (labels: DisplayObject[]) => {
    labels.forEach((l) => {
      const dependentElement = l.attr('dependentElement');
      const background = dependentElement.parsedStyle.fill;
      const foreground = l.parsedStyle.fill;
      const c = contrast(foreground, background);

      // Apply contrast reverse if needed.
      if (c < threshold) {
        const reversedColor = mostContrast(background, palette);
        l.attr('fill', reversedColor);

        // Check if text bbox overflows the dependent element.
        if (autoStroke) {
          // Save original stroke properties only if not already saved.
          if (!l.attr('_originalStyleSaved')) {
            l.attr('_originalStroke', l.attr('stroke'));
            l.attr('_originalLineWidth', l.attr('lineWidth'));
            l.attr('_originalStyleSaved', true);
          }

          const textBounds = parseAABB(getBoundsWithAnimation(l));
          const elementBounds = parseAABB(
            getBoundsWithAnimation(dependentElement),
          );

          if (isOverflow(textBounds, elementBounds)) {
            // Add stroke to make overflowing text more visible.
            // Use the opposite color from palette for stroke.
            const strokeColor = mostContrast(
              parseToRGB(reversedColor),
              palette,
            );

            l.attr('stroke', strokeColor);
            l.attr(
              'lineWidth',
              (autoStroke as { lineWidth: number })?.lineWidth ?? 1.6,
            );
          } else {
            // Restore original stroke properties if not overflowing.
            l.attr({
              stroke: l.attr('_originalStroke'),
              lineWidth: l.attr('_originalLineWidth'),
            });

            // Undefined can't set to attrs, have to remove.
            if (isUndefined(l.attr('_originalStroke')))
              l.removeAttribute('stroke');
            if (isUndefined(l.attr('_originalLineWidth')))
              l.removeAttribute('lineWidth');
          }
        }
      }
    });
    return labels;
  };
};
