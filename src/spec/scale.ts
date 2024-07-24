import {
  LinearOptions,
  OrdinalOptions,
  IdentityOptions,
  BandOptions,
  PointOptions,
  TimeOptions,
  LogOptions,
  PowOptions,
  ThresholdOptions,
  QuantileOptions,
  QuantizeOptions,
  SqrtOptions,
  SequentialOptions,
  ConstantOptions,
  Linear,
  Log,
  Pow,
  Sqrt,
  Time,
} from '@antv/scale';
import { ScaleComponent } from '../runtime';
import { Palette } from './palette';

export type Scale =
  | LinearScale
  | OrdinalScale
  | IdentityScale
  | BandScale
  | PointScale
  | TimeScale
  | LogScale
  | PowScale
  | SqrtScale
  | ThresholdScale
  | QuantizeScale
  | QuantileScale
  | SequentialScale
  | CustomScale
  | ConstantScale;

export type ScaleTypes =
  | 'linear'
  | 'ordinal'
  | 'identity'
  | 'band'
  | 'point'
  | 'time'
  | 'log'
  | 'pow'
  | 'sqrt'
  | 'threshold'
  | 'quantize'
  | 'quantile'
  | 'sequential'
  | 'constant'
  | ScaleComponent;

type QuantitativeScale = Linear | Log | Pow | Sqrt | Time;

export type BaseScale<T extends ScaleTypes, O> = {
  type?: T;
  palette?: Palette['type'] | string;
  rangeMax?: number;
  rangeMin?: number;
  domainMax?: number;
  domainMin?: number;
  key?: string;
  facet?: boolean;
  independent?: boolean;
  zero?: boolean;
  offset?: (t: number) => number;
  relations?: [any, any][];
  groupTransform?: (scales: QuantitativeScale[]) => void;
} & O;

export type LinearScale = BaseScale<'linear', LinearOptions>;

export type OrdinalScale = BaseScale<'ordinal', OrdinalOptions>;

export type IdentityScale = BaseScale<'identity', IdentityOptions>;

export type BandScale = BaseScale<'band', BandOptions>;

export type PointScale = BaseScale<'point', PointOptions>;

export type TimeScale = BaseScale<'time', TimeOptions>;

export type LogScale = BaseScale<'log', LogOptions>;

export type PowScale = BaseScale<'pow', PowOptions>;

export type SqrtScale = BaseScale<'sqrt', SqrtOptions>;

export type ThresholdScale = BaseScale<'threshold', ThresholdOptions>;

export type QuantileScale = BaseScale<'quantile', QuantileOptions>;

export type QuantizeScale = BaseScale<'quantize', QuantizeOptions>;

export type SequentialScale = BaseScale<'sequential', SequentialOptions>;

export type ConstantScale = BaseScale<'constant', ConstantOptions>;

export type CustomScale = BaseScale<ScaleComponent, { [key: string]: any }>;
