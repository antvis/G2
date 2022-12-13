export type LabelTransform = HideOverlapLabelTransform | DodgeYLabelTransform;

export type HideOverlapLabelTransform = {
  type?: 'hideOverlap';
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
