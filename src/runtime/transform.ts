import { Primitive } from 'd3-array';
import { deepMix, isNumber } from '@antv/util';
import { format } from 'd3-format';
import { indexOf, mapObject } from '../utils/array';
import {
  composeAsync,
  defined,
  isStrictObject,
  isUnset,
} from '../utils/helper';
import { isFullTooltip } from '../utils/mark';
import { useLibrary } from './library';
import { createColumnOf } from './mark';
import { Data, DataComponent } from './types/data';
import { G2Mark, G2DataOptions, G2Context } from './types/options';
import { isPosition } from './scale';

// @todo Add more defaults.
export function applyDefaults(
  I: number[],
  mark: G2Mark,
  context: G2Context,
): [number[], G2Mark] {
  const { encode = {}, scale = {}, transform = [], ...rest } = mark;
  return [I, { ...rest, encode, scale, transform }];
}

export async function applyDataTransform(
  I: number[],
  mark: G2Mark,
  context: G2Context,
): Promise<[number[], G2Mark]> {
  const { library } = context;
  const { data } = mark;
  const [useData] = useLibrary<G2DataOptions, DataComponent, Data>(
    'data',
    library,
  );
  const descriptor = normalizedDataSource(data);
  const { transform: T = [], ...connector } = descriptor;
  const transform = [connector, ...T];
  const transformFunctions = transform.map((t) => useData(t, context));
  const transformedData = await composeAsync(transformFunctions)(data);

  // Maintain the consistency of shape between input and output data.
  // If the shape of raw data is like { value: any }
  // and the returned transformedData is Object,
  // returns the wrapped data: { value: transformedData },
  // otherwise returns the processed tabular data.
  const newData =
    data && !Array.isArray(data) && !Array.isArray(transformedData)
      ? { value: transformedData }
      : transformedData;

  return [
    Array.isArray(transformedData) ? indexOf(transformedData) : [],
    { ...mark, data: newData },
  ];
}

export function flatEncode(
  I: number[],
  mark: G2Mark,
  context: G2Context,
): [number[], G2Mark] {
  const { encode } = mark;
  if (!encode) return [I, mark];
  const flattenEncode = {};
  for (const [key, value] of Object.entries(encode)) {
    if (Array.isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        const name = `${key}${i === 0 ? '' : i}`;
        flattenEncode[name] = value[i];
      }
    } else {
      flattenEncode[key] = value;
    }
  }
  return [I, { ...mark, encode: flattenEncode }];
}

export function inferChannelsType(
  I: number[],
  mark: G2Mark,
  context: G2Context,
): [number[], G2Mark] {
  const { encode, data } = mark;
  if (!encode) return [I, mark];
  const typedEncode = mapObject(encode, (channel) => {
    if (isTypedChannel(channel)) return channel;
    const type = inferChannelType(data, channel);
    return { type, value: channel };
  });
  return [I, { ...mark, encode: typedEncode }];
}

export function maybeVisualChannel(
  I: number[],
  mark: G2Mark,
  context: G2Context,
): [number[], G2Mark] {
  const { encode } = mark;
  if (!encode) return [I, mark];
  const newEncode = mapObject(encode, (channel, name) => {
    const { type } = channel;
    if (type !== 'constant' || isPosition(name)) return channel;
    return { ...channel, constant: true };
  });
  return [I, { ...mark, encode: newEncode }];
}

export function extractColumns(
  I: number[],
  mark: G2Mark,
  context: G2Context,
): [number[], G2Mark] {
  const { encode, data } = mark;
  if (!encode) return [I, mark];
  const { library } = context;
  const columnOf = createColumnOf(library);
  const valuedEncode = mapObject(encode, (channel) => columnOf(data, channel));
  return [I, { ...mark, encode: valuedEncode }];
}

/**
 * Normalize mark.tooltip to {title, items}.
 */
export function normalizeTooltip(
  I: number[],
  mark: G2Mark,
  context: G2Context,
): [number[], G2Mark] {
  const { tooltip = {} } = mark;
  if (isUnset(tooltip)) return [I, mark];
  if (Array.isArray(tooltip)) {
    return [I, { ...mark, tooltip: { items: tooltip } }];
  }
  if (isStrictObject(tooltip) && isFullTooltip(tooltip)) {
    return [I, { ...mark, tooltip }];
  }
  return [I, { ...mark, tooltip: { items: [tooltip] } }];
}

