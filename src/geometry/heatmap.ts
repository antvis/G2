import ColorUtil from '@antv/color-util';
import { get, isNumber } from '@antv/util';
import { FIELD_ORIGIN } from '../constant';
import { Color, IShape } from '../dependents';
import { Data, Datum, MappingDatum, ShapeInfo, AttributeOption, ColorAttrCallback } from '../interface';
import Geometry from './base';

/**
 * 用于绘制热力图。
 */
export default class Heatmap extends Geometry {
  public readonly type: string = 'heatmap';

  private paletteCache: Record<number, number> = {};
  private grayScaleBlurredCanvas: HTMLCanvasElement;
  private shadowCanvas: HTMLCanvasElement;
  private imageShape: IShape;

  protected updateElements(mappingDataArray: MappingDatum[][], isUpdate: boolean = false) {
    for (let i = 0; i < mappingDataArray.length; i++) {
      const mappingData = mappingDataArray[i];
      const range = this.prepareRange(mappingData);
      const radius = this.prepareSize();

      let blur = get(this.styleOption, ['cfg', 'shadowBlur']);
      if (!isNumber(blur)) {
        blur = radius / 2;
      }

      this.prepareGreyScaleBlurredCircle(radius, blur);
      this.drawWithRange(mappingData, range, radius, blur);
    }
  }

  /** 热力图暂时不支持 callback 回调（文档需要说明下） */
  public color(field: AttributeOption | string, cfg?: string | string[] | ColorAttrCallback): Geometry {
    this.createAttrOption('color', field, typeof cfg !== 'function' ? cfg : '');

    return this;
  }

  /**
   * clear
   */
  public clear() {
    super.clear();
    this.clearShadowCanvasCtx();
    this.paletteCache = {};
  }

  private prepareRange(data: MappingDatum[]) {
    const colorAttr = this.getAttribute('color');
    const colorField = colorAttr.getFields()[0];

    let min = Infinity;
    let max = -Infinity;
    data.forEach((row) => {
      const value = row[FIELD_ORIGIN][colorField];
      if (value > max) {
        max = value;
      }
      if (value < min) {
        min = value;
      }
    });

    if (min === max) {
      min = max - 1;
    }

    return [min, max];
  }

  private prepareSize() {
    let radius = this.getDefaultValue('size');
    if (!isNumber(radius)) {
      radius = this.getDefaultSize();
    }

    return radius;
  }

  private prepareGreyScaleBlurredCircle(radius: number, blur: number) {
    const grayScaleBlurredCanvas = this.getGrayScaleBlurredCanvas();
    const r2 = radius + blur;
    const ctx = grayScaleBlurredCanvas.getContext('2d');
    grayScaleBlurredCanvas.width = grayScaleBlurredCanvas.height = r2 * 2;
    ctx.clearRect(0, 0, grayScaleBlurredCanvas.width, grayScaleBlurredCanvas.height);
    ctx.shadowOffsetX = ctx.shadowOffsetY = r2 * 2;
    ctx.shadowBlur = blur;
    ctx.shadowColor = 'black';

    ctx.beginPath();
    ctx.arc(-r2, -r2, radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
  }

  private drawWithRange(data: MappingDatum[], range: number[], radius: number, blur: number) {
    // canvas size
    const { start, end } = this.coordinate;
    const width = this.coordinate.getWidth();
    const height = this.coordinate.getHeight();

    // value, range, etc
    const colorAttr = this.getAttribute('color');
    const valueField = colorAttr.getFields()[0];

    // prepare shadow canvas context
    this.clearShadowCanvasCtx();
    const ctx = this.getShadowCanvasCtx();
    // filter data
    if (range) {
      data = data.filter((row) => {
        return row[FIELD_ORIGIN][valueField] <= range[1] && row[FIELD_ORIGIN][valueField] >= range[0];
      });
    }

    // step1. draw points with shadow
    const scale = this.scales[valueField];
    for (const obj of data) {
      const { x, y } = this.getDrawCfg(obj);
      const alpha = scale.scale(obj[FIELD_ORIGIN][valueField]);
      this.drawGrayScaleBlurredCircle((x as number) - start.x, (y as number) - end.y, radius + blur, alpha, ctx);
    }

    // step2. convert pixels
    const colored = ctx.getImageData(0, 0, width, height);
    this.clearShadowCanvasCtx();
    this.colorize(colored);
    ctx.putImageData(colored, 0, 0);
    const imageShape = this.getImageShape();
    imageShape.attr('x', start.x);
    imageShape.attr('y', end.y);
    imageShape.attr('width', width);
    imageShape.attr('height', height);
    imageShape.attr('img', ctx.canvas);
    imageShape.set('origin', this.getShapeInfo(data)); // 存储绘图信息数据
  }

  private getDefaultSize() {
    const position = this.getAttribute('position');
    const coordinate = this.coordinate;
    return Math.min(
      coordinate.getWidth() / (position.scales[0].ticks.length * 4),
      coordinate.getHeight() / (position.scales[1].ticks.length * 4)
    );
  }

  private clearShadowCanvasCtx() {
    const ctx = this.getShadowCanvasCtx();
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }

  private getShadowCanvasCtx() {
    let canvas = this.shadowCanvas;
    if (!canvas) {
      canvas = document.createElement('canvas');
      this.shadowCanvas = canvas;
    }
    canvas.width = this.coordinate.getWidth();
    canvas.height = this.coordinate.getHeight();
    return canvas.getContext('2d');
  }

  private getGrayScaleBlurredCanvas() {
    if (!this.grayScaleBlurredCanvas) {
      this.grayScaleBlurredCanvas = document.createElement('canvas');
    }

    return this.grayScaleBlurredCanvas;
  }

  private drawGrayScaleBlurredCircle(x: number, y: number, r: number, alpha: number, ctx: CanvasRenderingContext2D) {
    const grayScaleBlurredCanvas = this.getGrayScaleBlurredCanvas();
    ctx.globalAlpha = alpha;
    ctx.drawImage(grayScaleBlurredCanvas, x - r, y - r);
  }

  private colorize(img: ImageData) {
    const colorAttr = this.getAttribute('color') as Color;
    const pixels = img.data;
    const paletteCache = this.paletteCache;
    for (let i = 3; i < pixels.length; i += 4) {
      const alpha = pixels[i]; // get gradient color from opacity value
      if (isNumber(alpha)) {
        const palette = paletteCache[alpha] ? paletteCache[alpha] : ColorUtil.rgb2arr(colorAttr.gradient(alpha / 256));
        pixels[i - 3] = palette[0];
        pixels[i - 2] = palette[1];
        pixels[i - 1] = palette[2];
        pixels[i] = alpha;
      }
    }
  }

  private getImageShape() {
    let imageShape = this.imageShape;
    if (imageShape) {
      return imageShape;
    }
    const container = this.container;
    imageShape = container.addShape({
      type: 'image',
      attrs: {},
    });
    this.imageShape = imageShape;
    return imageShape;
  }

  private getShapeInfo(mappingData: MappingDatum[]): ShapeInfo {
    const shapeCfg = this.getDrawCfg(mappingData[0]);

    const data = mappingData.map((obj: Datum) => {
      return obj[FIELD_ORIGIN];
    });

    return {
      ...shapeCfg,
      mappingData,
      data,
    };
  }
}
