import { Log as LogScale } from '@antv/scale';
import { ScaleComponent as SC } from '../runtime';
import { LogScale as LogScaleSpec } from '../spec';

export type LogOptions = Omit<LogScaleSpec, 'type'>;

export const Log: SC<LogOptions> = (options) => {
  return new LogScale(options);
};

Log.props = {};
