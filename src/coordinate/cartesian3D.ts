import { Coordinate3DComponent as CC } from '../runtime';
import { Cartesian3DCoordinate } from '../spec';

export type Cartesian3DOptions = Cartesian3DCoordinate;

/**
 * Default coordinate3D transformation for all charts.
 */
export const Cartesian3D: CC<Cartesian3DCoordinate> = () => [['cartesian3D']];

Cartesian3D.props = {};
