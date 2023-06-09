import { deepMix } from '@antv/util';
import { CompositeMarkComponent as CC } from '../runtime';
import { WordCloudMark } from '../spec';
import { WordCloud as WordCloudTransform } from '../data';

export type WordCloudOptions = Omit<WordCloudMark, 'type'>;

function initializeData(data, encode) {
  const { text = 'text', value = 'value' } = encode;
  return data.map((d) => ({
    ...d,
    text: d[text],
    value: d[value],
  }));
}

const GET_DEFAULT_LAYOUT_OPTIONS = (width, height) => ({
  size: [width, height],
});

const GET_DEFAULT_OPTIONS = (width, height) => ({
  axis: false,
  type: 'text',
  encode: {
    x: 'x',
    y: 'y',
    text: 'text',
    rotate: 'rotate',
    fontSize: 'size',
  },
  scale: {
    x: { domain: [0, width], range: [0, 1] },
    y: { domain: [0, height], range: [0, 1] },
    fontSize: { type: 'identity' },
    rotate: { type: 'identity' },
  },
  style: {
    textAlign: 'center',
  },
});

export const WordCloud: CC<WordCloudOptions> = async (options, context) => {
  const { width, height } = context;

  const {
    data,
    encode = {},
    scale,
    style = {},
    layout = {},
    ...resOptions
  } = options;

  const initializedData = initializeData(data, encode);

  const transformData = await WordCloudTransform({
    ...GET_DEFAULT_LAYOUT_OPTIONS(width, height),
    ...layout,
  })(initializedData);

  return deepMix({}, GET_DEFAULT_OPTIONS(width, height), {
    data: transformData,
    encode,
    scale,
    style,
    ...resOptions,
    axis: false,
  });
};

WordCloud.props = {};
