import { Linear as LinearScale } from '@antv/scale';
import { ScaleComponent as SC } from '../runtime';
import { LinearScale as LinearScaleSpec } from '../spec';
import type { BreakOptions } from '../shape/break/break';

export type LinearOptions = Omit<LinearScaleSpec, 'type'> & {
  breaks?: BreakOptions[];
};

const transformOptions = (options: LinearOptions): LinearOptions => {
  const { domain, range, breaks = [] } = options;
  if (!breaks.length) return options;
  const domainMax = Math.max(...domain);
  const availableBreaks = breaks.filter(({ end }) => end < domainMax);
  if (!availableBreaks.length)
    return { ...options, breaks: [], tickMethod: undefined };
  const [d0, d1] = domain;
  const [r0, r1] = range as number[];
  const diffDomain = d1 - d0;
  const diffRange = Math.abs(r1 - r0);
  const reverse = r0 > r1;

  const breaksDomain = [d0];
  const breaksRange = [r0];

  [...availableBreaks]
    .sort((a, b) => a.start - b.start)
    .forEach(({ start, end, gap = 0.05 }) => {
      breaksDomain.push(start, end);

      const startRatio = (start - d0) / diffDomain;
      const endRatio = (end - d0) / diffDomain;

      const startValueRaw = reverse
        ? r0 - startRatio * diffRange
        : r0 + startRatio * diffRange;

      const endValueRaw = reverse
        ? r0 - endRatio * diffRange
        : r0 + endRatio * diffRange;

      const center = (startValueRaw + endValueRaw) / 2;
      const scaledSpan = gap * diffRange;
      const startValue = center - scaledSpan / 2;
      const endValue = center + scaledSpan / 2;

      reverse
        ? breaksRange.push(endValue, startValue)
        : breaksRange.push(endValue, startValue);
    });

  breaksDomain.push(d1);
  breaksRange.push(r1);

  return {
    ...options,
    domain: breaksDomain,
    range: breaksRange,
    tickMethod: () => [...breaksDomain],
  };
};

export const Linear: SC<LinearOptions> = (options) => {
  return new LinearScale(transformOptions(options));
};

Linear.props = {};
