export enum ContinuousScale {
  linear = 'linear',
  identity = 'identity',
  log = 'log',
  pow = 'pow',
  sqrt = 'sqrt',
  sequential = 'sequential',
}

export enum CategoryScale {
  threshold = 'threshold',
  quantize = 'quantize',
  quantile = 'quantile',
}

export enum DiscreteScale {
  ordinal = 'ordinal',
  band = 'band',
  point = 'point',
}
