import { DisplayObject } from '@antv/g';
import { OverflowStrokeTransform } from '../spec';
import { LabelTransformComponent as LLC } from '../runtime';
import { parseToRGB } from '../utils/color';
import { isOverflow, parseAABB } from '../utils/bounds';
import { bboxOf } from '../interaction/utils';
import { mostContrast } from './utils';

export type OverflowStrokeOptions = Omit<OverflowStrokeTransform, 'type'>;

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
 * Reverse label stroke against label color.
 * More about contract, see https://webaim.org/resources/contrastchecker/
 */
export const OverflowStroke: LLC<OverflowStrokeOptions> = (options) => {
  const { palette = ['#000', '#fff'], threshold = 2 } = options;

  return (labels: DisplayObject[]) => {
    labels.forEach((l) => {
      const dependentElement = l.attr('dependentElement');
      const labelFill = l.attributes.fill ?? l.parsedStyle.fill ?? '#fff';

      const textBounds = parseAABB(getBoundsWithAnimation(l));
      const elementBounds = parseAABB(getBoundsWithAnimation(dependentElement));

      if (isOverflow(textBounds, elementBounds, threshold)) {
        // Add stroke to make overflowing text more visible.
        // Use the opposite color from palette for stroke.
        const strokeColor = mostContrast(parseToRGB(labelFill), palette);

        l.attr('stroke', strokeColor);
      } else {
        // Undefined can't set to attrs, have to remove.
        l.removeAttribute('stroke');
      }
    });
    return labels;
  };
};
