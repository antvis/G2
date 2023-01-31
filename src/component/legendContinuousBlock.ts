import { GuideComponentComponent as GCC } from '../runtime';
import { LegendContinuous, LegendContinuousOptions } from './legendContinuous';

export type LegendContinuousBlockOptions = LegendContinuousOptions;

export const LegendContinuousBlock: GCC<LegendContinuousBlockOptions> = (
  options,
) => {
  return (scale, value, coordinate, theme) =>
    LegendContinuous(Object.assign({}, { block: true }, options))(
      scale,
      value,
      coordinate,
      theme,
    );
};

LegendContinuousBlock.props = {
  ...LegendContinuous.props,
  defaultPosition: 'top',
  defaultOrientation: 'horizontal',
};
