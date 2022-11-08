import { createInterpolateValue } from '@antv/scale';
import { extent } from 'd3-array';
import * as d3ScaleChromatic from 'd3-scale-chromatic';
import { upperFirst } from '@antv/util';
import { firstOf, lastOf, unique } from '../utils/array';
import { defined, identity } from '../utils/helper';
import { Channel, Primitive, G2Theme, G2MarkState } from './types/common';
import {
  G2CoordinateOptions,
  G2Library,
  G2ScaleOptions,
  G2PaletteOptions,
  G2Mark,
} from './types/options';
import {
  ScaleComponent,
  PaletteComponent,
  Palette,
  Scale,
} from './types/component';
import { isPolar, isTheta } from './coordinate';
import { useLibrary } from './library';
import { MarkChannel } from './types/mark';

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
): MarkChannel {
  const scaledValue = {};
  for (const { scaleName, value, name } of channels) {
    const scaleInstance = scale[scaleName];
    scaledValue[name] = value.map((d) => scaleInstance.map(d));
  }
  return scaledValue;
}

export function useRelation(
  relations: [any, any][],
): [(scale: Scale) => Scale, (scale: Scale) => Scale] {
  if (!relations || !Array.isArray(relations)) return [identity, identity];

  // Store original map and invert.
  let map;
  let invert;

  const conditionalize = (scale: Scale) => {
    map = scale.map.bind(scale);
    invert = scale.invert?.bind(scale);

    // Distinguish functions[function, output] and value[vale, output] relations.
    const funcRelations = relations.filter(([v]) => typeof v === 'function');
    const valueRelations = relations.filter(([v]) => typeof v !== 'function');

    // Update scale.map
    const valueOutput = new Map(valueRelations);
    scale.map = (x) => {
      for (const [verify, value] of funcRelations) {
        if (verify(x)) return value;
      }
      if (valueOutput.has(x)) return valueOutput.get(x);
      return map(x);
    };

    if (!invert) return scale;

    // Update scale.invert
    const outputValue = new Map(valueRelations.map(([a, b]) => [b, a]));
    const outputFunc = new Map(funcRelations.map(([a, b]) => [b, a]));
    scale.invert = (x) => {
      if (outputFunc.has(x)) return x;
      if (outputValue.has(x)) return outputValue.get(x);
      return invert(x);
    };
    return scale;
  };

  const deconditionalize = (scale: Scale) => {
    if (map !== null) scale.map = map;
    if (invert !== null) scale.invert = invert;
    return scale;
  };

  return [conditionalize, deconditionalize];
}

export function syncFacetsScales(states: Map<G2Mark, G2MarkState>[]): void {
  const scales = states
    .flatMap((state) => Array.from(state.keys()))
    .map((d) => d.scale);
  syncFacetsScaleByChannel(scales, 'x');
  syncFacetsScaleByChannel(scales, 'y');
}

function syncFacetsScaleByChannel(
  scales: Record<string, G2ScaleOptions>[],
  channel: 'x' | 'y',
): void {
  const S = scales.map((d) => d[channel]).filter(({ facet = true }) => facet);
  const D = S.flatMap((d) => d.domain);
  const syncedD = S.every(isQuantitativeScale)
    ? extent(D)
    : S.every(isDiscreteScale)
    ? Array.from(new Set(D))
    : null;
  if (syncedD === null) return;
  for (const scale of S) {
    scale.domain = syncedD;
  }
}

function isQuantitativeScale(scale: G2ScaleOptions) {
  const { type } = scale;
  if (typeof type !== 'string') return false;
  // Do not take quantize, quantile or threshold scale into account,
  // because they are not for position scales. If they are, there is
  // no need to sync them.
  const names = ['linear', 'log', 'pow', 'time'];
  return names.includes(type);
}

