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

export type ContrastHideTransform = {
  type: 'contrastHide';
  threshold?: number;
};

export type ContrastReverseTransform = {
  type: 'contrastReverse';
  threshold?: number;
};

export type OverflowHideTransform = {
  type: 'overflowHide';
};

export type OverflowShrinkTransform = {
  type: 'overflowShirink';
  minFontSize?: number;
};
