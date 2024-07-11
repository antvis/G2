import { rollups } from 'd3-array';
import { defined } from '../utils/helper';
import { useLibrary } from './library';
import { G2MarkState } from './types/common';
import {
  G2Library,
  G2Mark,
  G2TransformOptions,
  G2EncodeOptions,
  G2Context,
} from './types/options';
import { MarkProps } from './types/mark';
import { NormalizedEncodeSpec, EncodeComponent, Encode } from './types/encode';
import { ColumnOf, Transform, TransformComponent } from './types/transform';
import {
  applyDefaults,
  applyDataTransform,
  extractColumns,
  flatEncode,
  inferChannelsType,
  maybeArrayField,
  maybeVisualChannel,
  addGuideToScale,
  maybeNonAnimate,
  normalizeTooltip,
  extractTooltip,
} from './transform';

export async function initializeMark(
  partialMark: G2Mark,
  partialProps: MarkProps,
  context: G2Library,
): Promise<[G2Mark, G2MarkState]> {
  // Apply transform to mark to derive indices, data, encode, etc,.
  const [I, transformedMark] = await applyMarkTransform(
    partialMark,
    partialProps,
    context,
  );

  const { encode, scale, data, tooltip } = transformedMark;

  // Skip mark with non-tabular data. Do not skip empty
  // data, they are useful for facet to display axes.
  if (Array.isArray(data) === false) {
    return null;
  }

  // Group non-independent channels with same prefix, such as x1, x2 => x.
  // For independent channels, dot not group them, such as position1, position2.
  const { channels: channelDescriptors } = partialProps;
  const nameChannels = rollups(
    Object.entries(encode).filter(([, value]) => defined(value)),
    (values) =>
      values.map(([key, options]) => ({
        name: key,
        ...options,
      })),
    ([key]) => {
      const prefix = /([^\d]+)\d*$/.exec(key)?.[1];
      const descriptor = channelDescriptors.find((d) => d.name === prefix);
      if (descriptor?.independent) return key;
      return prefix;
    },
  );

  // Check required channels and initialize scale options for each channel.
  const channels = channelDescriptors
    .filter((descriptor) => {
      const { name, required } = descriptor;
      if (nameChannels.find(([d]) => d === name)) return true;
      if (required) throw new Error(`Missing encoding for channel: ${name}.`);
      return false;
    })
    .flatMap((descriptor) => {
      const {
        name,
        scale: scaleType,
        scaleKey,
        range,
        quantitative,
        ordinal,
      } = descriptor;
      const valuesArray = nameChannels.filter(([channel]) =>
        channel.startsWith(name),
      );
      return valuesArray.map(([channel, values], i) => {
        const visual = values.some((d) => d.visual);
        const constant = values.some((d) => d.constant);
        const {
          independent = false,
          // Use channel name as default scale key.
          key = scaleKey || channel,
          // Visual channel use identity scale.
          type = constant ? 'constant' : visual ? 'identity' : scaleType,
          ...scaleOptions
        } = scale[channel] || {};
        // For constant scale, infer range from data.
        const isConstant = type === 'constant';
        const finalRange = isConstant ? undefined : range;
        return {
          name: channel,
          values,
          // Generate a unique key for independent channel,
          // which will not group with any other channels.
          scaleKey: independent || isConstant ? Symbol('independent') : key,
          scale: {
            type,
            range: finalRange,
            ...scaleOptions,
            quantitative,
            ordinal,
          },
        };
      });
    });

  return [transformedMark, { ...partialProps, index: I, channels, tooltip }];
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
  context: G2Context,
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
    maybeNonAnimate,
    addGuideToScale,
    normalizeTooltip,
    ...preInference.map(useTransform),
    ...transform.map(useTransform),
    ...postInference.map(useTransform),
    extractTooltip,
  ];
  let index = [];
  let transformedMark = mark;
  for (const t of transforms) {
    [index, transformedMark] = await t(index, transformedMark, context);
  }
  return [index, transformedMark];
}

function fieldOf(encode: NormalizedEncodeSpec): string {
  const { type, value } = encode;
  if (type === 'field' && typeof value === 'string') return value;
  return null;
}
