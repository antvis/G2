import { ScaleComponent } from '../runtime';
import {
  LinearOptions,
  OrdinalOptions,
  IdentityOptions,
  BandOptions,
} from '../scale';
import { Palette } from './palette';

export type Scale = LinearScale | OrdinalScale | IdentityScale | BandScale;

export type ScaleTypes = 'linear' | 'ordinal' | 'identity' | 'band';

export type BaseScale<T, O> = { type?: T | ScaleComponent } & O & {
    palette?: Palette;
  };

export type LinearScale = BaseScale<'linear', LinearOptions>;

export type OrdinalScale = BaseScale<'ordinal', OrdinalOptions>;

export type IdentityScale = BaseScale<'identity', IdentityOptions>;

export type BandScale = BaseScale<'band', BandOptions>;
