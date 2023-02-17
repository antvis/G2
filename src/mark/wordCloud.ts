import { deepMix } from '@antv/util';
import { getBBoxSize } from '../utils/size';
import { CompositionComponent as CC } from '../runtime';
import { WordCloudMark } from '../spec';
import {
  WordCloud as WordCloudTransform,
  WordCloudOptions as WordCloudTransformOptions,
} from '../data';

export type WordCloudOptions = Omit<WordCloudMark, 'type'>;

function initializeData(data, encode) {
  const { text = 'text', value = 'value' } = encode;
  return data.map((d) => ({
    ...d,
    text: d[text],
    value: d[value],
  }));
}

export const WordCloud: CC<WordCloudOptions> = (options) => {
  return async (viewOptions) => {
    const { width, height } = getBBoxSize(viewOptions);
    const {
      data,
      encode = {},
      scale,
      style = {},
      layout = {},
      ...resOptions
    } = options;
    const DEFAULT_LAYOUT_OPTIONS: WordCloudTransformOptions = {
      size: [width, height],
    };
    const DEFAULT_OPTIONS = {
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
    };
    const initializedData = initializeData(data, encode);
    const transformData = await WordCloudTransform({
      ...DEFAULT_LAYOUT_OPTIONS,
      ...layout,
    })(initializedData);

    return [
      deepMix({}, DEFAULT_OPTIONS, {
        data: transformData,
        encode,
        scale,
        style,
        ...resOptions,
        axis: false,
      }),
    ];
  };
};

WordCloud.props = {};
