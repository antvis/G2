import { TransformComponent as TC } from '../runtime';
import { WordCloudTransform } from '../spec';
import { log, LEVEL } from '../utils/invariant';
import { tagCloud } from './utils/d3-cloud';
import { useMemoTransform } from './utils/memo';

export type WordCloudOptions = Omit<WordCloudTransform, 'type'>;

export const WordCloud: TC<WordCloudOptions> = (options) => {
  return useMemoTransform(
    async (data) => {
      const layout = tagCloud();

      [
        'font',
        'fontStyle',
        'fontSize',
        'fontWeight',
        'padding',
        'rotate',
        'size',
        'spiral',
        'timeInterval',
        'random',
        'text',
      ].forEach((key: string) => {
        if (options[key]) {
          layout[key](options[key]);
        }
      });

      layout.words(data);

      const imageMask = await processImageMask(options.imageMask);
      if (imageMask) {
        layout.createMask(imageMask);
      }

      const result = layout.start();
      const tags: any[] = result._tags;

      tags.forEach((tag) => {
        tag.x += options.size[0] / 2;
        tag.y += options.size[1] / 2;
      });

      const [w, h] = options.size;
      const bounds = result._bounds || [
        { x: 0, y: 0 },
        { x: options.size[0], y: options.size[1] },
      ];
      const hasImage = result.hasImage;
      tags.push({
        text: '',
        value: 0,
        x: hasImage ? 0 : bounds[0].x,
        y: hasImage ? 0 : bounds[0].y,
        opacity: 0,
      });
      tags.push({
        text: '',
        value: 0,
        x: hasImage ? w : bounds[1].x,
        y: hasImage ? h : bounds[1].y,
        opacity: 0,
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

WordCloud.props = {};
