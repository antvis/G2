import { Primitive } from 'd3-array';
import { deepMix } from '@antv/util';
import { indexOf, mapObject } from '../utils/array';
import { composeAsync, defined } from '../utils/helper';
import { useLibrary } from './library';
import { createColumnOf } from './mark';
import { Data, DataComponent } from './types/data';
import { G2Mark, G2DataOptions } from './types/options';
import { TransformContext } from './types/transform';
import { isPosition } from './scale';

// @todo Add more defaults.
export function applyDefaults(
  I: number[],
  mark: G2Mark,
  context: TransformContext,
): [number[], G2Mark] {
  const { encode = {}, scale = {}, transform = [], ...rest } = mark;
  return [I, { ...rest, encode, scale, transform }];
}

export async function applyDataTransform(
  I: number[],
  mark: G2Mark,
  context: TransformContext,
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
  const transformFunctions = transform.map(useData);
  const transformedData = await composeAsync(transformFunctions)(data);
  return [
    Array.isArray(transformedData) ? indexOf(transformedData) : [],
    { ...mark, data: transformedData },
  ];
}

export function flatEncode(
  I: number[],
  mark: G2Mark,
  context: TransformContext,
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
  context: TransformContext,
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

// @todo Move visual property to style instead of flagging visual.
export function maybeVisualChannel(
  I: number[],
  mark: G2Mark,
  context: TransformContext,
): [number[], G2Mark] {
  const { encode } = mark;
  if (!encode) return [I, mark];
  const newEncode = mapObject(encode, (channel, name) => {
    const { type } = channel;
    if (type !== 'constant' || isPosition(name)) return channel;
    return { ...channel, visual: true };
  });
  return [I, { ...mark, encode: newEncode }];
}

export function extractColumns(
  I: number[],
  mark: G2Mark,
  context: TransformContext,
): [number[], G2Mark] {
  const { encode, data } = mark;
  if (!encode) return [I, mark];
  const { library } = context;
  const columnOf = createColumnOf(library);
  const valuedEncode = mapObject(encode, (channel) => columnOf(data, channel));
  return [I, { ...mark, encode: valuedEncode }];
}

export function maybeArrayField(
  I: number[],
  mark: G2Mark,
  context: TransformContext,
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
  context: TransformContext,
): [number[], G2Mark] {
  const { axis = {}, legend = {} } = mark;
  const normalize = (guide: boolean | Record<string, any>, channel: string) => {
    if (typeof guide === 'boolean') return guide ? {} : null;
    const eachGuide = guide[channel];
    return eachGuide === undefined || eachGuide ? eachGuide : null;
  };
  const axisChannels =
    typeof axis === 'object'
      ? Array.from(new Set(['x', 'y', ...Object.keys(axis)]))
      : ['x', 'y'];

  deepMix(mark, {
    scale: {
      ...Object.fromEntries(
        axisChannels.map((channel) => [
          channel,
          { guide: normalize(axis, channel) },
        ]),
      ),
      color: { guide: normalize(legend, 'color') },
      size: { guide: normalize(legend, 'size') },
    },
  });
  return [I, mark];
}

export function maybeNonAnimate(
  I: number[],
  mark: G2Mark,
  context: TransformContext,
): [number[], G2Mark] {
  const { animate } = mark;
  if (animate || animate === undefined) return [I, mark];
  deepMix(mark, {
    animate: {
      enterType: null,
      exitType: null,
      updateType: null,
    },
  });
  return [I, mark];
}

function isTypedChannel(channel): boolean {
  if (typeof channel !== 'object' || channel instanceof Date) return false;
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
  // Return null as a placeholder.
  if (!data) return { type: 'inline', value: null };
  if (Array.isArray(data)) return { type: 'inline', value: data };
  const { type = 'inline', ...rest } = data;
  return { ...rest, type };
}
