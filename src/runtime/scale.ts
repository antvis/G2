import { Linear, createInterpolateValue } from '@antv/scale';
import { extent, max, rollups } from 'd3-array';
import * as d3ScaleChromatic from 'd3-scale-chromatic';
import { deepMix, omit, upperFirst } from '@antv/util';
import { firstOf, lastOf, unique } from '../utils/array';
import { defined, identity, isStrictObject } from '../utils/helper';
import { Primitive, G2Theme, G2MarkState, ChannelGroups } from './types/common';
import {
  G2CoordinateOptions,
  G2Library,
  G2ScaleOptions,
  G2PaletteOptions,
  G2Mark,
  G2View,
} from './types/options';
import {
  ScaleComponent,
  PaletteComponent,
  Palette,
  Scale,
} from './types/component';
import { isTheta } from './coordinate';
import { useLibrary } from './library';
import { MarkChannel } from './types/mark';

export function inferScale(
  name: string,
  values: Primitive[][],
  options: Record<string, any>,
  coordinates: G2CoordinateOptions[],
  theme: G2Theme,
  library: G2Library,
) {
  const { guide = {} } = options;
  const type = inferScaleType(name, values, options);
  if (typeof type !== 'string') return options;
  const expectedDomain = inferScaleDomain(type, name, values, options);
  const actualDomain = maybeRatio(type, expectedDomain, options);
  return {
    ...options,
    ...inferScaleOptions(type, name, values, options, coordinates),
    domain: actualDomain,
    range: inferScaleRange(
      type,
      name,
      values,
      options,
      actualDomain,
      theme,
      library,
    ),
    expectedDomain,
    guide,
    name,
    type,
  };
}

export function applyScale(
  channels: ChannelGroups[],
  scale: Record<string, Scale>,
): MarkChannel {
  const scaledValue = {};
  for (const channel of channels) {
    const { values, name: scaleName } = channel;
    const scaleInstance = scale[scaleName];
    for (const value of values) {
      const { name, value: V } = value;
      scaledValue[name] = V.map((d) => scaleInstance.map(d));
    }
  }
  return scaledValue;
}

export function groupTransform(
  markState: Map<G2Mark, G2MarkState>,
  uidScale: Map<symbol, Scale>,
) {
  const channels = Array.from(markState.values()).flatMap((d) => d.channels);

  const scaleGroups = rollups(
    channels,
    (channels) => channels.map((d) => uidScale.get(d.scale.uid)),
    (d) => d.name,
  )
    .filter(
      ([, scales]) =>
        scales.some(
          (d) => typeof d.getOptions().groupTransform === 'function',
        ) && // only sync scales with groupTransform options
        scales.every((d) => d.getTicks), // only sync quantitative scales
    )
    .map((d) => d[1]);

  scaleGroups.forEach((group) => {
    const groupTransform = group.map((d) => d.getOptions().groupTransform)[0];
    groupTransform(group);
  });
}

