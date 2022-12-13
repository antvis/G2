import { DisplayObject } from '@antv/g';
import { LabelTransformComponent as LLC } from '../runtime';
import { OverflowHideTransform } from '../spec';

export type OverflowHideOptions = Omit<OverflowHideTransform, 'type'>;

/**
 * Hide the label when the label is overflowed from the element.
 */
export const OverflowHide: LLC<OverflowHideOptions> = () => {
  return (labels: DisplayObject[], coordinate) => {
    return labels;
  };
};
