import { deepMix, each, get, isArray, isFunction, isNil, isString, keys, upperFirst } from '@antv/util';
import { COMPONENT_TYPE, DIRECTION, LAYER } from '../../constant';
import { Annotation as AnnotationComponent, IGroup, Scale } from '../../dependents';
import { Point } from '../../interface';
import { ComponentOption } from '../interface';
import View from '../view';
import { Component } from './base';

type PositionCallback = (
  xScales: Scale[] | Record<string, Scale>,
  yScales: Scale[] | Record<string, Scale>
) => [number, number];

export type Position = [number | string, number | string] | Record<string, number | string> | PositionCallback;

export interface BaseOption {
  readonly type?: string;
  /** 指定 annotation 是否绘制在 canvas 最上层，默认为 false, 即绘制在最下层 */
  readonly top?: boolean;
  /** 起始位置 */
  readonly start: Position;
  /** 结束位置 */
  readonly end: Position;
  /** 图形样式属性 */
  readonly style?: object;
}

export interface ArcOption extends BaseOption {
  readonly startAngle?: number;
  readonly endAngle?: number;
}

export interface ImageOption extends BaseOption {
  /** 图片路径 */
  readonly src: string;
  /** x 方向的偏移量 */
  readonly offsetX?: number;
  /** y 方向偏移量 */
  readonly offsetY?: number;
}

export interface LineOption extends BaseOption {
  readonly text?: {
    /** 文本位置，除了制定 'start', 'center' 和 'end' 外，还可以使用百分比进行定位， 比如 '30%' */
    readonly position: 'start' | 'center' | 'end' | string;
    /** 是否自动旋转 */
    readonly autoRotate?: boolean;
    /** 显示的文本内容 */
    readonly content: string;
    /** 文本的图形样式属性 */
    readonly style?: object;
    /** x 方向的偏移量 */
    readonly offsetX?: number;
    /** y 方向偏移量 */
    readonly offsetY?: number;
    // /** 文本的旋转角度，弧度制 */
    // readonly rotate?: number;
  };
}

export type RegionOption = BaseOption;

export interface TextOption {
  /** 指定 guide 是否绘制在 canvas 最上层，默认为 false, 即绘制在最下层 */
  readonly top?: boolean;
  /** 文本位置 */
  readonly position: Position;
  readonly autoRotate?: boolean;
  /** 显示的文本内容 */
  readonly content: string;
  /** 文本的图形样式属性 */
  readonly style?: object;
  /** x 方向的偏移量 */
  readonly offsetX?: number;
  /** y 方向偏移量 */
  readonly offsetY?: number;
}

/**
 * annotation controller, supply:
 * 1. API for creating annotation: line、text、arc ...
 * 2. life circle: init、layout、render、clear、destroy
 */
export default class Annotation extends Component<BaseOption[]> {
  private foregroundContainer: IGroup;
  private backgroundContainer: IGroup;

  constructor(view: View) {
    super(view);

    this.foregroundContainer = this.view.getLayer(LAYER.FORE).addGroup();
    this.backgroundContainer = this.view.getLayer(LAYER.BG).addGroup();

    this.option = [];
  }

  public get name(): string {
    return 'annotation';
  }

  public init() {}

  public layout() {
    each(this.components, (co: ComponentOption) => {
      const { component, extra } = co;
      const { type } = extra;
      const theme = this.getAnnotationTheme(type);

      component.update(this.getAnnotationCfg(type, extra, theme));
    });
  }

  public render() {
    each(this.option, (option: BaseOption) => {
      const { type } = option;
      const theme = this.getAnnotationTheme(type);

      const Ctor = AnnotationComponent[upperFirst(type)];
      if (Ctor) {
        const cfg = this.getAnnotationCfg(type, option, theme);
        const annotation = new Ctor(cfg);

        annotation.render();

        this.components.push({
          component: annotation,
          layer: this.isTop(option) ? LAYER.FORE : LAYER.BG,
          direction: DIRECTION.NONE,
          type: COMPONENT_TYPE.ANNOTATION,
          extra: option,
        });
      }
    });
  }

