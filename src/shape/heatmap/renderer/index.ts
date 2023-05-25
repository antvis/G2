import { lru } from '../../../utils/lru';
import { parseGradient } from './gradient';
import {
  HeatmapGradient,
  HeatmapRendererData,
  HeatmapRendererOptions,
} from './types';

function newCanvas(
  createCanvas: () => HTMLCanvasElement,
  width: number,
  height: number,
) {
  const c = createCanvas ? createCanvas() : document.createElement('canvas');
  c.width = width;
  c.height = height;
  return c;
}

/**
 * Get a point with template.
 * @param radius
 * @param blurFactor
 * @returns
 */
const getPointTemplate = lru(
  (
    radius: number,
    blurFactor: number,
    createCanvas?: () => HTMLCanvasElement,
  ) => {
    const tplCanvas = newCanvas(createCanvas, radius * 2, radius * 2);
    const tplCtx = tplCanvas.getContext('2d');
    const x = radius;
    const y = radius;

    if (blurFactor === 1) {
      tplCtx.beginPath();
      tplCtx.arc(x, y, radius, 0, 2 * Math.PI, false);
      tplCtx.fillStyle = 'rgba(0,0,0,1)';
      tplCtx.fill();
    } else {
      const gradient = tplCtx.createRadialGradient(
        x,
        y,
        radius * blurFactor,
        x,
        y,
        radius,
      );
      gradient.addColorStop(0, 'rgba(0,0,0,1)');
      gradient.addColorStop(1, 'rgba(0,0,0,0)');
      tplCtx.fillStyle = gradient;
      tplCtx.fillRect(0, 0, 2 * radius, 2 * radius);
    }
    return tplCanvas;
  },
  (radius) => `${radius}`,
);

/**
 * Get a color palette with len = 256 base on gradient.
 * @param gradientConfig
 * @returns
 */
function getColorPalette(gradientConfig: HeatmapGradient, createCanvas) {
  const paletteCanvas = newCanvas(createCanvas, 256, 1);
  const paletteCtx = paletteCanvas.getContext('2d');

  const gradient = paletteCtx.createLinearGradient(0, 0, 256, 1);
  parseGradient(gradientConfig).forEach(([r, c]) => {
    gradient.addColorStop(r, c);
  });

  paletteCtx.fillStyle = gradient;
  paletteCtx.fillRect(0, 0, 256, 1);

  return paletteCtx.getImageData(0, 0, 256, 1).data;
}

/**
 * Draw all circle with alpha.
 */
function drawAlpha(
  shadowCtx,
  min: number,
  max: number,
  data: HeatmapRendererData[],
  options: HeatmapRendererOptions,
  createCanvas?: () => HTMLCanvasElement,
) {
  const { blur } = options;
  let len = data.length;
  while (len--) {
    const { x, y, value: v, radius } = data[len];
    // Ff value is bigger than max, use max as value.
    const value = Math.min(v, max);
    const rectX = x - radius;
    const rectY = y - radius;

    const tpl = getPointTemplate(radius, 1 - blur, createCanvas);
    // Value from minimum / value range, => [0, 1].
    const templateAlpha = (value - min) / (max - min);
    // Small values are not visible because globalAlpha < .001 cannot be read from imageData.
    shadowCtx.globalAlpha = Math.max(templateAlpha, 0.001);
    shadowCtx.drawImage(tpl, rectX, rectY);
  }
  return shadowCtx;
}

function colorize(
  shadowCtx,
  maxWidth: number,
  maxHeight: number,
  palette,
  options: HeatmapRendererOptions,
) {
  const { minOpacity, opacity, maxOpacity, useGradientOpacity } = options;
  const x = 0;
  const y = 0;
  const width = maxWidth;
  const height = maxHeight;

  const img = shadowCtx.getImageData(x, y, width, height);
  const imgData = img.data;
  const len = imgData.length;

  for (let i = 3; i < len; i += 4) {
    const alpha = imgData[i];
    const offset = alpha * 4;

    if (!offset) {
      continue;
    }

    // Should be in [min, max], min >= 0.
    const finalAlpha =
      opacity || Math.max(0, Math.min(maxOpacity, Math.max(minOpacity, alpha)));
    // Update rgba.
    imgData[i - 3] = palette[offset];
    imgData[i - 2] = palette[offset + 1];
    imgData[i - 1] = palette[offset + 2];
    imgData[i] = useGradientOpacity ? palette[offset + 3] : finalAlpha;
  }

  return img;
}

/**
 * Render a heatmap with canvas.
 * See [heatmap.js](https://github.com/pa7/heatmap.js/blob/master/src/renderer/canvas2d.js).
 */
export function HeatmapRenderer(
  width: number,
  height: number,
  min: number,
  max: number,
  data: HeatmapRendererData[],
  options: HeatmapRendererOptions,
  createCanvas: () => HTMLCanvasElement,
) {
  const opts: HeatmapRendererOptions = {
    blur: 0.85,
    minOpacity: 0,
    opacity: 0.6,
    maxOpacity: 1,
    gradient: [
      [0.25, 'rgb(0,0,255)'],
      [0.55, 'rgb(0,255,0)'],
      [0.85, 'yellow'],
      [1.0, 'rgb(255,0,0)'],
    ],
    ...options,
  };
  opts.minOpacity *= 255;
  opts.opacity *= 255;
  opts.maxOpacity *= 255;

  const shadowCanvas = newCanvas(createCanvas, width, height);
  const shadowCtx = shadowCanvas.getContext('2d');

  const palette = getColorPalette(opts.gradient, createCanvas);

  shadowCtx.clearRect(0, 0, width, height);
  drawAlpha(shadowCtx, min, max, data, opts, createCanvas);
  const img = colorize(shadowCtx, width, height, palette, opts);

  const canvas = newCanvas(createCanvas, width, height);
  const ctx = canvas.getContext('2d');
  ctx.putImageData(img, 0, 0);

  return ctx;
}
