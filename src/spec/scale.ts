import {
  LinearOptions,
  OrdinalOptions,
  IdentityOptions,
  BandOptions,
} from '@antv/scale';
import { ScaleComponent } from '../runtime';
import { Palette } from './palette';

export type Scale =
  | LinearScale
  | OrdinalScale
  | IdentityScale
  | BandScale
  | CustomScale;

export type ScaleTypes =
  | 'linear'
  | 'ordinal'
  | 'identity'
  | 'band'
  | ScaleComponent;

export type BaseScale<T extends ScaleTypes, O> = {
  type?: T;
  palette?: Palette;
  guide?: Record<string, any>; // @todo
  field?: string;
} & O;

export type LinearScale = BaseScale<'linear', LinearOptions>;

export type OrdinalScale = BaseScale<'ordinal', OrdinalOptions>;

export type IdentityScale = BaseScale<'identity', IdentityOptions>;

export type BandScale = BaseScale<'band', BandOptions>;

export type CustomScale = BaseScale<ScaleComponent, { [key: string]: any }>;
