import { DisplayObject } from '@antv/g';
import { OverflowHideTransform } from '../spec';
import { LabelTransformComponent as LLC } from '../runtime';
import { isOverflow } from '../utils/bounds';

export type OverflowHideOptions = Omit<OverflowHideTransform, 'type'>;

/**
 * Hide the label when the label is overflowed from the element.
 */
export const OverflowHide: LLC<OverflowHideOptions> = (options) => {
  return (labels: DisplayObject[], coordinate) => {
    labels.forEach((l) => {
      const bounds = l.attr('bounds');
      const { min, max } = l.getLocalBounds();
      const overflow = isOverflow(
        [
          [min[0], min[1]],
          [max[0], max[1]],
        ],
        bounds,
      );
      if (overflow) l.attr('visibility', 'hidden');
    });
    return labels;
  };
};
