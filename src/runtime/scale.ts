import { createInterpolateValue } from '@antv/scale';
import { firstOf, lastOf, unique } from '../utils/array';
import { defined } from '../utils/helper';
import { Channel, Primitive, G2Theme } from './types/common';
import {
  G2CoordinateOptions,
  G2Library,
  G2ScaleOptions,
  G2PaletteOptions,
} from './types/options';
import {
  ScaleComponent,
  PaletteComponent,
  Palette,
  Scale,
} from './types/component';
import { isPolar } from './coordinate';
import { useLibrary } from './library';

export function inferScale(
  channel: Channel,
  options: G2ScaleOptions,
  coordinate: G2CoordinateOptions[],
  shapes: string[],
  theme: G2Theme,
  nameScale: Map<string, G2ScaleOptions>,
  library: G2Library,
) {
  const { scaleName } = channel;
  const potentialScale = inferPotentialScale(
    channel,
    options,
    coordinate,
    shapes,
    theme,
    library,
  );
  const { independent } = potentialScale;
  if (independent) return potentialScale;
  if (!nameScale.has(scaleName)) {
    nameScale.set(scaleName, potentialScale);
    return potentialScale;
  }
  const scale = nameScale.get(scaleName);
  syncScale(scaleName, scale, potentialScale);
  return scale;
}

export function applyScale(
  channels: Channel[],
  scale: Record<string, Scale>,
): Record<string, Channel> {
  const scaledValue = {};
  for (const { scaleName, value, name } of channels) {
    const scaleInstance = scale[scaleName];
    scaledValue[name] = value.map((d) => scaleInstance.map(d));
  }
  return scaledValue;
}

function inferPotentialScale(
  channel: Channel,
  options: G2ScaleOptions,
  coordinate: G2CoordinateOptions[],
  shapes: string[],
  theme: G2Theme,
  library: G2Library,
): G2ScaleOptions {
  const { name, field: inferredField } = channel;
  const { field = inferredField, guide = {} } = options;
  const type = inferScaleType(channel, options);
  if (typeof type !== 'string') return options;
  return {
    ...options,
    ...inferScaleOptions(type, channel, options, coordinate),
    domain: inferScaleDomain(type, channel, options),
    range: inferScaleRange(type, channel, options, shapes, theme, library),
    guide,
    name,
    field,
    type,
  };
}

// @todo More accurate inference for different cases.
function inferScaleType(
  channel: Channel,
  options: G2ScaleOptions,
): string | ScaleComponent {
  const { scale, name, value, type: channelType } = channel;
  const { type, domain, range } = options;

  if (scale !== undefined) return scale;
  if (type !== undefined) return type;

  if (channelType === 'constant' && !isPosition(name)) return 'identity';
  if (isObject(value)) return 'identity';

  if ((domain || range || []).length > 2) return asOrdinalType(name);
  if (domain !== undefined) {
    if (isOrdinal(domain)) return asOrdinalType(name);
    return 'linear';
  }
  if (isOrdinal(value)) return asOrdinalType(name);
  if (isTemporal(value)) return 'time';
  return 'linear';
}

function inferScaleDomain(
  type: string,
  channel: Channel,
  options: G2ScaleOptions,
): Primitive[] {
  const { value } = channel;
  const { domain } = options;
  if (domain !== undefined) return domain;
  switch (type) {
    case 'linear':
    case 'time':
    case 'log':
    case 'pow':
    case 'threshold':
      return inferDomainQ(value, options);
    case 'band':
    case 'ordinal':
    case 'point':
      return inferDomainC(value);
    case 'quantile':
      return inferDomainO(value);
    default:
      return [];
  }
}

function inferScaleRange(
  type: string,
  channel: Channel,
  options: G2ScaleOptions,
  shapes: string[],
  theme: G2Theme,
  library: G2Library,
) {
  const { range } = options;
  if (range !== undefined) return range;

  const [usePalette] = useLibrary<G2PaletteOptions, PaletteComponent, Palette>(
    'palette',
    library,
  );
  const { name, value } = channel;
  const { defaultCategory10: c10, defaultCategory20: c20 } = theme;
  const defaultPalette = { type: unique(value).length <= 10 ? c10 : c20 };

  const { palette: paletteOptions = defaultPalette } = options;
  const palette = usePalette(paletteOptions);

  switch (type) {
    case 'linear':
    case 'band':
    case 'point':
    case 'time':
    case 'log':
      return inferRangeQ(name, palette);
    case 'ordinal':
      return name === 'color' ? palette : shapes;
    default:
      return [];
  }
}

function inferScaleOptions(
  type: string,
  channel: Channel,
  options: G2ScaleOptions,
  coordinate: G2CoordinateOptions[],
): G2ScaleOptions {
  const { name } = channel;
  switch (type) {
    case 'linear':
    case 'time':
    case 'log':
    case 'pow':
      return inferOptionsQ(coordinate, options);
    case 'band':
    case 'point':
      return inferOptionsC(type, name, coordinate, options);
    default:
      return options;
  }
}

function inferOptionsQ(
  coordinate: G2CoordinateOptions[],
  options: G2ScaleOptions,
): G2ScaleOptions {
  const {
    interpolate = createInterpolateValue,
    nice = false,
    tickCount = 10,
  } = options;
  return { ...options, interpolate, nice, tickCount };
}

