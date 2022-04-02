import { extent, max } from 'd3-array';
import { createInterpolateValue } from '@antv/scale';
import { firstOf, lastOf, unique, isFlatArray } from '../utils/array';
import { Channel, FlattenChannel, Primitive, G2Theme } from './types/common';
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
  const { name: channelName } = channel;
  const name = scaleName(channelName);
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
  if (!nameScale.has(name)) {
    nameScale.set(name, potentialScale);
    return potentialScale;
  }
  const scale = nameScale.get(name);
  syncScale(channelName, scale, potentialScale);
  return scale;
}

export function applyScale(
  channels: Channel[],
  scales: Record<string, Scale>,
): Record<string, Channel> {
  const values = {};
  for (const { name, value } of channels) {
    const scale = scales[name];
    const map = scale.map.bind(scale);
    if (isFlatArray(value)) {
      values[name] = value.map(map);
    } else {
      values[name] = value.map((d) => (Array.isArray(d) ? d.map(map) : map(d)));
    }
  }
  return values;
}

/**
 * In most cases each channel has one scale and the name of the scale
 * equals to the channel name.
 * But in some cases more than one channel share the same scale
 * (e.g. enterDelay and enterDuration share the enter scale).
 */
function scaleName(channelName: string): string {
  // A Map from channel name to scale name.
  const channelScale = new Map([
    ['enterDelay', 'enter'],
    ['enterDuration', 'enter'],
  ]);
  if (channelScale.has(channelName)) return channelScale.get(channelName);
  return channelName;
}

function inferPotentialScale(
  channel: Channel,
  options: G2ScaleOptions,
  coordinate: G2CoordinateOptions[],
  shapes: string[],
  theme: G2Theme,
  library: G2Library,
): G2ScaleOptions {
  const { field: defaultField, guide = {} } = options;
  const { name, field = defaultField } = channel;
  const flattenChannel = { ...channel, value: channel.value.flat(1) };
  const type = inferScaleType(flattenChannel, options);
  if (typeof type !== 'string') return options;
  return {
    ...options,
    ...inferScaleOptions(type, flattenChannel, options, coordinate),
    domain: inferScaleDomain(type, flattenChannel, options),
    range: inferScaleRange(
      type,
      flattenChannel,
      options,
      shapes,
      theme,
      library,
    ),
    guide,
    name,
    field,
    type,
  };
}

// @todo More accurate inference for different cases.
function inferScaleType(
  channel: FlattenChannel,
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
  channel: FlattenChannel,
  options: G2ScaleOptions,
): Primitive[] {
  const { value } = channel;
  const { domain } = options;
  if (domain !== undefined) return domain;
  switch (type) {
    case 'linear':
    case 'time':
      return inferDomainQ(value, options);
    case 'band':
    case 'ordinal':
    case 'point':
      return inferDomainC(value);
    default:
      return [];
  }
}

function inferScaleRange(
  type: string,
  channel: FlattenChannel,
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
      return inferRangeQ(name, palette);
    case 'ordinal':
      return name === 'color' ? palette : shapes;
    default:
      return [];
  }
}

function inferScaleOptions(
  type: string,
  channel: FlattenChannel,
  options: G2ScaleOptions,
  coordinate: G2CoordinateOptions[],
): G2ScaleOptions {
  const { name } = channel;
  switch (type) {
    case 'linear':
    case 'time':
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
  const { padding = inferPadding(type, name, coordinate) } = options;
  return { ...options, padding };
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
  return zero ? [0, max(value, (v) => +v)] : extent(value, (v) => +v);
}

function inferDomainC(value: Primitive[]) {
  return Array.from(new Set(value));
}

/**
 * @todo More nice default range for enterDelay and enterDuration.
 * @todo Add default range for some channels?
 */
function inferRangeQ(name: string, palette: Palette): Primitive[] {
  if (name === 'enterDelay') return [0, 1000];
  if (name == 'enterDuration') return [300, 1000];
  if (name === 'y' || name.startsWith('position')) return [1, 0];
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
    return typeof v === 'object' && !(v instanceof Date);
  });
}

function isQuantitative(name: string): boolean {
  return (
    name === 'x' ||
    name === 'y' ||
    name.startsWith('position') ||
    name === 'size'
  );
}

function isPosition(name: string): boolean {
  return name === 'x' || name === 'y' || name.startsWith('position');
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
 * Quantitative scale and identity scale is compatible for each other and identity scale has higher priority.
 * This is useful for enterDelay and enterDuration to know whether they are constant or field channel.
 * If any of them is identity scale, it means one of them is specified as constant channel in encode options.
 * In this case, assume all of them are identity scales.
 * @todo Take more quantitative scales besides linear(e.g. log, time, pow) into account.
 */
function maybeCompatible(
  target: string,
  source: string,
  channel: string,
): string | never {
  if (
    (target === 'linear' && source === 'identity') ||
    (source === 'identity' && target === 'linear')
  ) {
    return 'identity';
  } else if (target !== source) {
    throw new Error(
      `Incompatible scale type: ${target} !== ${source} for channel: ${channel}`,
    );
  } else {
    return target;
  }
}

function syncDomain(type: string, target: any[], source: any[]): any[] {
  switch (type) {
    case 'linear':
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
