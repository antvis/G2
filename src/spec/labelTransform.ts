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
  /**
   * The boundary area to check for label overflow.
   * - 'view': Check against the entire view area (default)
   * - 'main': Check against the main area (excluding margins and paddings)
   */
  bounds?: 'view' | 'main';
  /**
   * The offset value that applies to both offsetX and offsetY.
   */
  offset?: number;
  /**
   * The X-axis offset, takes higher priority than offset.
   */
  offsetX?: number;
  /**
   * The Y-axis offset, takes higher priority than offset.
   */
  offsetY?: number;
};
