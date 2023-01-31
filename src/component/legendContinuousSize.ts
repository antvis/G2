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
        labelShowTick: false,
        labelFilter: (datum, index, data) =>
          index === 0 || index === data.length - 1,
      },
      options,
    ),
  );
};

LegendContinuousSize.props = {
  ...LegendContinuous.props,
  defaultPosition: 'top',
  defaultOrientation: 'horizontal',
};
