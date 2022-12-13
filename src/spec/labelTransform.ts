import { DisplayObject } from '@antv/g';

export type LabelTransform =
  | OverlapHideTransform
  | DodgeYLabelTransform
  | ContrastReverseTransform
  | OverflowHideTransform;

export type OverlapHideTransform = {
  type?: 'overlapHide';
  /**
   * The hide priority, is the comparator for label.sort().
   */
  priority?: (a: DisplayObject, b: DisplayObject) => number;
};

export type DodgeYLabelTransform = {
  type?: 'dodgeY';
  maxIter?: number;
  maxError?: number;
  padding?: number;
};

export type SpiderLabelTransform = {
  type?: 'spider';
  edgeDistance?: string | number;
};

export type SurroundLabelTransform = {
  type?: 'surround';
};

export type ContrastReverseTransform = {
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

export type OverflowHideTransform = {
  type: 'overflowHide';
};
