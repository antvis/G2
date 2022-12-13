import { DisplayObject } from '@antv/g';
import { LabelTransformComponent as LLC } from '../runtime';
import { ContrastHideTransform } from '../spec';

export type ContrastHideOptions = Omit<ContrastHideTransform, 'type'>;

/**
 * Hide the label when the contrast is lower then `threshold`.
 * The default value of `threshold` is xx.
 */
export const ContrastHide: LLC<ContrastHideOptions> = () => {
  return (labels: DisplayObject[], coordinate) => {
    return labels;
  };
};
