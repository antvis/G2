import {
  LinearOptions,
  OrdinalOptions,
  IdentityOptions,
  BandOptions,
  PointOptions,
  TimeOptions,
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
  | CustomScale;

export type ScaleTypes =
  | 'linear'
  | 'ordinal'
  | 'identity'
  | 'band'
  | 'point'
  | 'time'
  | ScaleComponent;

export type BaseScale<T extends ScaleTypes, O> = {
  type?: T;
  palette?: Palette;
  guide?: Record<string, any>; // @todo
  field?: string;
  independent?: boolean;
  zero?: boolean;
} & O;

export type LinearScale = BaseScale<'linear', LinearOptions>;

export type OrdinalScale = BaseScale<'ordinal', OrdinalOptions>;

export type IdentityScale = BaseScale<'identity', IdentityOptions>;

export type BandScale = BaseScale<'band', BandOptions>;

export type PointScale = BaseScale<'point', PointOptions>;

export type TimeScale = BaseScale<'time', TimeOptions>;

export type CustomScale = BaseScale<ScaleComponent, { [key: string]: any }>;
