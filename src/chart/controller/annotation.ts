import * as _ from '@antv/util';
import { LAYER } from '../../constant';
import { Annotation as AnnotationComponent, IGroup, Scale } from '../../dependents';
import { Point } from '../../interface';
import View from '../view';
import { Controller } from './base';

type PositionCallback = (
  xScales: Scale[] | Record<string, Scale>,
  yScales: Scale[] | Record<string, Scale>
) => [number, number];

export type Position = [number | string, number | string] | Record<string, number | string> | PositionCallback;

export interface BaseOption {
  readonly type?: string;
  // 指定 annotation 是否绘制在 canvas 最上层，默认为 false, 即绘制在最下层
  readonly top?: boolean;
  // 起始位置
  readonly start: Position;
  // 结束位置
  readonly end: Position;
  // 图形样式属性
  readonly style?: object;
}

export interface ImageOption extends BaseOption {
  width: number;
  // 图片的高度
  height: number;
  // 图片路径
  src: string;
  // x 方向的偏移量
  offsetX?: number;
  // y 方向偏移量
  offsetY?: number;
}

export interface LineOption extends BaseOption {
  text: TextOption;
}

export type RegionOption = BaseOption;

export interface TextOption {
  // 指定 guide 是否绘制在 canvas 最上层，默认为 false, 即绘制在最下层
  readonly top?: boolean;
  // 文本位置
  readonly position: Position;
  // 显示的文本内容
  readonly content: string;
  // 文本的图形样式属性
  readonly style?: object;
  // x 方向的偏移量
  readonly offsetX?: number;
  // y 方向偏移量
  readonly offsetY?: number;
}

/**
 * annotation controller, supply:
 * 1. API for creating annotation: line、text、arc ...
 * 2. life circle: init、layout、render、clear、destroy
 */
export class Annotation extends Controller<undefined> {
  /** all annotation options passed by API */
  private options: BaseOption[] = [];

  private foregroundContainer: IGroup;
  private backgroundContainer: IGroup;

  constructor(view: View) {
    super(view);

    this.foregroundContainer = this.view.getLayer(LAYER.FORE).addGroup();
    this.backgroundContainer = this.view.getLayer(LAYER.BG).addGroup();
  }

  public init() {}

  public layout() {
    // absolute layout, nothing should be done.
  }

  public render() {
    const viewTheme = this.view.getTheme();

    _.each(this.options, (option: BaseOption) => {
      const { type } = option;
      const theme = _.get(viewTheme, ['annotation', type], {});

      const Ctor = AnnotationComponent[_.upperFirst(type)];
      if (Ctor) {
        const cfg = this.getAnnotationCfg(type, option, theme);
        const annotation = new Ctor(cfg);
        this.components.push(annotation);
      }
    });
  }

  public clear() {
    super.clear();

    this.foregroundContainer.clear();
    this.backgroundContainer.clear();

    // clear all options
    this.options = [];
  }

  public destroy() {
    super.destroy();

    this.foregroundContainer.remove(true);
    this.backgroundContainer.remove(true);
  }

  // APIs for creating annotation component
  private annotation(option: any) {
    this.options.push(option);
  }

  /**
   * create an image
   * @param option
   * @returns AnnotationController
   */
  public image(option: ImageOption) {
    this.annotation({
      type: 'image',
      ...option,
    });
  }

  /**
   * create a line
   * @param option
   * @returns AnnotationController
   */
  public line(option: LineOption) {
    this.annotation({
      type: 'line',
      ...option,
    });
  }

  /**
   * create a region
   * @param option
   * @returns AnnotationController
   */
  public region(option: RegionOption) {
    this.annotation({
      type: 'region',
      ...option,
    });
  }

  /**
   * create a text
   * @param option
   * @returns AnnotationController
   */
  public text(option: TextOption) {
    this.annotation({
      type: 'text',
      ...option,
    });
  }
  // end API

