import { DataComponent as DC } from '../runtime';
import { EMADataTransform } from '../spec';

export function ema(values: number[], alpha: number): number[] {
  if (alpha < 0 || alpha > 1) {
    throw new Error('alpha must be between 0 and 1.');
  }
  if (values.length === 0) {
    return [];
  }

  let last = values[0];
  const smoothed: number[] = [];

  for (const point of values) {
    if (point === null || point === undefined) {
      // 如果没有数据的话，使用最近的值
      smoothed.push(point);
      console.warn('EMA：The value is null or undefined', values);
      continue;
    }

    if (last === null || last === undefined) {
      last = point;
    }

    const smoothedVal = last * alpha + (1 - alpha) * point;
    smoothed.push(smoothedVal);
    last = smoothedVal;
  }

  return smoothed;
}

export type EMAOptions = Omit<EMADataTransform, 'type'>;

/**
 * https://en.wikipedia.org/wiki/Exponential_smoothing
 * @param options
 * @returns
 */

export const EMA: DC<EMAOptions> = (options) => {
  const { field = 'y', alpha = 0.6, as = field } = options;

  return (data) => {
    const values = data.map((d) => {
      return d[field];
    });

    const out = ema(values, alpha);

    return data.map((d, i) => {
      return {
        ...d,
        [as]: out[i],
      };
    });
  };
};

EMA.props = {};
