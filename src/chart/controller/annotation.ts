import {
  contains,
  deepMix,
  each,
  get,
  isArray,
  isFunction,
  isNil,
  isString,
  keys,
  upperFirst,
  find,
  includes,
} from '@antv/util';
import { Annotation as AnnotationComponent, IElement, IGroup } from '../../dependents';
import {
  AnnotationBaseOption as BaseOption,
  AnnotationPosition as Position,
  ArcOption,
  ComponentOption,
  ShapeAnnotationOption,
  Data,
  DataMarkerOption,
  DataRegionOption,
  Datum,
  HtmlAnnotationOption,
  ImageOption,
  LineOption,
  Point,
  RegionFilterOption,
  RegionOption,
  RegionPositionBaseOption,
  TextOption,
} from '../../interface';

import { DEFAULT_ANIMATE_CFG } from '../../animate/';
import { COMPONENT_TYPE, DIRECTION, GEOMETRY_LIFE_CIRCLE, LAYER, VIEW_LIFE_CIRCLE } from '../../constant';

import Geometry from '../../geometry/base';
import Element from '../../geometry/element';
import { getAngleByPoint, getDistanceToCenter } from '../../util/coordinate';
import { omit } from '../../util/helper';
import { getNormalizedValue } from '../../util/annotation';
import View from '../view';
import { Controller } from './base';
import { Scale } from '@antv/attr';

/** 需要在图形绘制完成后才渲染的辅助组件类型列表 */
const ANNOTATIONS_AFTER_RENDER = ['regionFilter', 'shape'];

/**
 * Annotation controller, 主要作用:
 * 1. 创建 Annotation: line、text、arc ...
 * 2. 生命周期: init、layout、render、clear、destroy
 */
export default class Annotation extends Controller<BaseOption[]> {
  private foregroundContainer: IGroup;
  private backgroundContainer: IGroup;

  /* 组件更新的 cache，组件配置 object : 组件 */
  private cache = new Map<BaseOption, ComponentOption>();

  constructor(view: View) {
    super(view);

    this.foregroundContainer = this.view.getLayer(LAYER.FORE).addGroup();
    this.backgroundContainer = this.view.getLayer(LAYER.BG).addGroup();

    this.option = [];
  }

  public get name(): string {
    return 'annotation';
  }

  public init() { }

  /**
   * 因为 annotation 需要依赖坐标系信息，所以 render 阶段为空方法，实际的创建逻辑都在 layout 中
   */
  public layout() {
    this.update();
  }

  // 因为 Annotation 不参与布局，但是渲染的位置依赖于坐标系，所以可以将绘制阶段延迟到 layout() 进行
  public render() { }

  /**
   * 更新
   */
  public update() {
    // 1. 先处理需要在图形渲染之后的辅助组件 需要在 Geometry 完成之后，拿到图形信息
    this.onAfterRender(() => {
      const updated = new Map<BaseOption, ComponentOption>();
      // 先看是否有 regionFilter/shape 要更新
      each(this.option, (option: BaseOption) => {
        if (includes(ANNOTATIONS_AFTER_RENDER, option.type)) {
          const co = this.updateOrCreate(option);
          // 存储已经处理过的
          if (co) {
            updated.set(this.getCacheKey(option), co);
          }
        }
      });

      // 处理完成之后，更新 cache
      // 处理完成之后，销毁删除的
      this.cache = this.syncCache(updated);
    });

    // 2. 处理非 regionFilter
    const updateCache = new Map<BaseOption, ComponentOption>();
    each(this.option, (option: BaseOption) => {
      if (!includes(ANNOTATIONS_AFTER_RENDER, option.type)) {
        const co = this.updateOrCreate(option);
        // 存储已经处理过的
        if (co) {
          updateCache.set(this.getCacheKey(option), co);
        }
      }
    });
    this.cache = this.syncCache(updateCache);
  }

