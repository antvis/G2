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
