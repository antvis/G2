import { min, max } from 'd3-array';
import { TransformComponent as TC } from '../runtime';
import { WordCloudTransform } from '../spec';
import { log, LEVEL } from '../utils/invariant';
import { tagCloud } from './utils/d3-cloud';
import { useMemoTransform } from './utils/memo';

export type WordCloudOptions = Omit<WordCloudTransform, 'type'>;

const DEFAULT_OPTIONS: Partial<WordCloudOptions> = {
  size: [500, 500],
  fontSize: [14, 28],
};

export const WordCloud: TC<WordCloudOptions> = (options) => {
  return useMemoTransform(
    async (data) => {
      const cloudOptions = Object.assign({}, DEFAULT_OPTIONS, options);
      const layout = tagCloud();

      if (cloudOptions.fontSize) {
        const arr = data.map((d) => d.value);
        const range = [min(arr) as any, max(arr) as any] as [number, number];
        layout.fontSize(getFontSizeMapping(cloudOptions.fontSize, range));
      }

      [
        'font',
        'fontStyle',
        'fontWeight',
        'padding',
        'rotate',
        'size',
        'spiral',
        'timeInterval',
        'random',
        'text',
        'on',
      ].forEach((key: string) => {
        if (cloudOptions[key]) {
          layout[key](cloudOptions[key]);
        }
      });

      layout.words([...data]);

      if (cloudOptions.imageMask) {
        const imageMask = await processImageMask(cloudOptions.imageMask);
        layout.createMask(imageMask);
      }

      const result = layout.start();
      const tags: any[] = result._tags;

      tags.forEach((tag) => {
        tag.x += cloudOptions.size[0] / 2;
        tag.y += cloudOptions.size[1] / 2;
      });

      // append two data to replace the corner of top-left and bottom-right
      const [w, h] = cloudOptions.size;
      const bounds = result._bounds || [
        { x: 0, y: 0 },
        { x: cloudOptions.size[0], y: cloudOptions.size[1] },
      ];
      const hasImage = result.hasImage;
      tags.push({
        text: '',
        value: 0,
        x: hasImage ? 0 : bounds[0].x,
        y: hasImage ? 0 : bounds[0].y,
        opacity: 0,
        fontSize: 0,
      });
      tags.push({
        text: '',
        value: 0,
        x: hasImage ? w : bounds[1].x,
        y: hasImage ? h : bounds[1].y,
        opacity: 0,
        fontSize: 0,
      });

      return tags;
    },
    [options],
  );
};

function processImageMask(
  img: HTMLImageElement | string,
): Promise<HTMLImageElement> {
  return new Promise((res, rej) => {
    if (img instanceof HTMLImageElement) {
      res(img);
      return;
    }
    if (typeof img === 'string') {
      const image = new Image();
      image.crossOrigin = 'anonymous';
      image.src = img;
      image.onload = () => {
        res(image);
      };
      image.onerror = () => {
        log(LEVEL.ERROR, false, 'image %s load failed !!!', img);
        rej();
      };
      return;
    }
    log(
      LEVEL.WARN,
      img === undefined,
      'The type of imageMask option must be String or HTMLImageElement.',
    );
    rej();
  });
}

/**
 * 把用户提供的 fontSize 值转换成符合 DataSet 要求的值
 * @param options
 * @param range
 */
function getFontSizeMapping(fontSize: any, range?: [number, number]) {
  if (typeof fontSize === 'function') {
    return fontSize;
  }
  if (Array.isArray(fontSize)) {
    const [fMin, fMax] = fontSize;
    if (!range) {
      return () => (fMax + fMin) / 2;
    }
    const [min, max] = range;
    if (max === min) {
      return () => (fMax + fMin) / 2;
    }
    return function fontSize({ value }) {
      return ((fMax - fMin) / (max - min)) * (value - min) + fMin;
    };
  }
  return () => fontSize;
}

WordCloud.props = {};
