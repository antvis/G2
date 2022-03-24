import { Time as TimeScale } from '@antv/scale';
import { TimeScale as TimeScaleSpec } from '../spec';
import { ScaleComponent as SC } from '../runtime';

export type TimeOptions = Omit<TimeScaleSpec, 'type'>;

export const Time: SC<TimeOptions> = (options) => {
  return new TimeScale(options);
};

Time.props = {};
