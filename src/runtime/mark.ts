import { compose, composeAsync } from '../utils/helper';
import { indexOf, mapObject, transpose, isFlatArray } from '../utils/array';
import { useLibrary } from './library';
import { G2Theme } from './types/common';
import {
  MarkProps,
  Transform,
  TransformComponent,
  InferComponent,
  Infer,
  EncodeComponent,
  Encode,
  StatisticComponent,
  Statistic,
  InferredEncode,
} from './types/component';
import {
  G2View,
  G2Library,
  G2Mark,
  G2ScaleOptions,
  G2TransformOptions,
  G2InferOptions,
  G2EncodeOptions,
  G2StatisticOptions,
} from './types/options';
import { inferEncodeType } from './encode';
import { inferScale } from './scale';

export async function initializeMark(
  partialMark: G2Mark,
  partialProps: MarkProps,
  channelScale: Map<string, G2ScaleOptions>,
  theme: G2Theme,
  options: G2View,
  library: G2Library,
): Promise<[G2Mark, MarkProps]> {
  const [useTransform] = useLibrary<
    G2TransformOptions,
    TransformComponent,
    Transform
  >('transform', library);
  const [useInfer] = useLibrary<G2InferOptions, InferComponent, Infer>(
    'infer',
    library,
  );
  const [useEncode] = useLibrary<G2EncodeOptions, EncodeComponent, Encode>(
    'encode',
    library,
  );
  const [useStatistic] = useLibrary<
    G2StatisticOptions,
    StatisticComponent,
    Statistic
  >('statistic', library);

  const {
    data,
    transform = [],
    encode: partialEncode = [],
    statistic: partialStatistic = [],
    scale: partialScale = {},
  } = partialMark;
  const { coordinate = [] } = options;
  const { infer, channels: channelDescriptors } = partialProps;

  // Apply transform to get tabular data.
  const transformFunctions = transform.map(useTransform);
  const transformedData = await composeAsync(transformFunctions)(data);

  // Skip mark with non-tabular or empty data.
  if (
    Array.isArray(transformedData) === false ||
    transformedData.length === 0
  ) {
    return null;
  }

  // Extract index from data.
  const index = indexOf(transformedData);

  // Infer encoding to get intact encoding with type.
  const typedEncode = inferEncodeType(partialEncode, transformedData);
  const inferFunctions = infer.map(useInfer);
  const { encode, transform: inferStatistic = () => partialStatistic } =
    compose(inferFunctions)({
      encode: typedEncode,
    });

  // Extract value from data based on inferred encodings.
  const value = mapObject(encode, (encodeOptions, key) => {
    if (Array.isArray(encodeOptions)) {
      const values = encodeOptions.map((d) => {
        const value = useEncode(d)(transformedData);
        if (isFlatArray(value)) {
          return value;
        } else {
          throw new Error("Array channel can't bind to array field.");
        }
      });
      // Position channel is a special channel which will be split into multiple
      // channels by statistic, so there is no need to transpose it.
      return key !== 'position' ? transpose(values) : values;
    } else {
      return useEncode(encodeOptions)(transformedData);
    }
  });

  // Infer statistic to get intact statistic(e.g. stackY, splitPosition)
  const indexedValue = { value, index };
  const statistic = inferStatistic(indexedValue, partialStatistic);

  // Apply inferred and specified statistic.
  const statisticFunctions = statistic.map(useStatistic);
  const { index: transformedIndex, value: transformedValue } =
    compose(statisticFunctions)(indexedValue);

  // Filter and create channels based on channelDescriptors and processed data.
  const channels = channelDescriptors
    .filter(({ name, required }) => {
      const value = transformedValue[name];
      if (value === undefined && required) {
        throw new Error(`Missing encoding for channel: ${name}.`);
      }
      return value !== undefined;
    })
    .flatMap(({ name, ...rest }) => {
      const encoding = encode[name];
      const type = inferChannelType(encoding);
      const field = inferChannelField(encoding);
      const value = transformedValue[name];
      if (name !== 'position') return { name, value, type, field, ...rest };

      // Split position channels to multiple channels.
      // position -> position[0], position[1], position[2]
      return Object.entries(transformedValue)
        .filter(([key]) => /position\[\d+\]/.test(key))
        .map(([key, value]) => {
          const match = /position\[(\d+)\]/g.exec(key);
          const index = +match[1];
          return {
            name: key,
            value,
            type,
            field: inferChannelField(encoding[index]),
            ...rest,
          };
        });
    });

  // Infer scale for each channel.
  const scale = {};
  for (const channel of channels) {
    const { name } = channel;
    const { shapes } = partialProps;
    scale[name] = inferScale(
      channel,
      partialScale[name] || {},
      coordinate,
      shapes,
      theme,
      channelScale,
      library,
    );
  }

  const mark = {
    ...partialMark,
    statistic,
    encode,
    scale,
    data: transformedData,
  };
  const props = { ...partialProps, channels, index: transformedIndex };
  return [mark, props];
}

// This is for scale type inference.
// It tells color channel to use a ordinal or identity scale.
// It also tells enter channel to use a identity or non-identity scale.
function inferChannelType(encode: InferredEncode) {
  if (encode === undefined) return undefined;
  if (Array.isArray(encode)) return undefined;
  return encode.type;
}

function inferChannelField(encode: InferredEncode) {
  if (encode === undefined) return undefined;
  if (Array.isArray(encode)) {
    return encode.map(({ value, type }) =>
      type === 'field' ? value : undefined,
    );
  }
  if (encode.type === 'field') return encode.value;
  return undefined;
}
