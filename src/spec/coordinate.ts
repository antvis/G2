import { PolarOptions, TransposeOptions } from '../coordinate';
import { CoordinateComponent } from '../runtime';

export type Coordinate = PolarCoordinate | TransposeCoordinate;

export type CoordinateTypes = 'polar' | 'transpose';

export type BaseCoordinate<T extends CoordinateTypes, O> = {
  type?: T | CoordinateComponent;
} & O;

export type PolarCoordinate = BaseCoordinate<'polar', PolarOptions>;

export type TransposeCoordinate = BaseCoordinate<'transpose', TransposeOptions>;
