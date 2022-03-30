import { CoordinateComponent as CC } from '../runtime';
import { ParallelCoordinate } from '../spec';

export type ParallelOptions = Omit<ParallelCoordinate, 'type'>;

/**
 * Parallel coordinate transformations for parallel coordinate.
 */
export const Parallel: CC<ParallelOptions> = () => [['parallel', 0, 1, 0, 1]];

Parallel.props = {};
