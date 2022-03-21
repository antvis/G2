import { extent } from 'd3-array';
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
import { isPolar, isTranspose } from './coordinate';
import { useLibrary } from './library';

export function inferScale(
  channel: Channel,
  options: G2ScaleOptions,
  coordinate: G2CoordinateOptions[],
  shapes: string[],
  theme: G2Theme,
  channelScale: Map<string, G2ScaleOptions>,
  library: G2Library,
) {
  const { name } = channel;
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
  if (!channelScale.has(name)) {
    channelScale.set(name, potentialScale);
    return potentialScale;
  }
  const scale = channelScale.get(name);
  syncScale(scale, potentialScale);
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

function inferPotentialScale(
  channel: Channel,
  options: G2ScaleOptions,
  coordinate: G2CoordinateOptions[],
  shapes: string[],
  theme: G2Theme,
  library: G2Library,
): G2ScaleOptions {
  const { name, field } = channel;
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
    name,
    field,
    type,
  };
}

function inferScaleType(
  channel: FlattenChannel,
  options: G2ScaleOptions,
): string | ScaleComponent {
  const { scale, name, value, type: channelType } = channel;
  const { type, domain, range } = options;

  if (scale !== undefined) return scale;
  if (type !== undefined) return type;

  if (channelType === 'constant') {
    if (name === 'color') return 'identity';
    if (name === 'shape') return 'identity';
  }

  if ((domain || range || []).length > 2) return asOrdinalType(name);
  if (domain !== undefined) {
    if (isOrdinal(domain)) return asOrdinalType(name);
    return 'linear';
  }
  if (isOrdinal(value)) return asOrdinalType(name);
  if (isUnique(value)) return 'identity';
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
      return inferDomainQ(value);
    case 'band':
    case 'ordinal':
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
  switch (type) {
    case 'linear':
      return inferOptionsQ(coordinate, options);
    case 'band':
      return inferOptionsC(coordinate, options);
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
    nice = isPolar(coordinate) && isTranspose(coordinate) ? false : true,
  } = options;
  return { ...options, interpolate, nice };
}

function inferOptionsC(
  coordinate: G2CoordinateOptions[],
  options: G2ScaleOptions,
): G2ScaleOptions {
  const { padding = isPolar(coordinate) ? 0 : 0.1 } = options;
  return { ...options, padding };
}

// @todo point scale
function asOrdinalType(name: string) {
  return 'ordinal';
}

function inferDomainQ(value: Primitive[]) {
  return extent(value, (v) => +v);
}

function inferDomainC(value: Primitive[]) {
  return Array.from(new Set(value));
}
function inferRangeQ(name: string, palette: Palette): Primitive[] {
  if (name === 'y') return [1, 0];
  if (name === 'color') return [firstOf(palette), lastOf(palette)];
  return [0, 1];
}

function isOrdinal(values: Primitive[]): boolean {
  return values.some((v) => {
    const type = typeof v;
    return type === 'string' || type === 'boolean';
  });
}

function isUnique(values: Primitive[]): boolean {
  return Array.from(new Set(values)).length === 1;
}

// @todo
function syncScale(
  targetScale: G2ScaleOptions,
  sourceScale: G2ScaleOptions,
): void {}
