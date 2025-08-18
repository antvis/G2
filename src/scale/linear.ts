import { Linear as LinearScale } from '@antv/scale';
import { last, uniq } from '@antv/util';
import { ScaleComponent as SC } from '../runtime';
import { LinearScale as LinearScaleSpec } from '../spec';
import type { BreakOptions } from '../shape/axis-breaks/axis-breaks';

export type LinearOptions = Omit<LinearScaleSpec, 'type'> & {
  breaks?: BreakOptions[];
};

export type TickMethod<T = number> = (
  min: T,
  max: T,
  n?: number,
  ...rest: any[]
) => T[];

const e10 = Math.sqrt(50);
const e5 = Math.sqrt(10);
const e2 = Math.sqrt(2);

export function tickIncrement(
  start: number,
  stop: number,
  count: number,
): number {
  const step = (stop - start) / Math.max(0, count);
  const power = Math.floor(Math.log(step) / Math.LN10);
  const error = step / 10 ** power;
  if (power >= 0) {
    // eslint-disable-next-line no-nested-ternary
    return (
      (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1) * 10 ** power
    );
  }
  // eslint-disable-next-line no-nested-ternary
  return (
    -(10 ** -power) /
    (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1)
  );
}

export const d3Ticks: TickMethod = (
  begin: number,
  end: number,
  count: number,
  breaks?: BreakOptions[],
) => {
  let n;
  let ticks;

  let start = begin;
  let stop = end;

  if (start === stop && count > 0) {
    return [start];
  }

  let step = tickIncrement(start, stop, count);

  if (step === 0 || !Number.isFinite(step)) {
    return [];
  }

  if (step > 0) {
    start = Math.ceil(start / step);
    stop = Math.floor(stop / step);
    ticks = new Array((n = Math.ceil(stop - start + 1)));
    for (let i = 0; i < n; i += 1) {
      ticks[i] = (start + i) * step;
    }
  } else {
    step = -step;
    start = Math.ceil(start * step);
    stop = Math.floor(stop * step);
    ticks = new Array((n = Math.ceil(stop - start + 1)));
    for (let i = 0; i < n; i += 1) {
      ticks[i] = (start + i) / step;
    }
  }
  let newTicks: number[] = [];
  // Insert breaks into ticks and delete the ticks covered by breaks.
  if (breaks?.length) {
    const flatBreaks = breaks.map((b) => [b.start, b.end]).flatMap((b) => b);
    newTicks.push(...ticks, ...flatBreaks);
    newTicks.sort((a, b) => a - b);
    newTicks = uniq(newTicks);
    for (let i = 0; i < breaks.length; i += 1) {
      const { start: s, end: e } = breaks[i];
      newTicks = newTicks.filter((tick) => tick <= s || tick >= e);
    }
  }
  return newTicks.length ? newTicks : ticks;
};

export const transformDomain = (
  options: LinearOptions,
): { breaksDomain: number[]; breaksRange: number[] } => {
  const { domain, range, breaks = [], tickCount = 5 } = options;
  const domainMax = Math.max(...domain);
  const domainMin = Math.min(...domain);
  const sortedBreaks = breaks
    .filter(({ end }) => end < domainMax)
    .sort((a, b) => a.start - b.start);
  const breaksDomain = d3Ticks(domainMin, domainMax, tickCount, sortedBreaks);
  if (last(breaksDomain) < domainMax) {
    breaksDomain.push(domainMax);
  }
  const [r0, r1] = [range[0], last(range)] as number[];
  const diffDomain = domainMax - domainMin;
  const diffRange = Math.abs(r1 - r0);
  const reverse = r0 > r1;
  const breaksRange: number[] = [];
  // Calculate the new range based on breaks.
  breaksDomain.forEach((d, i) => {
    const ratio = (d - domainMin) / diffDomain;
    const valueRaw = reverse ? r0 - ratio * diffRange : r0 + ratio * diffRange;
    breaksRange.push(valueRaw);
  });
  // Compress the range scale according to breaks.
  [...sortedBreaks].forEach(({ start, end, gap = 0.05 }) => {
    const startIndex = breaksDomain.indexOf(start);
    const endIndex = breaksDomain.indexOf(end);
    const center = (breaksRange[startIndex] + breaksRange[endIndex]) / 2;
    const scaledSpan = gap * diffRange;

    const startValue = reverse
      ? center + scaledSpan / 2
      : center - scaledSpan / 2;
    const endValue = reverse
      ? center - scaledSpan / 2
      : center + scaledSpan / 2;

    breaksRange[startIndex] = startValue;
    breaksRange[endIndex] = endValue;
  });
  return { breaksDomain, breaksRange };
};

const transformOptions = (options: LinearOptions): LinearOptions => {
  const { domain, breaks = [] } = options;
  if (!breaks.length) return options;
  const domainMax = Math.max(...domain);
  const availableBreaks = breaks.filter(({ end }) => end < domainMax);
  if (!availableBreaks.length)
    return { ...options, breaks: [], tickMethod: d3Ticks };
  const { breaksDomain, breaksRange } = transformDomain(options);
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
