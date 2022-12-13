import { DisplayObject } from '@antv/g';
import { LabelTransformComponent as LLC } from '../runtime';
import { ContrastReverseTransform } from '../spec';

export type ContrastReverseOptions = Omit<ContrastReverseTransform, 'type'>;

/**
 * Reverse the label color when the contrast is lower then `threshold`.
 * The default value of `threshold` is xx.
 */
export const ContrastReverse: LLC<ContrastReverseOptions> = () => {
  return (labels: DisplayObject[], coordinate) => {
    return labels;
  };
};
