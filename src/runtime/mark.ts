import { group } from 'd3-array';
import { compose, composeAsync } from '../utils/helper';
import {
  indexOf,
  mapObject,
  transpose,
  firstOf,
  isFlatArray,
} from '../utils/array';
import { useLibrary } from './library';
import { G2Theme, IndexedValue } from './types/common';
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
  InferValue,
} from './types/component';
import {
  G2Area,
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
  options: G2Area,
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
  const encode = compose(inferFunctions)(typedEncode);

  // Extract value from data based on inferred encodings.
  const value = mapObject(encode, (encodeOptions) => {
    if (Array.isArray(encodeOptions)) {
      const values = encodeOptions.map((d) => {
        const value = useEncode(d)(transformedData);
        if (isFlatArray(value)) {
          return value;
        } else {
          throw new Error("Array channel can't bind to array field.");
        }
      });
      return transpose(values);
    } else {
      return useEncode(encodeOptions)(transformedData);
    }
  });

  // Infer statistic to stack data in some cases.
  const indexedValue = { value, index };
  const statistic = inferStack(partialStatistic, indexedValue);

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
    .map(({ name, ...rest }) => ({
      name,
      value: transformedValue[name],
      type: inferChannelType(encode[name]),
      field: inferChannelField(encode[name]),
      ...rest,
    }));

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

  const mark = { ...partialMark, statistic, encode, scale };
  const props = { ...partialProps, channels, index: transformedIndex };
  return [mark, props];
}

// This is for scale type inference.
// It tells color channel to use a ordinal or identity scale.
// It also tells enter channel to use a identity or non-identity scale.
function inferChannelType(encode: InferValue) {
  if (encode === undefined) return null;
  if (Array.isArray(encode)) return null;
  return encode.type;
}

function inferChannelField(encode: InferValue) {
  if (encode === undefined) return null;
  if (Array.isArray(encode)) {
    const fieldEncode = encode.find((d) => d.type === 'field');
    return fieldEncode?.value || null;
  }
  if (encode.type === 'field') return encode.value;
  return null;
}

// @todo Move into a standalone file.
function inferStack(
  statistic: G2StatisticOptions[],
  indexedValue: IndexedValue,
): G2StatisticOptions[] {
  // if (statistic.find(({ type }) => type === 'stackY' || type === 'dodgeX')) {
  //   return statistic;
  // }
  // const { index, value } = indexedValue;
  // const { x: X, y: Y } = value;
  // if (X === undefined || Y === undefined) return statistic;
  // const X1 = X.map(firstOf);
  // const groups = Array.from(group(index, (i) => X1[i]).values());
  // if (groups.some((d) => d.length > 1)) {
  //   return [{ type: 'stackY' }, ...statistic];
  // } else {
  //   return statistic;
  // }
  return statistic;
}
