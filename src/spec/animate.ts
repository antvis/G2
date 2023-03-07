export type Animation =
  | FadeInAnimation
  | FadeOutAnimation
  | ScaleInXAnimation
  | ScaleOutXAnimation
  | ScaleInYAnimation
  | ScaleOutYAnimation
  | WaveInAnimation
  | MorphingAnimation
  | ZoomInAnimation
  | ZoomOutYAnimation
  | PathInAnimation
  | GrowInXAnimation
  | GrowInYAnimation;

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
  | 'zoomOut'
  | 'pathIn'
  | 'growInX'
  | 'growInY';

export type FadeInAnimation = BaseAnimation<'fadeIn'>;

export type FadeOutAnimation = BaseAnimation<'fadeOut'>;

export type ScaleInXAnimation = BaseAnimation<'scaleInX'>;

export type ScaleOutXAnimation = BaseAnimation<'scaleOutX'>;

export type ScaleInYAnimation = BaseAnimation<'scaleInY'>;

export type ScaleOutYAnimation = BaseAnimation<'scaleOutY'>;

export type WaveInAnimation = BaseAnimation<'waveIn'>;

export type MorphingAnimation = BaseAnimation<'morphing'>;

export type ZoomInAnimation = BaseAnimation<'zoomIn'>;

export type ZoomOutYAnimation = BaseAnimation<'zoomOut'>;

export type PathInAnimation = BaseAnimation<'pathIn'>;

export type GrowInXAnimation = BaseAnimation<'growInX'>;

export type GrowInYAnimation = BaseAnimation<'growInY'>;

type BaseAnimation<T> = {
  type?: T;
  duration?: number;
  delay?: number;
  easing?: string;
  fill?: 'forwards' | 'none' | 'backwards' | 'both' | 'auto';
};
