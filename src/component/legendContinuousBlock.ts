import { GuideComponentComponent as GCC } from '../runtime';
import { LegendContinuous, LegendContinuousOptions } from './legendContinuous';

export type LegendContinuousBlockOptions = LegendContinuousOptions;

export const LegendContinuousBlock: GCC<LegendContinuousBlockOptions> = (
  options,
) => {
  return (...args) =>
    LegendContinuous(Object.assign({}, { block: true }, options))(...args);
};

LegendContinuousBlock.props = {
  ...LegendContinuous.props,
  defaultPosition: 'top',
  defaultOrientation: 'horizontal',
};
