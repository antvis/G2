import { contains, deepMix, each, get, isArray, isFunction, isNil, isString, keys, upperFirst } from '@antv/util';

import { Annotation as AnnotationComponent, IElement, IGroup, Scale } from '../../dependents';
import {
  AnnotationBaseOption as BaseOption,
  AnnotationPosition as Position,
  ArcOption,
  ComponentOption,
  Data,
  DataMarkerOption,
  DataRegionOption,
  ImageOption,
  LineOption,
  Point,
  RegionFilterOption,
  RegionOption,
  RegionPositionBaseOption,
  TextOption,
} from '../../interface';

import { DEFAULT_ANIMATE_CFG } from '../../animate/';
import { COMPONENT_TYPE, DIRECTION, LAYER, VIEW_LIFE_CIRCLE } from '../../constant';

import Geometry from '../../geometry/base';
import Element from '../../geometry/element';
import { getAngleByPoint, getDistanceToCenter } from '../../util/coordinate';
import { omit } from '../../util/helper';
import View from '../view';
import { Controller } from './base';

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

  public init() {}

  public layout() {
    const components = this.getComponents();
    const updateComponentFn = (co: ComponentOption) => {
      const { component, extra } = co;
      const { type } = extra;
      const theme = this.getAnnotationTheme(type);

      component.update(this.getAnnotationCfg(type, extra, theme));
    };
    const createComponentFn = (option: BaseOption) => {
      const co = this.createAnnotation(option);
      if (co) {
        co.component.init();
        // Note：regionFilter 特殊处理，regionFilter需要取到 Geometry 中的 Shape，需要在 view render 之后处理
        // 其他组件使用外层的统一 render 逻辑
        if (option.type === 'regionFilter') {
          co.component.render();
        }
        // 缓存起来
        this.cache.set(option, co);
      }
    };

    if (components.length) {
      each(components, (co: ComponentOption) => {
        const { component } = co;

        if (component.get('type') === 'regionFilter') {
          // regionFilter 依赖绘制后的 Geometry Shapes
          this.view.getRootView().once(VIEW_LIFE_CIRCLE.AFTER_RENDER, () => {
            updateComponentFn(co);
          });
        } else {
          updateComponentFn(co);
        }
      });
    } else {
      each(this.option, (option: BaseOption) => {
        if (option.type === 'regionFilter') {
          this.view.getRootView().once(VIEW_LIFE_CIRCLE.AFTER_RENDER, () => {
            // regionFilter 依赖绘制后的 Geometry Shapes
            createComponentFn(option);
          });
        } else {
          createComponentFn(option);
        }
      });
    }
  }

  public render() {
    // 因为 Annotation 不参与布局，但是渲染的位置依赖于坐标系，所以可以将绘制阶段延迟到 layout() 进行
  }

  /**
   * 更新
   */
  public update() {
    // 已经处理过的 legend
    const updated = new WeakMap<BaseOption, true>();

    const updateComponentFn = (option: BaseOption) => {
      const { type } = option;
      const theme = this.getAnnotationTheme(type);
      const cfg = this.getAnnotationCfg(type, option, theme);

      const existCo = this.cache.get(option);

      // 存在，则更新
      if (existCo) {
        // 忽略掉一些配置
        omit(cfg, ['container']);

        existCo.component.update(cfg);
        updated.set(option, true);
      } else {
        // 不存在，则创建
        const co = this.createAnnotation(option);
        if (co) {
          co.component.init();
          // Note：regionFilter 特殊处理，regionFilter需要取到 Geometry 中的 Shape，需要在 view render 之后处理
          // 其他组件使用外层的统一 render 逻辑
          if (option.type === 'regionFilter') {
            co.component.render();
          }
          // 缓存起来
          this.cache.set(option, co);
          updated.set(option, true);
        }
      }
    };

    this.view.once(VIEW_LIFE_CIRCLE.AFTER_RENDER, () => {
      // 先看是否有 regionFilter 要更新
      each(this.option, (option: BaseOption) => {
        if (option.type === 'regionFilter') {
          updateComponentFn(option);
        }
      });

      // 处理完成之后，销毁删除的
      // 不在处理中的
      const newCache = new Map<BaseOption, ComponentOption>();

      this.cache.forEach((value: ComponentOption, key: BaseOption) => {
        if (updated.has(key)) {
          newCache.set(key, value);
        } else {
          // 不存在，则是所有需要被销毁的组件
          value.component.destroy();
        }
      });

      // 更新缓存
      this.cache = newCache;
    });

    each(this.option, (option: BaseOption) => {
      if (option.type !== 'regionFilter') {
        updateComponentFn(option);
      }
    });
  }

  /**
   * 清空
   * @param includeOption 是否清空 option 配置项
   */
  public clear(includeOption = false) {
    super.clear();

    this.cache.clear();
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

  private createAnnotation(option: BaseOption) {
    const { type } = option;

    const Ctor = AnnotationComponent[upperFirst(type)];
    if (Ctor) {
      const theme = this.getAnnotationTheme(type);
      const cfg = this.getAnnotationCfg(type, option, theme);
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
  private getAnnotationCfg(type: string, option: any, theme: object): object {
    const coordinate = this.view.getCoordinate();
    let o = {};

    if (isNil(option)) {
      return null;
    }

    if (type === 'arc') {
      const { start, end } = option as ArcOption;
      const sp = this.parsePosition(start);
      const ep = this.parsePosition(end);
      const startAngle = getAngleByPoint(coordinate, sp);
      let endAngle = getAngleByPoint(coordinate, ep);
      if (startAngle > endAngle) {
        endAngle = Math.PI * 2 + endAngle;
      }

      o = {
        center: coordinate.getCenter(),
        radius: getDistanceToCenter(coordinate, sp),
        startAngle,
        endAngle,
      };
    } else if (type === 'image') {
      const { start, end } = option as ImageOption;
      o = {
        start: this.parsePosition(start),
        end: this.parsePosition(end),
        src: option.src,
      };
    } else if (type === 'line') {
      const { start, end } = option as LineOption;
      o = {
        start: this.parsePosition(start),
        end: this.parsePosition(end),
        text: get(option, 'text', null),
      };
    } else if (type === 'region') {
      const { start, end } = option as RegionPositionBaseOption;
      o = {
        start: this.parsePosition(start),
        end: this.parsePosition(end),
      };
    } else if (type === 'text') {
      const { position, rotate } = option as TextOption;
      o = {
        ...this.parsePosition(position),
        content: option.content,
        rotate,
      };
    } else if (type === 'dataMarker') {
      const { position, point, line, text, autoAdjust, direction } = option as DataMarkerOption;
      o = {
        ...this.parsePosition(position),
        coordinateBBox: this.getCoordinateBBox(),
        point,
        line,
        text,
        autoAdjust,
        direction,
      };
    } else if (type === 'dataRegion') {
      const { start, end, region, text, lineLength } = option as DataRegionOption;
      o = {
        points: this.getRegionPoints(start, end),
        region,
        text,
        lineLength,
      };
    } else if (type === 'regionFilter') {
      const { start, end, apply, color } = option as RegionFilterOption;
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
        color,
        shapes,
        start: this.parsePosition(start),
        end: this.parsePosition(end),
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
    cfg.container = this.getComponentContainer(cfg);
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
}
