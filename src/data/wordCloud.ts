import { min, max } from 'd3-array';
import { DataComponent as DC } from '../runtime';
import { tagCloud } from './utils/d3-cloud';
import { flow } from './utils/flow';

export type WordCloudOptions = Omit<Record<string, any>, 'type'>;

const DEFAULT_OPTIONS: Partial<WordCloudOptions> = {
  size: [500, 500],
  fontSize: [14, 28],
};

export function processImageMask(
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
      image.onload = () => res(image);
      image.onerror = () => {
        console.error(`'image ${img} load failed !!!'`);
        rej();
      };
      return;
    }
    rej();
  });
}

export function normalizeFontSize(fontSize: any, range?: [number, number]) {
  if (typeof fontSize === 'function') return fontSize;

  if (Array.isArray(fontSize)) {
    const [fMin, fMax] = fontSize;
    if (!range) return () => (fMax + fMin) / 2;

    const [min, max] = range;
    if (max === min) return () => (fMax + fMin) / 2;

    return ({ value }) => ((fMax - fMin) / (max - min)) * (value - min) + fMin;
  }
  return () => fontSize;
}

export const WordCloud: DC<WordCloudOptions> = (options) => {
  return async (data) => {
    const cloudOptions = Object.assign({}, DEFAULT_OPTIONS, options);
    const layout = tagCloud();

    await flow(layout, cloudOptions)
      .set('fontSize', (v) => {
        const arr = data.map((d) => d.value);
        return normalizeFontSize(v, [min(arr) as any, max(arr) as any]);
      })
      .set('font')
      .set('fontStyle')
      .set('fontWeight')
      .set('padding')
      .set('rotate')
      .set('size')
      .set('spiral')
      .set('timeInterval')
      .set('random')
      .set('text')
      .set('on')
      .setAsync('imageMask', processImageMask, layout.createMask);

    layout.words([...data]);

    const result = layout.start();

    const [cw, ch] = cloudOptions.size;
    const defaultBounds = [
      { x: 0, y: 0 },
      { x: cw, y: ch },
    ];
    const { _bounds: bounds = defaultBounds, _tags, hasImage } = result;

    const tags = _tags.map(({ x, y, ...rest }) => ({
      ...rest,
      x: x + cw / 2,
      y: y + ch / 2,
    }));

    // Append two data to replace the corner of top-left and bottom-right, avoid calculate the actual bounds will occur some error.
    const [{ x: tlx, y: tly }, { x: brx, y: bry }] = bounds;
    const invisibleText = { text: '', value: 0, opacity: 0, fontSize: 0 };
    tags.push(
      {
        ...invisibleText,
        x: hasImage ? 0 : tlx,
        y: hasImage ? 0 : tly,
      },
      {
        ...invisibleText,
        x: hasImage ? cw : brx,
        y: hasImage ? ch : bry,
      },
    );

    return tags;
  };
};

WordCloud.props = {};
