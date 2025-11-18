import { DisplayObject } from '@antv/g';
import { lowerFirst, upperFirst, isPlainObject } from '@antv/util';
import { Band, Base, Constant } from '@antv/scale';
import { G2Element } from './selection';

/**
 * @description Get element's ancestor view node.
 * @param elemenet G2 element.
 * @returns Element's ancestor view node.
 */
export function getViewFromElement(element: G2Element) {
  let current = element as G2Element;
  while (current) {
    if (current.attributes?.class === 'view') return current;
    current = current.parentNode as G2Element;
  }
  return null;
}

/**
 * @description Check if the element is a heatmap.
 * @param element G2 element.
 * @returns True if the element is a heatmap, otherwise false.
 */
export function isHeatmap(element) {
  const { markType, nodeName } = element;
  return markType === 'heatmap' && nodeName === 'image';
}

/**
 * @description Get element's original data.
 * @param elemenet G2 element.
 * @param elemenet View data, if not provided, will get from element's ancestor view.
 * @returns The original data of the element.
 */
export function dataOf(element: G2Element, viewData?: any) {
  const view = viewData ?? getViewFromElement(element).__data__;
  const datum = element.__data__;
  const { markKey, index, seriesIndex, normalized = { x: 0 } } = datum;
  const { markState } = view;
  const selectedMark: any = Array.from(markState.keys()).find(
    (mark) => (mark as any).key === markKey,
  );
  if (!selectedMark) return;
  if (seriesIndex) {
    return seriesIndex.map((i) => selectedMark.data[i]);
  }
  return isHeatmap(element)
    ? selectedMark.data[Math.round(selectedMark.data.length * normalized.x)]
    : selectedMark.data[index];
}

/**
 * @description Get element's series name.
 * @param elemenet G2 element.
 * @returns The series name of the element.
 */
export function seriesOf(elemenet: G2Element): string {
  const viewData = getViewFromElement(elemenet).__data__;
  const { scale } = viewData;
  return groupNameOf(scale, elemenet.__data__);
}

/**
 * Get series scale by markKey
 */
function getSeriesByMarkKey(scale: Record<string, Base<any>>, datum) {
  // For path mark, markKey is in datum.element?.__data__?.markKey.
  const markKey = datum.markKey ?? datum.element?.__data__?.markKey;

  const seriesKey = Object.keys(scale).find((channel) => {
    if (channel.startsWith('series')) {
      const options = scale[channel].getOptions();
      return options.name === 'series' && options.markKey === markKey;
    }
  });
  return scale[seriesKey] ?? scale.series;
}

/**
 * Get group name with view's scale and element's datum.
 */
export function groupNameOf(scale: Record<string, Base<any>>, datum) {
  const { color: scaleColor, facet = false } = scale;
  const { color, series } = datum;
  const scaleSeries = getSeriesByMarkKey(scale, datum);

  const invertAble = (scale) => {
    return (
      scale &&
      scale.invert &&
      !(scale instanceof Band) &&
      !(scale instanceof Constant)
    );
  };
  // For non constant color channel.
  if (invertAble(scaleSeries)) {
    const cloned = scaleSeries.clone();
    return cloned.invert(series);
  }
  if (
    series &&
    scaleSeries instanceof Band &&
    scaleSeries.invert(series) !== color &&
    !facet
  ) {
    return scaleSeries.invert(series);
  }
  if (invertAble(scaleColor)) {
    const name = scaleColor.invert(color);
    // For threshold scale.
    if (Array.isArray(name)) return null;
    return name;
  }
  return null;
}

export function identity<T>(x: T): T {
  return x;
}

type Func<R> = (x: R, ...args: any[]) => R;
/**
 * Composes functions from left to right.
 */
export function compose<R>(fns: Func<R>[]): Func<R> {
  return fns.reduce(
    (composed, fn) =>
      (x, ...args) =>
        fn(composed(x, ...args), ...args),
    identity,
  );
}

/**
 * Composes single-argument async functions from left to right.
 */
export function composeAsync<R>(
  fns: ((x: R) => Promise<R> | R)[],
): (x: R) => Promise<R> | R {
  return fns.reduce(
    (composed, fn) => async (x) => {
      const value = await composed(x);
      return fn(value);
    },
    identity,
  );
}

export function capitalizeFirst(str: string): string {
  return str.replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
}

export function error(message = ''): never {
  throw new Error(message);
}

export function copyAttributes(target: DisplayObject, source: DisplayObject) {
  const { attributes } = source;
  const exclude = new Set(['id', 'className']);
  for (const [key, value] of Object.entries(attributes)) {
    if (!exclude.has(key)) {
      target.attr(key, value);
    }
  }
}

export function defined(x: any) {
  return x !== undefined && x !== null && !Number.isNaN(x);
}

export function random(a: number, b: number): number {
  return a + (b - a) * Math.random();
}

export function useMemo<T = unknown, U = unknown>(
  compute: (key: T) => U,
): (key: T) => U {
  const map = new Map<T, U>();
  return (key) => {
    if (map.has(key)) return map.get(key);
    const value = compute(key);
    map.set(key, value);
    return value;
  };
}

export function appendTransform(node: DisplayObject, transform: any) {
  const { transform: preTransform } = node.style;
  const unset = (d) => d === 'none' || d === undefined;
  const prefix = unset(preTransform) ? '' : preTransform;
  node.style.transform = `${prefix} ${transform}`.trimStart();
}

export function subObject(
  obj: Record<string, any>,
  prefix: string,
): Record<string, any> {
  return maybeSubObject(obj, prefix) || {};
}

export function maybeSubObject(
  obj: Record<string, any>,
  prefix: string,
): Record<string, any> {
  const entries = Object.entries(obj || {})
    .filter(([key]) => key.startsWith(prefix))
    .map(([key, value]) => [lowerFirst(key.replace(prefix, '').trim()), value])
    .filter(([key]) => !!key);
  return entries.length === 0 ? null : Object.fromEntries(entries);
}

export function prefixObject(
  obj: Record<string, any>,
  prefix: string,
): Record<string, any> {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => {
      return [`${prefix}${upperFirst(key)}`, value];
    }),
  );
}

export function filterPrefixObject(
  obj: Record<string, any>,
  prefix: string[],
): Record<string, any> {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) =>
      prefix.find((p) => key.startsWith(p)),
    ),
  );
}

export function omitPrefixObject(
  obj: Record<string, any>,
  ...prefixes: string[]
) {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) =>
      prefixes.every((prefix) => !key.startsWith(prefix)),
    ),
  );
}

export function maybePercentage(x: number | string, size: number) {
  if (x === undefined) return null;
  if (typeof x === 'number') return x;
  const px = +x.replace('%', '');
  return Number.isNaN(px) ? null : (px / 100) * size;
}

export function isStrictObject(d: any): boolean {
  return (
    typeof d === 'object' &&
    !(d instanceof Date) &&
    d !== null &&
    !Array.isArray(d)
  );
}

export function isUnset(value) {
  return value === null || value === false;
}

export function deepAssign(
  dist: Record<string, unknown>,
  src: Record<string, unknown>,
  maxLevel = 5,
  level = 0,
): Record<string, unknown> {
  if (level >= maxLevel) return;
  for (const key of Object.keys(src)) {
    const value = src[key];
    if (!isPlainObject(value) || !isPlainObject(dist[key])) {
      dist[key] = value;
    } else {
      deepAssign(
        dist[key] as Record<string, unknown>,
        value as Record<string, unknown>,
        maxLevel,
        level + 1,
      );
    }
  }
  return dist;
}
