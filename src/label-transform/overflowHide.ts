import { DisplayObject } from '@antv/g';
import { OverflowHideLabelTransform } from '../spec';
import { LabelTransformComponent as LLC } from '../runtime';
import { isOverflow, parseAABB } from '../utils/bounds';
import { hide, show } from '../utils/style';

export type OverflowHideOptions = Omit<OverflowHideLabelTransform, 'type'>;

/**
 * Hide the label when the label is overflowed from the element.
 */
export const OverflowHide: LLC<OverflowHideOptions> = () => {
  return (labels: DisplayObject[]) => {
    labels.forEach((l) => {
      show(l);
      const bounds = l.attr('bounds');
      const b = l.getLocalBounds();
      const overflow = isOverflow(parseAABB(b), bounds);
      if (overflow) hide(l);
    });
    return labels;
  };
};
