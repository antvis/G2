import { GuideComponentComponent as GCC } from '../runtime';
import { LegendContinuous, LegendContinuousOptions } from './legendContinuous';

export type LegendContinuousSizeOptions = LegendContinuousOptions;

export const LegendContinuousSize: GCC<LegendContinuousSizeOptions> = (
  options,
) => {
  return LegendContinuous(
    Object.assign(
      {},
      {
        type: 'size',
      },
      options,
    ),
  );
};

LegendContinuousSize.props = {
  ...LegendContinuous.props,
  defaultPosition: { anchor: 'top', orientation: 'horizontal' },
};