export function extractTooltip(
  I: number[],
  mark: G2Mark,
  context: G2Context,
): [number[], G2Mark] {
  const { data, encode, tooltip = {} } = mark;
  if (isUnset(tooltip)) return [I, mark];
  const valueOf = (item) => {
    if (!item) return item;
    if (typeof item === 'string') {
      return I.map((i) => ({ name: item, value: data[i][item] }));
    }
    if (isStrictObject(item)) {
      const {
        field,
        channel,
        color,
        name = field,
        valueFormatter = (d) => d,
      } = item;

      // Support d3-format.
      const normalizedValueFormatter =
        typeof valueFormatter === 'string'
          ? format(valueFormatter)
          : valueFormatter;

      // Field name.
      const definedChannel = channel && encode[channel];
      const channelField = definedChannel && encode[channel].field;
      const name1 = name || channelField || channel;

      const values = [];
      for (const i of I) {
        const value1 = field
          ? data[i][field]
          : definedChannel
          ? encode[channel].value[i]
          : null;
        values[i] = {
          name: name1,
          color,
          value: normalizedValueFormatter(value1),
        };
      }
      return values;
    }
    if (typeof item === 'function') {
      const values = [];
      for (const i of I) {
        const v = item(data[i], i, data, encode);
        if (isStrictObject(v)) values[i] = v;
        else values[i] = { value: v };
      }
      return values;
    }
    return item;
  };
  const { title, items = [], ...rest } = tooltip;
  const newTooltip = {
    title: valueOf(title),
    items: Array.isArray(items) ? items.map(valueOf) : [],
    ...rest,
  };
  return [I, { ...mark, tooltip: newTooltip }];
}

export function maybeArrayField(
  I: number[],
  mark: G2Mark,
  context: G2Context,
): [number[], G2Mark] {
  const { encode, ...rest } = mark;
  if (!encode) return [I, mark];
  const columns = Object.entries(encode);
  const arrayColumns = columns
    .filter(([, channel]) => {
      const { value: V } = channel;
      return Array.isArray(V[0]);
    })
    .flatMap(([key, V]) => {
      const columns = [[key, new Array(I.length).fill(undefined)] as const];
      const { value: rows, ...rest } = V;
      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        if (Array.isArray(row)) {
          for (let j = 0; j < row.length; j++) {
            const column = columns[j] || [
              `${key}${j}`,
              new Array(I).fill(undefined),
            ];
            column[1][i] = row[j];
            columns[j] = column;
          }
        }
      }
      return columns.map(([key, value]) => [
        key,
        { type: 'column', value, ...rest },
      ]);
    });
  const newEncode = Object.fromEntries([...columns, ...arrayColumns]);
  return [I, { ...rest, encode: newEncode }];
}

export function addGuideToScale(
  I: number[],
  mark: G2Mark,
  context: G2Context,
): [number[], G2Mark] {
  const { axis = {}, legend = {}, slider = {}, scrollbar = {} } = mark;
  const normalize = (guide: boolean | Record<string, any>, channel: string) => {
    if (typeof guide === 'boolean') return guide ? {} : null;
    const eachGuide = guide[channel];
    return eachGuide === undefined || eachGuide ? eachGuide : null;
  };
  const axisChannels =
    typeof axis === 'object'
      ? Array.from(new Set(['x', 'y', 'z', ...Object.keys(axis)]))
      : ['x', 'y', 'z'];

  deepMix(mark, {
    scale: {
      ...Object.fromEntries(
        axisChannels.map((channel) => {
          const scrollbarOptions = normalize(scrollbar, channel);
          return [
            channel,
            {
              guide: normalize(axis, channel),
              slider: normalize(slider, channel),
              scrollbar: scrollbarOptions,
              ...(scrollbarOptions && {
                ratio:
                  scrollbarOptions.ratio === undefined
                    ? 0.5
                    : scrollbarOptions.ratio,
              }),
            },
          ];
        }),
      ),
      color: { guide: normalize(legend, 'color') },
      size: { guide: normalize(legend, 'size') },
      shape: { guide: normalize(legend, 'shape') },
      // fixme: opacity is conflict with DisplayObject.opacity
      // to be confirm.
      opacity: { guide: normalize(legend, 'opacity') },
    },
  });
  return [I, mark];
}

export function maybeNonAnimate(
  I: number[],
  mark: G2Mark,
  context: G2Context,
): [number[], G2Mark] {
  const { animate } = mark;
  if (animate || animate === undefined) return [I, mark];
  deepMix(mark, {
    animate: {
      enter: { type: null },
      exit: { type: null },
      update: { type: null },
    },
  });
  return [I, mark];
}

function isTypedChannel(channel): boolean {
  if (
    typeof channel !== 'object' ||
    channel instanceof Date ||
    channel === null
  ) {
    return false;
  }
  const { type } = channel;
  return defined(type);
}

function inferChannelType(data: Record<string, Primitive>[], channel): string {
  if (typeof channel === 'function') return 'transform';
  if (typeof channel === 'string' && isField(data, channel)) return 'field';
  return 'constant';
}

function isField(data: Record<string, Primitive>[], value: string): boolean {
  if (!Array.isArray(data)) return false;
  return data.some((d) => d[value] !== undefined);
}

function normalizedDataSource(data) {
  // Liquid、Gauge need number data.
  if (isNumber(data)) return { type: 'inline', value: data };
  // Return null as a placeholder.
  if (!data) return { type: 'inline', value: null };
  if (Array.isArray(data)) return { type: 'inline', value: data };
  const { type = 'inline', ...rest } = data;
  return { ...rest, type };
}
