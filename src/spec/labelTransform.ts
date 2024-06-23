import { DisplayObject } from '@antv/g';

export type LabelTransform =
  | OverlapHideLabelTransform
  | OverlapDodgeYLabelTransform
  | ContrastReverseLabelTransform
  | OverflowHideLabelTransform;

export type OverlapHideLabelTransform = {
  type?: 'overlapHide';
  /**
   * The hide priority, is the comparator for label.sort().
   */
  priority?: (a: DisplayObject, b: DisplayObject) => number;
};

export type OverlapDodgeYLabelTransform = {
  type?: 'overlapDodgeY';
  maxIterations?: number;
  maxError?: number;
  padding?: number;
};

export type ContrastReverseLabelTransform = {
  type: 'contrastReverse';
  /**
   * Transform when the contrast ratio < threshold.
   * Default is `4.5`.
   */
  threshold?: number;
  /**
   * The optional color palette, default is [#000, #fff].
   */
  palette?: string[];
};

export type OverflowHideLabelTransform = {
  type: 'overflowHide';
};

export type ExceedAdjustLabel = {
  type: 'exceedAdjust';
};