function inferOptionsC(
  type: string,
  name: string,
  coordinate: G2CoordinateOptions[],
  options: G2ScaleOptions,
): G2ScaleOptions {
  if (options.padding !== undefined) return options;
  const padding = inferPadding(type, name, coordinate);
  const { paddingInner = padding, paddingOuter = padding } = options;
  return { ...options, paddingInner, paddingOuter };
}

function inferPadding(
  type: string,
  name: string,
  coordinate: G2CoordinateOptions[],
): number {
  // The scale for enterDelay and enterDuration should has zero padding by default.
  // Because there is no need to add extra delay for the start and the end.
  if (name === 'enterDelay' || name === 'enterDuration') return 0;
  if (type === 'band') return isPolar(coordinate) ? 0 : 0.1;
  // Point scale need 0.5 padding to make interval between first and last point
  // equal to other intervals in polar coordinate.
  if (type === 'point') return isPolar(coordinate) ? 0.5 : 0;
  return 0;
}

function asOrdinalType(name: string) {
  return isQuantitative(name) ? 'point' : 'ordinal';
}

function inferDomainQ(value: Primitive[], options: G2ScaleOptions) {
  const { zero = false } = options;
  let min = Infinity;
  let max = -Infinity;
  for (const d of value) {
    if (defined(d)) {
      min = Math.min(min, +d);
      max = Math.max(max, +d);
    }
  }
  return zero ? [Math.min(0, min), max] : [min, max];
}

function inferDomainC(value: Primitive[]) {
  return Array.from(new Set(value));
}

function inferDomainO(value: Primitive[]) {
  return inferDomainC(value).sort();
}
/**
 * @todo More nice default range for enterDelay and enterDuration.
 * @todo Add default range for some channels?
 */
function inferRangeQ(name: string, palette: Palette): Primitive[] {
  if (name === 'enterDelay') return [0, 1000];
  if (name == 'enterDuration') return [300, 1000];
  if (name.startsWith('y') || name.startsWith('position')) return [1, 0];
  if (name === 'color') return [firstOf(palette), lastOf(palette)];
  if (name === 'size') return [1, 10];
  return [0, 1];
}

function isOrdinal(values: Primitive[]): boolean {
  return values.some((v) => {
    const type = typeof v;
    return type === 'string' || type === 'boolean';
  });
}

function isTemporal(values: Primitive[]): boolean {
  return values.some((v) => {
    return v instanceof Date;
  });
}

function isObject(values: Primitive[]): boolean {
  return values.some((v) => {
    return typeof v === 'object' && !(v instanceof Date) && v !== null;
  });
}

function isQuantitative(name: string): boolean {
  return (
    name.startsWith('x') ||
    name.startsWith('y') ||
    name.startsWith('position') ||
    name.startsWith('size')
  );
}

export function isPosition(name: string): boolean {
  return (
    name.startsWith('x') || name.startsWith('y') || name.startsWith('position')
  );
}

/**
 * Sync the domain and range of two scales with same type.
 */
function syncScale(
  channel: string,
  targetScale: G2ScaleOptions,
  sourceScale: G2ScaleOptions,
): void {
  const {
    type: targetType,
    domain: targetDomain,
    range: targetRange,
  } = targetScale;
  const {
    type: sourceType,
    domain: sourceDomain,
    range: sourceRange,
  } = sourceScale;
  if (typeof targetType !== 'string' || typeof sourceType !== 'string') return;
  targetScale.type = maybeCompatible(targetType, sourceType, channel);
  targetScale.domain = syncDomain(targetType, targetDomain, sourceDomain);
  targetScale.range = syncRange(targetType, targetRange, sourceRange);
}

/**
 * @todo Take more quantitative scales besides linear(e.g. log, time, pow) into account.
 */
function maybeCompatible(
  target: string,
  source: string,
  channel: string,
): string | never {
  if (oneOf(target, source, 'linear', 'identity')) {
    // Quantitative scale and identity scale is compatible for each other and identity scale has higher priority.
    // This is useful for enterDelay and enterDuration to know whether they are constant or field channel.
    // If any of them is identity scale, it means one of them is specified as constant channel in encode options.
    // In this case, assume all of them are identity scales.
    return 'identity';
  } else if (oneOf(target, source, 'band', 'point')) {
    // Band scale and point scale is compatible, because they have same type of domain and range.
    // The only difference is the method to compute interval between points.
    return 'band';
  } else if (target !== source) {
    throw new Error(
      `Incompatible scale type: ${target} !== ${source} for channel: ${channel}`,
    );
  } else {
    return target;
  }
}

function oneOf(a: string, b: string, m: string, n: string) {
  return (a === m && b === n) || (a === n && b === m);
}

function syncDomain(type: string, target: any[], source: any[]): any[] {
  switch (type) {
    case 'linear':
    case 'pow':
    case 'log':
      return syncTupleQ(target, source);
    case 'band':
    case 'ordinal':
      return syncTupleC(target, source);
    default:
      return target;
  }
}

function syncRange(type: string, target: any[], source: any[]): any[] {
  switch (type) {
    case 'linear':
    case 'band':
    case 'pow':
    case 'log':
      return syncTupleQ(target, source);
    case 'ordinal':
      return syncTupleC(target, source);
    default:
      return target;
  }
}

function syncTupleQ(target: (number | Date)[], source: (number | Date)[]) {
  const [t0, t1] = target;
  const [s0, s1] = source;
  return [Math.min(+t0, +s0), Math.max(+t1, +s1)];
}

function syncTupleC(
  target: (string | boolean)[],
  source: (string | boolean)[],
) {
  return Array.from(new Set([...target, ...source]));
}
