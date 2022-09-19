import { group } from 'd3-array';
import { defined } from '../utils/helper';
import { unique } from '../utils/array';
import { useLibrary } from './library';
import { Channel, G2MarkState, G2Theme } from './types/common';
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
  NormalizedEncodeSpec,
  EncodeComponent,
  Encode,
  ColumnValue,
} from './types/encode';
import {
  ColumnOf,
  TransformContext,
  Transform,
  TransformComponent,
} from './types/transform';
import { inferScale } from './scale';
import {
  applyDefaults,
  applyDataTransform,
  extractColumns,
  flatEncode,
  inferChannelsType,
  maybeArrayField,
  maybeVisualChannel,
} from './transform';

export async function initializeMark(
  partialMark: G2Mark,
  partialProps: MarkProps,
  channelScale: Map<string, G2ScaleOptions>,
  theme: G2Theme,
  options: G2View,
  library: G2Library,
): Promise<[G2Mark, G2MarkState]> {
  // Apply transform to mark to derive indices, data, encode, etc,.
  const context = { library };
  const [I, transformedMark] = await applyMarkTransform(
    partialMark,
    partialProps,
    context,
  );
  const { data, encode, scale: partialScale = {} } = transformedMark;

  // Skip mark with non-tabular data. Do not skip empty
  // data, they are useful for facet to display axes.
  if (Array.isArray(data) === false) {
    return null;
  }

  // Extract column of data for each channel.
  const { channels: channelDescriptors } = partialProps;
  const nameEncodes = group(
    Object.entries(encode).filter(([, value]) => defined(value)),
    ([key]) => /([^\d]+)\d*$/.exec(key)?.[1],
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
      return encodes.map((e) => createChannel(descriptor, e));
    });

  //  Infer scale for each channel.
  const scale = {};
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

  const mark = { ...transformedMark, scale };
  const state = { ...partialProps, channels, index: I };
  return [mark, state];
}

export function createColumnOf(library: G2Library): ColumnOf {
  const [useEncode] = useLibrary<G2EncodeOptions, EncodeComponent, Encode>(
    'encode',
    library,
  );
  return (data, encode) => {
    if (encode === undefined) return null;
    if (data === undefined) return null;
    return {
      ...encode,
      type: 'column',
      value: useEncode(encode)(data),
      field: fieldOf(encode),
    };
  };
}

async function applyMarkTransform(
  mark: G2Mark,
  props: MarkProps,
  context: TransformContext,
): Promise<[number[], G2Mark]> {
  const { library } = context;
  const [useTransform] = useLibrary<
    G2TransformOptions,
    TransformComponent,
    Transform
  >('transform', library);
  const { preInference = [], postInference = [] } = props;
  const { transform = [] } = mark;
  const transforms = [
    applyDefaults,
    applyDataTransform,
    flatEncode,
    inferChannelsType,
    maybeVisualChannel,
    extractColumns,
    maybeArrayField,
    ...preInference.map(useTransform),
    ...transform.map(useTransform),
    ...postInference.map(useTransform),
  ];
  let index = [];
  let transformedMark = mark;
  for (const t of transforms) {
    [index, transformedMark] = await t(index, transformedMark, context);
  }
  return [index, transformedMark];
}

function createChannel(
  descriptor: Channel,
  nameEncode: [string, ColumnValue],
): Channel {
  const { independent = false, name, scaleName, ...rest } = descriptor;
  const [encodeName, encode] = nameEncode;
  return {
    ...rest,
    ...encode,
    name: encodeName,
    scaleName: scaleName ?? (independent ? encodeName : name),
  };
}

function mergeChannel(channels: Channel[]): Channel {
  const target: Channel = {};
  for (const source of channels) {
    const { value: targetValue = [] } = target;
    const { value: sourceValue = [] } = source;
    Object.assign(target, source);
    target.value = [...targetValue, ...sourceValue];
  }
  target.field = unique(channels.flatMap((d) => d.field).filter(defined));
  return target;
}

function fieldOf(encode: NormalizedEncodeSpec): string {
  const { type, value } = encode;
  if (type === 'field' && typeof value === 'string') return value;
  return null;
}
