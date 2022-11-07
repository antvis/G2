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
