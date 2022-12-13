import { DisplayObject } from '@antv/g';
import { LabelTransformComponent as LLC } from '../runtime';
import { OverlapHideTransform } from '../spec';
import { isOverlap, parseAABB } from '../utils/bounds';

export type OverlapHideOptions = Omit<OverlapHideTransform, 'type'>;

/**
 * Hide the label when overlap.
 */
export const OverlapHide: LLC<OverlapHideOptions> = (options) => {
  const { priority } = options;
  return (labels: DisplayObject[], coordinate) => {
    const displayLabels = [];
    // When overlap, will hide the next label.
    if (priority) labels.sort(priority);

    labels.forEach((l) => {
      l.attr('visibility', 'visible');

      const b1 = l.getLocalBounds();
      const overlaping = displayLabels.some((dl) =>
        isOverlap(parseAABB(b1), parseAABB(dl.getLocalBounds())),
      );

      if (overlaping) l.attr('visibility', 'hidden');
      else displayLabels.push(l);
    });

    return labels;
  };
};