  /**
   * parse the point position to [x, y]
   * @param p Position
   * @returns { x, y }
   */
  private parsePosition(p: Position): Point {
    const xScale = this.view.getXScale();
    const yScales = this.view.getYScales();

    const position: Position = _.isFunction(p) ? p.call(null, xScale, yScales) : p;

    let x = 0;
    let y = 0;
    // 入参是 ['50%', '50%'] 这类时
    if (_.isArray(position) && _.includes(position[0] as any, '%')) {
      return this.parsePercentPosition(position as [string, string]);
    }

    // 入参是 [24, 24] 这类时
    if (_.isArray(position)) {
      x = this.getNormalizedValue(position[0], xScale);
      y = this.getNormalizedValue(position[1], _.head(yScales));
    } else if (!_.isNil(position)) {
      // 入参是 object 结构，数据点
      for (const key of _.keys(position)) {
        const value = position[key];
        if (key === xScale.field) {
          x = this.getNormalizedValue(value, xScale);
        }
        if (yScales[key]) {
          y = this.getNormalizedValue(value, yScales[key]);
        }
      }
    }

    return this.view.getCoordinate().convert({ x, y });
  }

  /**
   * parse the value position
   * @param val
   * @param scale
   */
  private getNormalizedValue(val: number | string, scale: Scale) {
    let result: number;
    let scaled: number;

    switch (val) {
      case 'start':
        result = 0;
        break;
      case 'end':
        result = 1;
        break;
      case 'median': {
        scaled = scale.isCategory ? (scale.values.length - 1) / 2 : (scale.min + scale.max) / 2;
        result = scale.scale(scaled);
        break;
      }
      case 'min':
      case 'max':
        if (scale.isCategory) {
          scaled = val === 'min' ? 0 : scale.values.length - 1;
        } else {
          scaled = scale[val];
        }
        result = scale.scale(scaled);
        break;
      default:
        result = scale.scale(val);
    }

    return result;
  }

  /**
   * parse percent position
   * @param position
   */
  private parsePercentPosition(position: [string, string]): Point {
    const xPercent = parseFloat(position[0]) / 100;
    const yPercent = parseFloat(position[1]) / 100;
    const coordinate = this.view.getCoordinate();
    const { start, end } = coordinate;

    const topLeft = {
      x: Math.min(start.x, end.x),
      y: Math.min(start.y, end.y),
    };
    const x = coordinate.getWidth() * xPercent + topLeft.x;
    const y = coordinate.getHeight() * yPercent + topLeft.y;
    return { x, y };
  }

  /**
   * get annotation component config by different type
   * @param type
   * @param option
   * @param theme
   */
  private getAnnotationCfg(type: string, option: any, theme: object): object {
    let o = {};
    if (type === 'image') {
      // TODO Image Annotation width, height, offsetX, offsetY 需要处理
      const { start, end, width, height, offsetX, offsetY, style } = option as ImageOption;
      o = {
        start: this.parsePosition(start),
        end: this.parsePosition(end),
        style,
      };
    } else if (type === 'line') {
      const { start, end, text, style } = option as LineOption;
      o = {
        start: this.parsePosition(start),
        end: this.parsePosition(end),
        // 继续处理一下
        text: this.getAnnotationCfg('text', text, theme),
        style,
      };
    } else if (type === 'region') {
      const { start, end, style } = option as RegionOption;
      o = {
        start: this.parsePosition(start),
        end: this.parsePosition(end),
        style,
      };
    } else if (type === 'text') {
      const { position, content, offsetX, offsetY, style } = option;
      o = {
        ...this.processOffset(this.parsePosition(position), offsetX, offsetY),
        content,
        style,
      };
    }

    const container = this.getComponentContainer(option);
    // 合并主题，用户配置优先级高于 主题
    return _.deepMix({}, theme, { ...o, container });
  }

  /**
   * get the container by option.top
   * default is on top
   * @param option
   * @returns the container
   */
  private getComponentContainer(option: any) {
    return _.get(option, 'top', true) ? this.foregroundContainer : this.backgroundContainer;
  }

  /**
   * process the offset
   * @param p
   * @param offsetX
   * @param offsetY
   * @returns new point
   */
  private processOffset(p: Point, offsetX: number = 0, offsetY: number = 0): Point {
    const { x, y } = p;

    return { x: x + offsetX, y: y + offsetY };
  }
}
