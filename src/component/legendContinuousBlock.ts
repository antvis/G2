import { GuideComponentComponent as GCC } from '../runtime';
import { LegendContinuous, LegendContinuousOptions } from './legendContinuous';

export type LegendContinuousBlockOptions = LegendContinuousOptions;

export const LegendContinuousBlock: GCC<LegendContinuousBlockOptions> = (
  options,
) => {
  return LegendContinuous(
    Object.assign(
      {},
      {
        block: true,
      },
      options,
    ),
  );
};

LegendContinuousBlock.props = {
  ...LegendContinuous.props,
  defaultPosition: { anchor: 'top', orientation: 'horizontal' },
};
