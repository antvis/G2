import { GuideComponentComponent as GCC } from '../runtime';
import { LegendContinuous, LegendContinuousOptions } from './legendContinuous';

export type LegendContinuousBlockSizeOptions = LegendContinuousOptions;

export const LegendContinuousBlockSize: GCC<
  LegendContinuousBlockSizeOptions
> = (options) => {
  return LegendContinuous(
    Object.assign(
      {},
      {
        type: 'size',
        block: true,
      },
      options,
    ),
  );
};

LegendContinuousBlockSize.props = {
  ...LegendContinuous.props,
  defaultPosition: { anchor: 'top', orientation: 'horizontal' },
};
