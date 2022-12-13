import { DisplayObject } from '@antv/g';
import { OverflowHideTransform } from '../spec';
import { LabelTransformComponent as LLC } from '../runtime';
import { isOverflow, parseAABB } from '../utils/bounds';

export type OverflowHideOptions = Omit<OverflowHideTransform, 'type'>;

/**
 * Hide the label when the label is overflowed from the element.
 */
export const OverflowHide: LLC<OverflowHideOptions> = (options) => {
  return (labels: DisplayObject[], coordinate) => {
    labels.forEach((l) => {
      l.attr('visibility', 'visible');

      const bounds = l.attr('bounds');
      const b = l.getLocalBounds();
      const overflow = isOverflow(parseAABB(b), bounds);
      if (overflow) l.attr('visibility', 'hidden');
    });
    return labels;
  };
};