  /**
   * 清空
   * @param includeOption 是否清空 option 配置项
   */
  public clear(includeOption = false) {
    super.clear();

    this.clearComponents();
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

  /**
   * 复写基类的方法
   */
  public getComponents(): ComponentOption[] {
    const co = [];

    this.cache.forEach((value: ComponentOption) => {
      co.push(value);
    });

    return co;
  }

  /**
   * 清除当前的组件
   */
  private clearComponents() {
    this.getComponents().forEach((co) => {
      co.component.destroy();
    });

    this.cache.clear();
  }

  /**
   * region filter 比较特殊的渲染时机
   * @param doWhat
   */
  private onAfterRender(doWhat: () => void) {
    if (this.view.getOptions().animate) {
      this.view.geometries.forEach((g: Geometry) => {
        // 如果 geometry 开启，则监听
        if (g.animateOption) {
          g.once(GEOMETRY_LIFE_CIRCLE.AFTER_DRAW_ANIMATE, () => {
            doWhat();
          });
        }
      });
    } else {
      this.view.getRootView().once(VIEW_LIFE_CIRCLE.AFTER_RENDER, () => {
        doWhat();
      });
    }
  }

  private createAnnotation(option: BaseOption) {
    const { type } = option;

    const Ctor = AnnotationComponent[upperFirst(type)];
    if (Ctor) {
      const theme = this.getAnnotationTheme(type);
      const cfg = this.getAnnotationCfg(type, option, theme);
      // 不创建
      if (!cfg) {
        return null;
      }
      const annotation = new Ctor(cfg);

      return {
        component: annotation,
        layer: this.isTop(cfg) ? LAYER.FORE : LAYER.BG,
        direction: DIRECTION.NONE,
        type: COMPONENT_TYPE.ANNOTATION,
        extra: option,
      };
    }
  }

  // APIs for creating annotation component
  public annotation(option: any) {
    this.option.push(option);
  }

  /**
   * 创建 Arc
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
   * 创建 image
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
   * 创建 Line
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
   * 创建 Region
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
   * 创建 Text
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

  /**
   * 创建 DataMarker
   * @param option
   * @returns AnnotationController
   */
  public dataMarker(option: DataMarkerOption) {
    this.annotation({
      type: 'dataMarker',
      ...option,
    });

    return this;
  }

  /**
   * 创建 DataRegion
   * @param option
   * @returns AnnotationController
   */
  public dataRegion(option: DataRegionOption) {
    this.annotation({
      type: 'dataRegion',
      ...option,
    });
  }

  /**
   * 创建 RegionFilter
   * @param option
   * @returns AnnotationController
   */
  public regionFilter(option: RegionFilterOption) {
    this.annotation({
      type: 'regionFilter',
      ...option,
    });
  }

  /**
   * 创建 ShapeAnnotation
   * @param option
   */
  public shape(option: ShapeAnnotationOption) {
    this.annotation({
      type: 'shape',
      ...option,
    });
  }

  /**
   * 创建 HtmlAnnotation
   * @param option
   */
  public html(option: HtmlAnnotationOption) {
    this.annotation({
      type: 'html',
      ...option,
    });
  }
  // end API

  /**
   * parse the point position to [x, y]
   * @param p Position
   * @returns { x, y }
   */
  private parsePosition(
    p:
      | [string | number, string | number]
      | Datum
      | ((xScale: Scale, yScale: Scale) => [string | number, string | number] | number | Datum)
  ): Point {
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

      x = getNormalizedValue(xPos, xScale);
      y = getNormalizedValue(yPos, Object.values(yScales)[0]);
    } else if (!isNil(position)) {
      // 入参是 object 结构，数据点
      for (const key of keys(position)) {
        const value = position[key];
        if (key === xScale.field) {
          x = getNormalizedValue(value, xScale);
        }
        if (yScales[key]) {
          y = getNormalizedValue(value, yScales[key]);
        }
      }
    }

    if (isNaN(x) || isNaN(y)) {
      return null;
    }

    return this.view.getCoordinate().convert({ x, y });
  }

