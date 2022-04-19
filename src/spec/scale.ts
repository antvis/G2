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
  | ThresholdScale
  | QuantizeScale
  | QuantileScale
  | CustomScale;

export type ScaleTypes =
  | 'linear'
  | 'ordinal'
  | 'identity'
  | 'band'
  | 'point'
  | 'time'
  | 'log'
  | 'pow'
  | 'threshold'
  | 'quantize'
  | 'quantile'
  | ScaleComponent;

export type BaseScale<T extends ScaleTypes, O> = {
  type?: T;
  palette?: Palette;
  guide?: Record<string, any>; // @todo
  field?: string | string[];
  independent?: boolean;
  zero?: boolean;
} & O;

export type LinearScale = BaseScale<'linear', LinearOptions>;

export type OrdinalScale = BaseScale<'ordinal', OrdinalOptions>;

export type IdentityScale = BaseScale<'identity', IdentityOptions>;

export type BandScale = BaseScale<'band', BandOptions>;

export type PointScale = BaseScale<'point', PointOptions>;

export type TimeScale = BaseScale<'time', TimeOptions>;

export type LogScale = BaseScale<'log', LogOptions>;

export type PowScale = BaseScale<'pow', PowOptions>;

export type ThresholdScale = BaseScale<'threshold', ThresholdOptions>;

export type QuantileScale = BaseScale<'quantile', QuantileOptions>;

export type QuantizeScale = BaseScale<'quantize', QuantizeOptions>;

export type CustomScale = BaseScale<ScaleComponent, { [key: string]: any }>;
