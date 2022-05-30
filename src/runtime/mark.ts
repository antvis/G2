import { group } from 'd3-array';
import { composeAsync, defined } from '../utils/helper';
import { indexOf } from '../utils/array';
import { useLibrary } from './library';
import {
  Channel,
  G2MarkState,
  G2Theme,
  TabularData,
  MaybeArray,
} from './types/common';
import {
  G2View,
  G2Library,
  G2Mark,
  G2ScaleOptions,
  G2TransformOptions,
  G2EncodeOptions,
} from './types/options';
import { MarkProps } from './types/mark';
import {
  EncodeSpec,
  NormalizedEncodeSpec,
  PrimitiveEncodeSpec,
  EncodeComponent,
  Encode,
} from './types/encode';
import {
  ColumnOf,
  TransformContext,
  Transform,
  TransformComponent,
} from './types/transform';
import { inferScale } from './scale';

export async function initializeMark(
  partialMark: G2Mark,
  partialProps: MarkProps,
  channelScale: Map<string, G2ScaleOptions>,
  theme: G2Theme,
  options: G2View,
  library: G2Library,
): Promise<[G2Mark, G2MarkState]> {
  // Apply transform to get data to be visualized.
  const { data, encode, I, columnOf } = await applyTransform(
    partialMark,
    partialProps,
    library,
  );

  // Skip mark with non-tabular or empty data.
  if (Array.isArray(data) === false || data.length === 0) {
    return null;
  }

  // Extract column of data for each channel.
  const { channels: channelDescriptors } = partialProps;
  const nameEncodes = group(
    Object.entries(encode).filter(([, value]) => defined(value)),
    ([key]) => {
      const match = /([^\d]+)\d*$/.exec(key);
      return match[1];
    },
  );
  const channels = channelDescriptors
    .filter((descriptor) => {
      const { name, required } = descriptor;
      if (nameEncodes.has(name)) return true;
      if (required) throw new Error(`Missing encoding for channel: ${name}.`);
      return false;
    })
    .flatMap((descriptor) => {
      const { name } = descriptor;
      const encodes = nameEncodes.get(name);
      return encodes.map((e) => createChannel(descriptor, data, e, columnOf));
    });

  //  Infer scale for each channel.
  const scale = {};
  const { scale: partialScale = {} } = partialMark;
  const { coordinate = [] } = options;
  const scaleChannels = group(channels, (d) => d.scaleName);

  for (const [scaleName, channels] of scaleChannels.entries()) {
    const { shapes } = partialProps;
    const channel = mergeChannel(channels);
    const { [scaleName]: scaleOptions = {} } = partialScale;
    scale[scaleName] = inferScale(
      channel,
      scaleOptions,
      coordinate,
      shapes,
      theme,
      channelScale,
      library,
    );
  }

  const mark = {
    ...partialMark,
    encode,
    scale,
    data,
  };
  const state = { ...partialProps, channels, index: I };
  return [mark, state];
}

function createTransformContext(
  mark: G2Mark,
  library: G2Library,
): TransformContext {
  const [useEncode] = useLibrary<G2EncodeOptions, EncodeComponent, Encode>(
    'encode',
    library,
  );
  const { data, encode = {}, transform = [], scale = {} } = mark;
  const columnOf: ColumnOf = (data, encode) => {
    if (encode === undefined) return null;
    if (data === undefined) return null;
    const normalizedEncode = normalizeEncode(data, encode);
    const value = useEncode(normalizedEncode)(data);
    const field = fieldOf(normalizedEncode);
    value.field = field;
    return value;
  };
  return {
    data,
    I: Array.isArray(data) ? indexOf(data) : [],
    encode: flatEncode(encode),
    columnOf,
    transform,
    scale,
  };
}

function flatEncode(
  encode: Record<string, MaybeArray<EncodeSpec>>,
): Record<string, EncodeSpec> {
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
  return flattenEncode;
}

function inferEncodeType(
  data: TabularData,
  encode: PrimitiveEncodeSpec,
): string {
  if (typeof encode === 'function') return 'transform';
  if (typeof encode === 'string' && data?.[0]?.[encode] !== undefined) {
    return 'field';
  }
  return 'constant';
}

function normalizeEncode(
  data: TabularData,
  encode: EncodeSpec,
): NormalizedEncodeSpec {
  if (typeof encode === 'object' && !(encode instanceof Date)) return encode;
  const type = inferEncodeType(data, encode);
  return { type, value: encode };
}

function applyTransform(
  mark: G2Mark,
  props: MarkProps,
  library: G2Library,
): TransformContext | Promise<TransformContext> {
  const [useTransform, createTransform] = useLibrary<
    G2TransformOptions,
    TransformComponent,
    Transform
  >('transform', library);

  // Create transform Context.
  const context = createTransformContext(mark, library);

  // Create transforms functions.
  const { transform: partialTransform = [] } = mark;
  const { preInference = [], postInference = [] } = props;

  const connectors = [];
  const preprocessors = [];
  const statistics = [];
  for (const t of partialTransform) {
    const { type } = t;
    const { category } = createTransform(type).props;
    if (category === 'preprocessor') preprocessors.push(t);
    else if (category === 'connector') connectors.push(t);
    else statistics.push(t);
  }
  const transform = [
    ...connectors,
    ...preprocessors,
    ...preInference,
    ...statistics,
    ...postInference,
  ];
  const transformFunctions = transform.map(useTransform);

  // Apply transforms functions to transform context.
  return composeAsync(transformFunctions)(context);
}

function createChannel(
  descriptor: Channel,
  data: TabularData,
  nameEncode: [string, EncodeSpec],
  columnOf: ColumnOf,
): Channel {
  const { independent = false, name, scaleName, ...rest } = descriptor;
  const [encodeName, encode] = nameEncode;
  const normalizedEncode = normalizeEncode(data, encode);
  const { type } = normalizedEncode;
  return {
    ...rest,
    type,
    name: encodeName,
    scaleName: scaleName ?? (independent ? encodeName : name),
    value: columnOf(data, normalizedEncode),
    field: fieldOf(normalizedEncode),
  };
}

function mergeChannel(channels: Channel[]): Channel {
  const target: Channel = {};
  for (const source of channels) {
    const { value: targetValue = [], field: targetField } = target;
    const { value: sourceValue = [], field: sourceField } = source;
    Object.assign(target, source);
    target.value = [...targetValue, ...sourceValue];
    target.field = sourceField == null ? targetField : sourceField;
  }
  return target;
}

function fieldOf(encode: NormalizedEncodeSpec): string {
  const { type, value } = encode;
  if (type === 'field' && typeof value === 'string') return value;
  if (value && value.field) return value.field;
  return null;
}