function isDiscreteScale(scale: G2ScaleOptions) {
  const { type } = scale;
  if (typeof type !== 'string') return false;
  const names = ['band', 'point', 'ordinal'];
  return names.includes(type);
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
  const domain = inferScaleDomain(type, channel, options);
  return {
    ...options,
    ...inferScaleOptions(type, channel, options, coordinate),
    domain,
    range: inferScaleRange(
      type,
      channel,
      options,
      domain,
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
  channel: Channel,
  options: G2ScaleOptions,
): string | ScaleComponent {
  const { scale, name, value, visual } = channel;
  const { type, domain, range } = options;
  if (type !== undefined) return type;
  // The priority of visual is higher than default scale type.
  if (visual) return 'identity';
  if (scale !== undefined) return scale;
  if (isObject(value)) return 'identity';
  if (typeof range === 'string') return 'linear';
  if ((domain || range || []).length > 2) return asOrdinalType(name);
  if (domain !== undefined) {
    if (isOrdinal(domain)) return asOrdinalType(name);
    if (isTemporal(value)) return 'time';
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
  const { domainMax, domainMin } = options;
  switch (type) {
    case 'linear':
    case 'time':
    case 'log':
    case 'pow':
    case 'sqrt':
    case 'quantize':
    case 'threshold': {
      const [d0, d1] = inferDomainQ(value, options);
      return [domainMin || d0, domainMax || d1];
    }
    case 'band':
    case 'ordinal':
    case 'point':
      return inferDomainC(value);
    case 'quantile':
      return inferDomainO(value);
    case 'sequential': {
      const [d0, d1] = inferDomainS(value);
      return [domainMin || d0, domainMax || d1];
    }
    default:
      return [];
  }
}

function inferScaleRange(
  type: string,
  channel: Channel,
  options: G2ScaleOptions,
  domain: Primitive[],
  shapes: string[],
  theme: G2Theme,
  library: G2Library,
) {
  const { range } = options;
  if (typeof range === 'string') return gradientColors(range);
  if (range !== undefined) return range;
  const { name } = channel;
  const { rangeMin, rangeMax } = options;
  switch (type) {
    case 'linear':
    case 'time':
    case 'log':
    case 'sqrt': {
      const colors = categoricalColors(
        channel,
        options,
        domain,
        theme,
        library,
      );
      const [r0, r1] = inferRangeQ(name, colors);
      return [rangeMin || r0, rangeMax || r1];
    }
    case 'band':
    case 'point':
      return [rangeMin || 0, rangeMax || 1];
    case 'ordinal': {
      const colors = categoricalColors(
        channel,
        options,
        domain,
        theme,
        library,
      );
      return name === 'color' ? colors : shapes;
    }
    case 'sequential':
      return undefined;
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
    case 'sqrt':
      return inferOptionsQ(coordinate, options);
    case 'band':
    case 'point':
      return inferOptionsC(type, name, coordinate, options);
    case 'sequential':
      return inferOptionsS(options);
    default:
      return options;
  }
}

function categoricalColors(
  channel: Channel,
  options: G2ScaleOptions,
  domain: Primitive[],
  theme: G2Theme,
  library: G2Library,
) {
  const [usePalette] = useLibrary<G2PaletteOptions, PaletteComponent, Palette>(
    'palette',
    library,
  );
  const { value } = channel;
  const { defaultCategory10: c10, defaultCategory20: c20 } = theme;
  const defaultPalette = unique(value).length <= c10.length ? c10 : c20;
  const { palette, offset } = options;
  const colors =
    interpolatedColors(palette, domain, offset) ||
    usePalette({ type: palette || defaultPalette });
  return colors;
}

function gradientColors(range: string): string[] {
  return range.split('-');
}

function interpolatedColors(
  palette: string,
  domain: Primitive[],
  offset = (d) => d,
): string[] {
  if (!palette) return null;
  const fullName = upperFirst(palette);

  // If scheme have enough colors, then return pre-defined colors.
  const scheme = d3ScaleChromatic[`scheme${fullName}`];
  if (!scheme) return null;
  // If is a one dimension array, return it.
  if (!scheme.some(Array.isArray)) return scheme;
  const schemeColors = scheme[domain.length];
  if (schemeColors) return schemeColors;

  // Otherwise interpolate to get full colors.
  const interpolator = d3ScaleChromatic[`interpolate${fullName}`];
  return domain.map((_, i) => interpolator(offset(i / domain.length)));
}

function inferOptionsS(options) {
  const { palette, offset } = options;
  const name = upperFirst(palette);
  const interpolator = d3ScaleChromatic[`interpolate${name}`];
  if (!interpolator) throw new Error(`Unknown palette: ${name}`);
  return {
    interpolator: offset ? (x) => interpolator(offset(x)) : interpolator,
  };
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
  if (
    options.padding !== undefined ||
    options.paddingInner !== undefined ||
    options.paddingOuter !== undefined
  ) {
    return { ...options, unknown: NaN };
  }
  const padding = inferPadding(type, name, coordinate);
  const { paddingInner = padding, paddingOuter = padding } = options;
  return {
    ...options,
    paddingInner,
    paddingOuter,
    padding,
    unknown: NaN,
  };
}

function inferPadding(
  type: string,
  name: string,
  coordinate: G2CoordinateOptions[],
): number {
  // The scale for enterDelay and enterDuration should has zero padding by default.
  // Because there is no need to add extra delay for the start and the end.
  if (name === 'enterDelay' || name === 'enterDuration') return 0;
  if (type === 'band') {
    return isTheta(coordinate) ? 0 : 0.1;
  }
  // Point scale need 0.5 padding to make interval between first and last point
  // equal to other intervals in polar coordinate.
  if (type === 'point') return 0.5;
  return 0;
}

function asOrdinalType(name: string) {
  return isQuantitative(name) ? 'point' : 'ordinal';
}

function inferDomainQ(value: Primitive[], options: G2ScaleOptions) {
  const { zero = false } = options;
  if (value.length === 0) return [];
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

function inferDomainS(value: Primitive[]) {
  let min = Infinity;
  let max = -Infinity;
  for (const d of value) {
    if (defined(d)) {
      min = Math.min(min, +d);
      max = Math.max(max, +d);
    }
  }
  return [min < 0 ? -max : min, max];
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

// Spatial and temporal position.
export function isPosition(name: string): boolean {
  return (
    name.startsWith('x') ||
    name.startsWith('y') ||
    name.startsWith('position') ||
    name === 'enterDelay' ||
    name === 'enterDuration' ||
    name === 'updateDelay' ||
    name === 'updateDuration' ||
    name === 'exitDelay' ||
    name === 'exitDuration'
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
    return target;
    // throw new Error(
    //   `Incompatible scale type: ${target} !== ${source} for channel: ${channel}`,
    // );
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
