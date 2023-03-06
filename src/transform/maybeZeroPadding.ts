import { deepMix } from '@antv/util';
import { TransformComponent as TC } from '../runtime';

export type MaybeZeroPaddingOptions = Record<string, never>;

/**
 * Set padding of x and y scale to zero.
 */
export const MaybeZeroPadding: TC<MaybeZeroPaddingOptions> = () => {
  return (I, mark) => {
    return [
      I,
      deepMix({ scale: { x: { padding: 0 }, y: { padding: 0 } } }, mark),
    ];
  };
};

MaybeZeroPadding.props = {};
