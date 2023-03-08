export const ContinuousScale = {
  linear: 'linear',
  identity: 'identity',
  log: 'log',
  pow: 'pow',
  sqrt: 'sqrt',
  sequential: 'sequential',
} as const;

export const DistributionScale = {
  threshold: 'threshold',
  quantize: 'quantize',
  quantile: 'quantile',
} as const;

export const DiscreteScale = {
  ordinal: 'ordinal',
  band: 'band',
  point: 'point',
} as const;

export const ConstantScale = {
  constant: 'constant',
} as const;
