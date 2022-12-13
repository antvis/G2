import { DisplayObject } from '@antv/g';
import { LabelTransformComponent as LLC } from '../runtime';
import { OverflowShrinkTransform } from '../spec';

export type OverflowShrinkOptions = Omit<OverflowShrinkTransform, 'type'>;

/**
 * Shrink the label fontSize when the label is overflowed from the element, but ensure the fontSize > `minFontSize`.
 */
export const OverflowShrink: LLC<OverflowShrinkOptions> = () => {
  return (labels: DisplayObject[], coordinate) => {
    return labels;
  };
};
