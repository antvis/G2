import { deepMix } from '@antv/util';
import { CompositeMarkComponent as CC } from '../runtime';
import { WordCloudMark } from '../spec';

export type WordCloudOptions = Omit<WordCloudMark, 'type'>;

function initializeData(data, encode) {
  const { text = 'text', value = 'value' } = encode;
  return data.map((d) => ({
    ...d,
    text: d[text],
    value: d[value],
  }));
}

const GET_DEFAULT_OPTIONS = () => ({
  axis: false,
  type: 'text',
  encode: {
    x: 'x',
    y: 'y',
    text: 'text',
    rotate: 'rotate',
    fontSize: 'size',
    shape: 'tag',
  },
  scale: {
    x: { range: [0, 1] },
    y: { range: [0, 1] },
  },
  style: {
    fontFamily: (d) => d.fontFamily,
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

  return deepMix({}, GET_DEFAULT_OPTIONS(), {
    data: {
      value: initializedData,
      transform: [
        {
          type: 'wordCloud',
          size: [width, height],
          ...layout,
        },
      ],
    },
    encode,
    scale,
    style,
    ...resOptions,
    axis: false,
  });
};

WordCloud.props = {};
