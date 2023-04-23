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
          tick: false,
          data: sizeScale.getOptions().domain.map((value, index) => ({
            value,
            label: String(value),
          })),
          labelFilter: (datum, index, data) =>
            index === 0 || index === data.length - 1,
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