export function collectScales(states: G2MarkState[], options: G2View) {
  const { components = [] } = options;

  const NONE_STATIC_KEYS = [
    'scale',
    'encode',
    'axis',
    'legend',
    'data',
    'transform',
  ];

  // From normal marks.
  const scales = Array.from(
    new Set(states.flatMap((d) => d.channels.map((d) => d.scale))),
  );

  // From static marks.
  const nameScale = new Map(scales.map((scale) => [scale.name, scale]));
  for (const component of components) {
    const channels = inferChannelsForComponent(component);
    for (const channel of channels) {
      const scale = nameScale.get(channel);
      const staticScale = component.scale?.[channel] || {};
      const { independent = false } = staticScale;

      if (scale && !independent) {
        // Merged with exist scales if is not independent.
        const { guide } = scale;
        const guide1 = typeof guide === 'boolean' ? {} : guide;
        scale.guide = deepMix({}, guide1, component);
        Object.assign(scale, staticScale);
      } else {
        // Append new scales without exit scales or independent.
        const options1 = {
          ...staticScale,
          expectedDomain: staticScale.domain,
          name: channel,
          guide: omit(component, NONE_STATIC_KEYS),
        };
        scales.push(options1);
      }
    }
  }
  return scales;
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

export function assignScale(
  target: Record<string, Scale>,
  source: Record<string, Scale>,
): Record<string, Scale> {
  const keys = Object.keys(target);
  for (const scale of Object.values(source)) {
    const { name } = scale.getOptions();
    if (!(name in target)) target[name] = scale;
    else {
      const I = keys
        .filter((d) => d.startsWith(name))
        // Reg is for extract `1` from `x1`;
        .map((d) => +(d.replace(name, '') || 0));
      const index = max(I) + 1;
      const newKey = `${name}${index}`;
      target[newKey] = scale;
      scale.getOptions().key = newKey;
    }
  }
  return target;
}

export function useRelationScale(
  options: Record<string, any>,
  library: G2Library,
) {
  const [useScale] = useLibrary<G2ScaleOptions, ScaleComponent, Scale>(
    'scale',
    library,
  );
  const { relations } = options;
  const [conditionalize] = useRelation(relations);
  const scale = useScale(options);
  return conditionalize(scale);
}

export function syncFacetsScales(states: Map<G2Mark, G2MarkState>[]): void {
  const scales = states
    .flatMap((d) => Array.from(d.values()))
    .flatMap((d) => d.channels.map((d) => d.scale));
  syncFacetsScaleByChannel(scales, 'x');
  syncFacetsScaleByChannel(scales, 'y');
}

function inferChannelsForComponent(component) {
  const { channels = [], type, scale = {} } = component;
  const L = ['shape', 'color', 'opacity', 'size'];
  if (channels.length !== 0) return channels;
  if (type === 'axisX') return ['x'];
  if (type === 'axisY') return ['y'];
  if (type === 'legends')
    return Object.keys(scale).filter((d) => L.includes(d));
  return [];
}

function syncFacetsScaleByChannel(
  scales: G2ScaleOptions[],
  channel: 'x' | 'y',
): void {
  const S = scales.filter(
    ({ name, facet = true }) => facet && name === channel,
  );
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

function maybeRatio(
  type: string,
  domain: Primitive[],
  options: G2ScaleOptions,
) {
  const { ratio } = options;
  if (ratio === undefined || ratio === null) return domain;
  if (isQuantitativeScale({ type })) {
    return clampQuantitativeScale(domain as number[], ratio, type);
  }
  if (isDiscreteScale({ type })) return clampDiscreteScale(domain, ratio);
  return domain;
}

function clampQuantitativeScale(domain: number[], ratio: number, type: string) {
  const D = domain.map(Number);
  const scale = new Linear({
    domain: D,
    range: [D[0], D[0] + (D[D.length - 1] - D[0]) * ratio],
  });
  if (type === 'time') return domain.map((d) => new Date(scale.map(d)));
  return domain.map((d) => scale.map(d));
}

function clampDiscreteScale(domain: Primitive[], ratio: number) {
  const index = Math.round(domain.length * ratio);
  return domain.slice(0, index);
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

// @todo More accurate inference for different cases.
function inferScaleType(
  name: string,
  values: Primitive[][],
  options: G2ScaleOptions,
): string | ScaleComponent {
  const { type, domain, range, quantitative, ordinal } = options;
  if (type !== undefined) return type;
  if (isObject(values)) return 'identity';
  if (typeof range === 'string') return 'linear';
  if ((domain || range || []).length > 2) return asOrdinalType(name, ordinal);
  if (domain !== undefined) {
    if (isOrdinal([domain])) return asOrdinalType(name, ordinal);
    if (isTemporal(values)) return 'time';
    return asQuantitativeType(name, range, quantitative);
  }
  if (isOrdinal(values)) return asOrdinalType(name, ordinal);
  if (isTemporal(values)) return 'time';
  return asQuantitativeType(name, range, quantitative);
}

function inferScaleDomain(
  type: string,
  name: string,
  values,
  options: G2ScaleOptions,
): Primitive[] {
  const { domain } = options;
  if (domain !== undefined) return domain;
  switch (type) {
    case 'linear':
    case 'time':
    case 'log':
    case 'pow':
    case 'sqrt':
    case 'quantize':
    case 'threshold':
      return maybeMinMax(inferDomainQ(values, options), options);
    case 'band':
    case 'ordinal':
    case 'point':
      return inferDomainC(values);
    case 'quantile':
      return inferDomainO(values);
    case 'sequential':
      return maybeMinMax(inferDomainS(values), options);
    default:
      return [];
  }
}

function inferScaleRange(
  type: string,
  name: string,
  values: Primitive[][],
  options: G2ScaleOptions,
  domain: Primitive[],
  theme: G2Theme,
  library: G2Library,
) {
  const { range } = options;
  if (typeof range === 'string') return gradientColors(range);
  if (range !== undefined) return range;
  const { rangeMin, rangeMax } = options;
  switch (type) {
    case 'linear':
    case 'time':
    case 'log':
    case 'pow':
    case 'sqrt': {
      const colors = categoricalColors(values, options, domain, theme, library);
      const [r0, r1] = inferRangeQ(name, colors);
      return [rangeMin ?? r0, rangeMax ?? r1];
    }
    case 'band':
    case 'point': {
      const min = name === 'size' ? 5 : 0;
      const max = name === 'size' ? 10 : 1;
      return [rangeMin ?? min, rangeMax ?? max];
    }
    case 'ordinal': {
      return categoricalColors(values, options, domain, theme, library);
    }
    case 'sequential':
      return undefined;
    case 'constant':
      return [values[0][0]];
    default:
      return [];
  }
}

function inferScaleOptions(
  type: string,
  name: string,
  values: Primitive[][],
  options: G2ScaleOptions,
  coordinates: G2CoordinateOptions[],
): G2ScaleOptions {
  switch (type) {
    case 'linear':
    case 'time':
    case 'log':
    case 'pow':
    case 'sqrt':
      return inferOptionsQ(coordinates, options);
    case 'band':
    case 'point':
      return inferOptionsC(type, name, coordinates, options);
    case 'sequential':
      return inferOptionsS(options);
    default:
      return options;
  }
}

function categoricalColors(
  values: Primitive[][],
  options: G2ScaleOptions,
  domain: Primitive[],
  theme: G2Theme,
  library: G2Library,
) {
  const [usePalette] = useLibrary<G2PaletteOptions, PaletteComponent, Palette>(
    'palette',
    library,
  );
  const { category10: c10, category20: c20 } = theme;
  const defaultPalette = unique(domain).length <= c10.length ? c10 : c20;
  const { palette = defaultPalette, offset } = options;
  if (Array.isArray(palette)) return palette;
  // Built-in palettes have higher priority.
  try {
    return usePalette({ type: palette });
  } catch (e) {
    const colors = interpolatedColors(palette, domain, offset);
    if (colors) return colors;
    throw new Error(`Unknown Component: ${palette} `);
  }
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
  const interpolator = d3ScaleChromatic[`interpolate${fullName}`];
  if (!scheme && !interpolator) return null;

  if (scheme) {
    // If is a one dimension array, return it.
    if (!scheme.some(Array.isArray)) return scheme;
    const schemeColors = scheme[domain.length];
    if (schemeColors) return schemeColors;
  }

  // Otherwise interpolate to get full colors.
  return domain.map((_, i) => interpolator(offset(i / domain.length)));
}

function inferOptionsS(options) {
  const { palette = 'ylGnBu', offset } = options;
  const name = upperFirst(palette);
  const interpolator = d3ScaleChromatic[`interpolate${name}`];
  if (!interpolator) throw new Error(`Unknown palette: ${name}`);
  return {
    interpolator: offset ? (x) => interpolator(offset(x)) : interpolator,
  };
}

function inferOptionsQ(
  coordinates: G2CoordinateOptions[],
  options: G2ScaleOptions,
): G2ScaleOptions {
  const {
    interpolate = createInterpolateValue,
    nice = false,
    tickCount = 5,
  } = options;
  return { ...options, interpolate, nice, tickCount };
}

function inferOptionsC(
  type: string,
  name: string,
  coordinates: G2CoordinateOptions[],
  options: G2ScaleOptions,
): G2ScaleOptions {
  if (
    options.padding !== undefined ||
    options.paddingInner !== undefined ||
    options.paddingOuter !== undefined
  ) {
    return { ...options, unknown: NaN };
  }
  const padding = inferPadding(type, name, coordinates);
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
  coordinates: G2CoordinateOptions[],
): number {
  // The scale for enterDelay and enterDuration should has zero padding by default.
  // Because there is no need to add extra delay for the start and the end.
  if (name === 'enterDelay' || name === 'enterDuration') return 0;
  if (name === 'size') return 0;
  if (type === 'band') return isTheta(coordinates) ? 0 : 0.1;
  // Point scale need 0.5 padding to make interval between first and last point
  // equal to other intervals in polar coordinate.
  if (type === 'point') return 0.5;
  return 0;
}

function asOrdinalType(name: string, defaults: string) {
  if (defaults) return defaults;
  return isQuantitative(name) ? 'point' : 'ordinal';
}

function asQuantitativeType(
  name: string,
  range: Primitive[],
  defaults: string,
) {
  if (defaults) return defaults;
  if (name !== 'color') return 'linear';
  return range ? 'linear' : 'sequential';
}

function maybeMinMax(
  domain: Primitive[],
  options: G2ScaleOptions,
): Primitive[] {
  if (domain.length === 0) return domain;
  const { domainMin, domainMax } = options;
  const [d0, d1] = domain;
  return [domainMin ?? d0, domainMax ?? d1];
}

function inferDomainQ(values: Primitive[][], options: G2ScaleOptions) {
  const { zero = false } = options;
  let min = Infinity;
  let max = -Infinity;
  for (const value of values) {
    for (const d of value) {
      if (defined(d)) {
        min = Math.min(min, +d);
        max = Math.max(max, +d);
      }
    }
  }
  if (min === Infinity) return [];
  return zero ? [Math.min(0, min), max] : [min, max];
}

function inferDomainC(values: Primitive[][]) {
  return Array.from(new Set(values.flat()));
}

function inferDomainO(values: Primitive[][]) {
  return values.flat().sort();
}

function inferDomainS(values: Primitive[][]) {
  let min = Infinity;
  let max = -Infinity;
  for (const value of values) {
    for (const d of value) {
      if (defined(d)) {
        min = Math.min(min, +d);
        max = Math.max(max, +d);
      }
    }
  }
  if (min === Infinity) return [];
  return [min < 0 ? -max : min, max];
}

/**
 * @todo More nice default range for enterDelay and enterDuration.
 * @todo Move these to channel definition.
 */
function inferRangeQ(name: string, palette: Palette): Primitive[] {
  if (name === 'enterDelay') return [0, 1000];
  if (name == 'enterDuration') return [300, 1000];
  if (name.startsWith('y') || name.startsWith('position')) return [1, 0];
  if (name === 'color') return [firstOf(palette), lastOf(palette)];
  if (name === 'opacity') return [0, 1];
  if (name === 'size') return [1, 10];
  return [0, 1];
}

function isOrdinal(values: Primitive[][]): boolean {
  return some(values, (d) => {
    const type = typeof d;
    return type === 'string' || type === 'boolean';
  });
}

function isTemporal(values: Primitive[][]): boolean {
  return some(values, (d) => d instanceof Date);
}

function isObject(values: Primitive[][]): boolean {
  return some(values, isStrictObject);
}

function some(values, callback) {
  for (const V of values) {
    if (V.some(callback)) return true;
  }
  return false;
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

export function isValidScale(scale: G2ScaleOptions) {
  if (!scale || !scale.type) return false;
  if (typeof scale.type === 'function') return true;
  const { type, domain, range, interpolator } = scale;
  const isValidDomain = domain && domain.length > 0;
  const isValidRange = range && range.length > 0;

  if (
    [
      'linear',
      'sqrt',
      'log',
      'time',
      'pow',
      'threshold',
      'quantize',
      'quantile',
      'ordinal',
      'band',
      'point',
    ].includes(type) &&
    isValidDomain &&
    isValidRange
  ) {
    return true;
  }

  if (
    ['sequential'].includes(type) &&
    isValidDomain &&
    (isValidRange || interpolator)
  ) {
    return true;
  }

  if (['constant', 'identity'].includes(type) && isValidRange) return true;

  return false;
}
