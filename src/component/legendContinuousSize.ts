import { GuideComponentComponent as GCC } from '../runtime';
import { scaleOf } from './utils';
import { LegendContinuous, LegendContinuousOptions } from './legendContinuous';

export type LegendContinuousSizeOptions = LegendContinuousOptions;

export const LegendContinuousSize: GCC<LegendContinuousSizeOptions> = (
  options,
) => {
  return (context) => {
    const { scales } = context;
    const sizeScale = scaleOf(scales, 'size');
    return LegendContinuous(
      Object.assign(
        {},
        {
          type: 'size',
          data: sizeScale.getTicks().map((value, index) => ({
            value,
            label: String(value),
          })),
        },
        options,
      ),
    )(context);
  };
};

LegendContinuousSize.props = {
  ...LegendContinuous.props,
  defaultPosition: 'top',
  defaultOrientation: 'horizontal',
};