  /**
   * parse all the points between start and end
   * @param start
   * @param end
   * @return Point[]
   */
  private getRegionPoints(start: Position | Data, end: Position | Data): Point[] {
    const xScale = this.view.getXScale();
    const yScales = this.view.getScalesByDim('y');
    const yScale = Object.values(yScales)[0];
    const xField = xScale.field;
    const viewData = this.view.getData();
    const startXValue = isArray(start) ? start[0] : start[xField];
    const endXValue = isArray(end) ? end[0] : end[xField];
    const arr = [];

    let startIndex;
    each(viewData, (item, idx) => {
      if (item[xField] === startXValue) {
        startIndex = idx;
      }
      if (idx >= startIndex) {
        const point = this.parsePosition([item[xField], item[yScale.field]]);
        if (point) {
          arr.push(point);
        }
      }
      if (item[xField] === endXValue) {
        return false;
      }
    });

    return arr;
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
   * get coordinate bbox
   */
  private getCoordinateBBox() {
    const coordinate = this.view.getCoordinate();
    const { start, end } = coordinate;

    const width = coordinate.getWidth();
    const height = coordinate.getHeight();
    const topLeft = {
      x: Math.min(start.x, end.x),
      y: Math.min(start.y, end.y),
    };

    return {
      x: topLeft.x,
      y: topLeft.y,
      minX: topLeft.x,
      minY: topLeft.y,
      maxX: topLeft.x + width,
      maxY: topLeft.y + height,
      width,
      height,
    };
  }

  /**
   * get annotation component config by different type
   * @param type
   * @param option 用户的配置
   * @param theme
   */
  private getAnnotationCfg(type: string, option: any, theme: object): object | null {
    const coordinate = this.view.getCoordinate();
    const canvas = this.view.getCanvas();
    let o = {};

    if (isNil(option)) {
      return null;
    }
    const { start, end, position } = option;;
    const sp = this.parsePosition(start);
    const ep = this.parsePosition(end);
    const textPoint = this.parsePosition(position);
    if (['arc', 'image', 'line', 'region', 'regionFilter'].includes(type) && (!sp || !ep)) {
      return null;
    } else if (['text', 'dataMarker', 'html'].includes(type) && !textPoint) {
      return null;
    }

    if (type === 'arc') {
      const { start, end, ...rest } = option as ArcOption;
      const startAngle = getAngleByPoint(coordinate, sp);
      let endAngle = getAngleByPoint(coordinate, ep);
      if (startAngle > endAngle) {
        endAngle = Math.PI * 2 + endAngle;
      }

      o = {
        ...rest,
        center: coordinate.getCenter(),
        radius: getDistanceToCenter(coordinate, sp),
        startAngle,
        endAngle,
      };
    } else if (type === 'image') {
      const { start, end, ...rest } = option as ImageOption;
      o = {
        ...rest,
        start: sp,
        end: ep,
        src: option.src,
      };
    } else if (type === 'line') {
      const { start, end, ...rest } = option as LineOption;
      o = {
        ...rest,
        start: sp,
        end: ep,
        text: get(option, 'text', null),
      };
    } else if (type === 'region') {
      const { start, end, ...rest } = option as RegionPositionBaseOption;
      o = {
        ...rest,
        start: sp,
        end: ep,
      };
    } else if (type === 'text') {
      const filteredData = this.view.getData();
      const { position, content, ...rest } = option as TextOption;
      let textContent = content;
      if (isFunction(content)) {
        textContent = content(filteredData);
      }
      o = {
        ...textPoint,
        ...rest,
        content: textContent,
      };
    } else if (type === 'dataMarker') {
      const { position, point, line, text, autoAdjust, direction, ...rest } = option as DataMarkerOption;
      o = {
        ...rest,
        ...textPoint,
        coordinateBBox: this.getCoordinateBBox(),
        point,
        line,
        text,
        autoAdjust,
        direction,
      };
    } else if (type === 'dataRegion') {
      const { start, end, region, text, lineLength, ...rest } = option as DataRegionOption;
      o = {
        ...rest,
        points: this.getRegionPoints(start, end),
        region,
        text,
        lineLength,
      };
    } else if (type === 'regionFilter') {
      const { start, end, apply, color, ...rest } = option as RegionFilterOption;
      const geometries: Geometry[] = this.view.geometries;
      const shapes = [];
      const addShapes = (item?: IElement) => {
        if (!item) {
          return;
        }
        if (item.isGroup()) {
          (item as IGroup).getChildren().forEach((child) => addShapes(child));
        } else {
          shapes.push(item);
        }
      };
      each(geometries, (geom: Geometry) => {
        if (apply) {
          if (contains(apply, geom.type)) {
            each(geom.elements, (elem: Element) => {
              addShapes(elem.shape);
            });
          }
        } else {
          each(geom.elements, (elem: Element) => {
            addShapes(elem.shape);
          });
        }
      });
      o = {
        ...rest,
        color,
        shapes,
        start: sp,
        end: ep,
      };
    } else if (type === 'shape') {
      const { render, ...restOptions } = option as ShapeAnnotationOption;
      const wrappedRender = (container: IGroup) => {
        if (isFunction(option.render)) {
          return render(container, this.view, { parsePosition: this.parsePosition.bind(this) });
        }
      };
      o = {
        ...restOptions,
        render: wrappedRender,
      };
    } else if (type === 'html') {
      const { html, position, ...restOptions } = option as HtmlAnnotationOption;
      const wrappedHtml = (container: HTMLElement) => {
        if (isFunction(html)) {
          return html(container, this.view);
        }
        return html;
      };
      o = {
        ...restOptions,
        ...textPoint,
        // html 组件需要指定 parent
        parent: canvas.get('el').parentNode,
        html: wrappedHtml,
      };
    }
    // 合并主题，用户配置优先级高于默认主题
    const cfg = deepMix({}, theme, {
      ...o,
      top: option.top,
      style: option.style,
      offsetX: option.offsetX,
      offsetY: option.offsetY,
    });
    if (type !== 'html') {
      // html 类型不使用 G container
      cfg.container = this.getComponentContainer(cfg);
    }
    cfg.animate = this.view.getOptions().animate && cfg.animate && get(option, 'animate', cfg.animate); // 如果 view 关闭动画，则不执行
    cfg.animateOption = deepMix({}, DEFAULT_ANIMATE_CFG, cfg.animateOption, option.animateOption);

    return cfg;
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

  /**
   * 创建或者更新 annotation
   * @param option
   */
  private updateOrCreate(option: BaseOption) {
    // 拿到缓存的内容
    let co = this.cache.get(this.getCacheKey(option));

    // 存在则更新，不存在在创建
    if (co) {
      const { type } = option;
      const theme = this.getAnnotationTheme(type);
      const cfg = this.getAnnotationCfg(type, option, theme);

      // 忽略掉一些配置
      if (cfg) {
        omit(cfg, ['container']);
      }
      co.component.update({ ...(cfg || {}), visible: !!cfg });
      // 对于 regionFilter/shape，因为生命周期的原因，需要额外 render
      if (includes(ANNOTATIONS_AFTER_RENDER, option.type)) {
        co.component.render();
      }
    } else {
      // 不存在，创建
      co = this.createAnnotation(option);
      if (co) {
        co.component.init();
        // Note：regionFilter/shape 特殊处理，regionFilter/shape 需要取到 Geometry 中的 Shape，需要在 view render 之后处理
        // 其他组件使用外层的统一 render 逻辑
        if (includes(ANNOTATIONS_AFTER_RENDER, option.type)) {
          co.component.render();
        }
      }
    }
    return co;
  }

  /**
   * 更新缓存，以及销毁组件
   * @param updated 更新或者创建的组件
   */
  private syncCache(updated: Map<BaseOption, ComponentOption>) {
    const newCache = new Map(this.cache); // clone 一份

    // 将 update 更新到 cache
    updated.forEach((co: ComponentOption, key: BaseOption) => {
      newCache.set(key, co);
    });

    // 另外和 options 进行对比，删除
    newCache.forEach((co: ComponentOption, key: BaseOption) => {
      // option 中已经找不到，那么就是删除的
      if (
        !find(this.option, (option: BaseOption) => {
          return key === this.getCacheKey(option);
        })
      ) {
        co.component.destroy();
        newCache.delete(key);
      }
    });

    return newCache;
  }

  /**
   * 获得缓存组件的 key
   * @param option
   */
  private getCacheKey(option: BaseOption) {
    // 如果存在 id，则使用 id string，否则直接使用 option 引用作为 key
    return option;
    // 后续扩展 id 用
    // const id = get(option, 'id');
    // return id ? id : option;
  }
}
