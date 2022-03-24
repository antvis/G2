import { CoordinateComponent as CC } from '../runtime';
import { ParallelCoordinate } from '../spec';

export type ParallelOptions = Omit<ParallelCoordinate, 'type'>;

export const Parallel: CC<ParallelOptions> = () => [['parallel', 0, 0, 1, 1]];

Parallel.props = {};
