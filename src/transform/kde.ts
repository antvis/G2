import pdf from 'pdfast';
import { maxIndex, minIndex } from 'd3-array';
import { TransformComponent as TC } from '../runtime';
import { KDETransform } from '../spec';
import { columnOf } from './utils/helper';
import { createGroups } from './utils/order';

export type KDEOptions = Omit<KDETransform, 'type'>;

/**
 * Kernel Density Estimation, generating probability density function (pdf) using triangular kernel, optimized to run in O(N + K).
 */
export const KDE: TC<KDEOptions> = (options = {}) => {
  return (I, mark) => {
    const { encode } = mark;
    // TODO: 逍为
    return [I, mark];
  };
};

KDE.props = {};