  public clear(includeOption = false) {
    super.clear();

    this.foregroundContainer.clear();
    this.backgroundContainer.clear();

    // clear all option
    if (includeOption) {
      this.option = [];
    }
  }

  public destroy() {
    this.clear(true);

    this.foregroundContainer.remove(true);
    this.backgroundContainer.remove(true);
  }

  // APIs for creating annotation component
  private annotation(option: any) {
    this.option.push(option);
  }

  /**
   * create an arc
   * @param option
   * @returns AnnotationController
   */
  public arc(option: ArcOption) {
    this.annotation({
      type: 'arc',
      ...option,
    });

    return this;
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

    return this;
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

    return this;
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

    return this;
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

    return this;
  }
  // end API

  /**
   * parse the point position to [x, y]
   * @param p Position
   * @returns { x, y }
   */
  private parsePosition(p: Position): Point {
    const xScale = this.view.getXScale();
    // 转成 object
    const yScales = this.view.getScalesByDim('y');

    const position: Position = isFunction(p) ? p.call(null, xScale, yScales) : p;

    let x = 0;
    let y = 0;

    // 入参是 [24, 24] 这类时
    if (isArray(position)) {
      const [xPos, yPos] = position;
      // 如果数据格式是 ['50%', '50%'] 的格式
      // fix: 原始数据中可能会包含 'xxx5%xxx' 这样的数据，需要判断下 https://github.com/antvis/f2/issues/590
      // @ts-ignore
      if (isString(xPos) && xPos.indexOf('%') !== -1 && !isNaN(xPos.slice(0, -1))) {
        return this.parsePercentPosition(position as [string, string]);
      }

      x = this.getNormalizedValue(xPos, xScale);
      y = this.getNormalizedValue(yPos, Object.values(yScales)[0]);
    } else if (!isNil(position)) {
      // 入参是 object 结构，数据点
      for (const key of keys(position)) {
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

    if (isNil(option)) {
      return null;
    }

    if (type === 'arc') {
      // TODO arc 仅仅在 polar 才可用，API 配置可以再简化。
      const { start, end, startAngle, endAngle, style } = option as ArcOption;
      const sp = this.parsePosition(start);
      const ep = this.parsePosition(end);
      const center = this.view.getCoordinate().getCenter();
      const radius = Math.sqrt((sp.x - center.x) ** 2 + (sp.y - center.y) ** 2);

      o = {
        center,
        radius,
        startAngle,
        endAngle,
        style,
      };
    } else if (type === 'image') {
      const { start, end, src, offsetX, offsetY, style } = option as ImageOption;
      o = {
        start: this.parsePosition(start),
        end: this.parsePosition(end),
        src,
        offsetX,
        offsetY,
        style,
      };
    } else if (type === 'line') {
      const { start, end, text, style } = option as LineOption;
      o = {
        start: this.parsePosition(start),
        end: this.parsePosition(end),
        // 继续处理一下
        text: this.getAnnotationCfg('text', text, get(theme, ['text'], {})),
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
      const { position, autoRotate, content, offsetX, offsetY, style } = option;
      o = {
        ...this.parsePosition(position),
        content,
        autoRotate,
        offsetX,
        offsetY,
        style,
      };
    }

    const container = this.getComponentContainer(option);
    // 合并主题，用户配置优先级高于 主题
    return deepMix({}, theme, { ...o, container });
  }

  /**
   * is annotation render on top
   * @param option
   * @return whethe on top
   */
  private isTop(option: any): boolean {
    return get(option, 'top', true);
  }

  /**
   * get the container by option.top
   * default is on top
   * @param option
   * @returns the container
   */
  private getComponentContainer(option: any) {
    return this.isTop(option) ? this.foregroundContainer : this.backgroundContainer;
  }

  private getAnnotationTheme(type: string) {
    return get(this.view.getTheme(), ['components', 'annotation', type], {});
  }
}
