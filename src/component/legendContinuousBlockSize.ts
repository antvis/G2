import { GuideComponentComponent as GCC } from '../runtime';
import { LegendContinuous, LegendContinuousOptions } from './legendContinuous';

export type LegendContinuousBlockSizeOptions = LegendContinuousOptions;

export const LegendContinuousBlockSize: GCC<
  LegendContinuousBlockSizeOptions
> = (options) => {
  return LegendContinuous(
    Object.assign(
      {},
      { type: 'size', block: true, labelShowTick: false },
      options,
    ),
  );
};

LegendContinuousBlockSize.props = {
  ...LegendContinuous.props,
  defaultPosition: 'top',
  defaultOrientation: 'horizontal',
};
