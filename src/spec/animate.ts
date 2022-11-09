export type AnimationTypes =
  | 'fadeIn'
  | 'fadeOut'
  | 'scaleInX'
  | 'scaleOutX'
  | 'scaleInY'
  | 'scaleOutY'
  | 'waveIn'
  | 'morphing'
  | 'zoomIn'
  | 'zoomOut';

export type Animation = {
  type?: AnimationTypes;
  duration?: number;
  delay?: number;
  easing?: string;
  fill?: 'forwards' | 'none' | 'backwards' | 'forwards' | 'both' | 'auto';
};
