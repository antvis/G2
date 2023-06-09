import { DisplayObject } from '@antv/g';
import { LabelTransformComponent as LLC } from '../runtime';
import { OverlapHideLabelTransform } from '../spec';
import { isOverlap, parseAABB } from '../utils/bounds';
import { hide, show } from '../utils/style';

export type OverlapHideOptions = Omit<OverlapHideLabelTransform, 'type'>;

/**
 * Hide the label when overlap.
 */
export const OverlapHide: LLC<OverlapHideOptions> = (options) => {
  const { priority } = options;
  return (labels: DisplayObject[]) => {
    const displayLabels = [];
    // When overlap, will hide the next label.
    if (priority) labels.sort(priority);

    labels.forEach((l) => {
      show(l);

      const b1 = l.getLocalBounds();
      const overlaping = displayLabels.some((dl) =>
        isOverlap(parseAABB(b1), parseAABB(dl.getLocalBounds())),
      );

      if (overlaping) hide(l);
      else displayLabels.push(l);
    });

    return labels;
  };
};
