import { TransformComponent as TC } from '../runtime';
import { BinXTransform } from '../spec';
import { Bin } from './bin';

export type BinXOptions = Omit<BinXTransform, 'type'>;

export const BinX: TC<BinXOptions> = (options = {}) => {
  const { thresholds } = options;
  return Bin({
    ...options,
    thresholdsX: thresholds,
    groupChannels: ['color'],
    binChannels: ['x'],
  });
};

BinX.props = {};
