import { Controller } from './base';
import { IGroup, Scrollbar as ScrollbarComponent, Scale } from '../../dependents';
import { ScrollbarOption, ComponentOption, ScrollbarCfg, Data, ScaleOption, Padding } from '../../interface';
import View from '../view';
import { BBox } from '../../util/bbox';
import { directionToPosition } from '../../util/direction';
import { COMPONENT_TYPE, DIRECTION, LAYER, VIEW_LIFE_CIRCLE } from '../../constant';
import { isObject, clamp, size, throttle, noop, get, valuesOfKey, deepMix } from '@antv/util';
import { isBetween } from '../../util/helper';

const DEFAULT_PADDING: number = 0;
const DEFAULT_SIZE: number = 8;
const DEFAULT_CATEGORY_SIZE: number = 32;
const MIN_THUMB_LENGTH: number = 20;

export default class Scrollbar extends Controller<ScrollbarOption> {
  private scrollbar: ComponentOption;
  private container: IGroup;

  private trackLen: number;
  private thumbLen: number;
  private cnt: number;
  private step: number;
  private ratio: number;
  private data: Data;
  private xScaleCfg: {
    field: string;
    values: string[];
  };
  private yScalesCfg: Scale[];

  private onChangeFn: (evt: {}) => void = noop;

  constructor(view: View) {
    super(view);
    this.container = this.view.getLayer(LAYER.FORE).addGroup();
    this.onChangeFn = throttle(this.onValueChange, 20, {
      leading: true,
    }) as (evt: {}) => void;
    this.trackLen = 0;
    this.thumbLen = 0;
    this.ratio = 0;

    this.view.on(VIEW_LIFE_CIRCLE.BEFORE_CHANGE_DATA, this.resetMeasure);
    this.view.on(VIEW_LIFE_CIRCLE.BEFORE_CHANGE_SIZE, this.resetMeasure);
  }

  get name(): string {
    return 'scrollbar';
  }

  public destroy() {
    super.destroy();
    this.view.off(VIEW_LIFE_CIRCLE.BEFORE_CHANGE_DATA, this.resetMeasure);
    this.view.off(VIEW_LIFE_CIRCLE.BEFORE_CHANGE_SIZE, this.resetMeasure);
  }

  public init() { }

  /**
   * 渲染
   */
  public render() {
    this.option = this.view.getOptions().scrollbar;

    if (this.option) {
      if (this.scrollbar) {
        // exist, update
        this.scrollbar = this.updateScrollbar();
      } else {
        // not exist, create
        this.scrollbar = this.createScrollbar();
        this.scrollbar.component.on('scrollchange', this.onChangeFn);
      }
    } else {
      if (this.scrollbar) {
        // exist, destroy
        this.scrollbar.component.destroy();
        this.scrollbar = undefined;
      }
    }
  }

  /**
   * 布局
   */
  public layout() {
    if (this.option && !this.trackLen) {
      this.measureScrollbar();
      setTimeout(() => {
        if (!this.view.destroyed) {
          this.changeViewData(this.getScrollRange(), true);
        }
      });
    }
    if (this.scrollbar) {
      const width = this.view.coordinateBBox.width;
      const padding: Padding = this.scrollbar.component.get('padding') as Padding;
      const bboxObject = this.scrollbar.component.getLayoutBBox();
      const bbox = new BBox(bboxObject.x, bboxObject.y, Math.min(bboxObject.width, width), bboxObject.height).expand(
        padding
      );
      const cfg = this.getScrollbarComponentCfg();

      let x: number;
      let y: number;

      if (cfg.isHorizontal) {
        const [x1, y1] = directionToPosition(this.view.viewBBox, bbox, DIRECTION.BOTTOM);
        const [x2, y2] = directionToPosition(this.view.coordinateBBox, bbox, DIRECTION.BOTTOM);
        x = x2;
        y = y1;
      } else {
        const [x1, y1] = directionToPosition(this.view.viewBBox, bbox, DIRECTION.RIGHT);
        const [x2, y2] = directionToPosition(this.view.viewBBox, bbox, DIRECTION.RIGHT);
        x = x2;
        y = y1;
      }

      x += padding[3];
      y += padding[0];

      // 默认放在 bottom
      if (this.trackLen) {
        this.scrollbar.component.update({
          ...cfg,
          x,
          y,
          trackLen: this.trackLen,
          thumbLen: this.thumbLen,
          thumbOffset: (this.trackLen - this.thumbLen) * this.ratio,
        });
      } else {
        this.scrollbar.component.update({
          ...cfg,
          x,
          y,
        });
      }

      this.view.viewBBox = this.view.viewBBox.cut(bbox, cfg.isHorizontal ? DIRECTION.BOTTOM : DIRECTION.RIGHT);
    }
  }

  /**
   * 更新
   */
  public update() {
    // 逻辑和 render 保持一致
    this.render();
  }

  public getComponents() {
    return this.scrollbar ? [this.scrollbar] : [];
  }

  public clear() {
    if (this.scrollbar) {
      this.scrollbar.component.destroy();
      this.scrollbar = undefined;
    }
    this.trackLen = 0;
    this.thumbLen = 0;
    this.ratio = 0;
    this.cnt = 0;
    this.step = 0;
    this.data = undefined;
    this.xScaleCfg = undefined;
    this.yScalesCfg = [];
  }

  /** 设置滚动条位置  */
  public setValue(ratio: number) {
    this.onValueChange({ ratio });
  }

  /** 获得滚动条位置  */
  public getValue() {
    return this.ratio;
  }

  /**
   * 获取 scrollbar 的主题配置
   */
  private getThemeOptions() {
    const theme = this.view.getTheme();
    return get(theme, ['components', 'scrollbar', 'common'], {});
  }

  /**
   * 获取 scrollbar 组件的主题样式
   */
  private getScrollbarTheme(style?: ScrollbarCfg['style']) {
    const theme = get(this.view.getTheme(), ['components', 'scrollbar']);
    const { thumbHighlightColor, ...restStyles } = style || {};
    return {
      default: deepMix({}, get(theme, ['default', 'style'], {}), restStyles),
      hover: deepMix({}, get(theme, ['hover', 'style'], {}), { thumbColor: thumbHighlightColor }),
    };
  }

  private resetMeasure = () => {
    this.clear();
  };

  private onValueChange = ({ ratio }: { ratio: number }) => {
    const { animate } = this.getValidScrollbarCfg();
    this.ratio = clamp(ratio, 0, 1);
    const originalAnimate = this.view.getOptions().animate;
    if (!animate) {
      this.view.animate(false);
    }
    this.changeViewData(this.getScrollRange(), true);
    this.view.animate(originalAnimate);
  };

  private measureScrollbar(): void {
    const xScale = this.view.getXScale();
    const yScales = this.view.getYScales().slice();
    this.data = this.getScrollbarData();
    this.step = this.getStep();
    this.cnt = this.getCnt();
    const { trackLen, thumbLen } = this.getScrollbarComponentCfg();
    this.trackLen = trackLen;
    this.thumbLen = thumbLen;
    this.xScaleCfg = {
      field: xScale.field,
      values: xScale.values || [],
    };
    this.yScalesCfg = yScales;
  }

  private getScrollRange(): [number, number] {
    const startIdx: number = Math.floor((this.cnt - this.step) * clamp(this.ratio, 0, 1));
    const endIdx: number = Math.min(startIdx + this.step - 1, this.cnt - 1);
    return [startIdx, endIdx];
  }

  private changeViewData([startIdx, endIdx]: [number, number], render?: boolean): void {
    const { type } = this.getValidScrollbarCfg();
    const isHorizontal = type !== 'vertical';
    const values = valuesOfKey(this.data, this.xScaleCfg.field);

    // 如果是 xScale 数值类型，则进行排序
    const xScaleValues = this.view.getXScale().isLinear ? values.sort((a, b) => Number(a) - Number(b)) : values;

    const xValues = isHorizontal ? xScaleValues : xScaleValues.reverse();
    this.yScalesCfg.forEach((cfg) => {
      this.view.scale(cfg.field, {
        formatter: cfg.formatter,
        type: cfg.type as ScaleOption['type'],
        min: cfg.min,
        max: cfg.max,
        tickMethod: cfg.tickMethod
      });
    });
    this.view.filter(this.xScaleCfg.field, (val) => {
      const idx = xValues.indexOf(val);
      return idx > -1 ? isBetween(idx, startIdx, endIdx) : true;
    });
    this.view.render(true);
  }

  private createScrollbar(): ComponentOption {
    const { type } = this.getValidScrollbarCfg();
    const isHorizontal = type !== 'vertical';
    const component = new ScrollbarComponent({
      container: this.container,
      ...this.getScrollbarComponentCfg(),
      x: 0,
      y: 0,
    });

    component.init();

    return {
      component,
      layer: LAYER.FORE,
      direction: isHorizontal ? DIRECTION.BOTTOM : DIRECTION.RIGHT,
      type: COMPONENT_TYPE.SCROLLBAR,
    };
  }

  private updateScrollbar(): ComponentOption {
    const config = this.getScrollbarComponentCfg();
    const realConfig = this.trackLen
      ? {
        ...config,
        trackLen: this.trackLen,
        thumbLen: this.thumbLen,
        thumbOffset: (this.trackLen - this.thumbLen) * this.ratio,
      }
      : { ...config };
    this.scrollbar.component.update(realConfig);

    return this.scrollbar;
  }

  private getStep() {
    if (this.step) {
      return this.step;
    }
    const { coordinateBBox } = this.view;
    const { type, categorySize } = this.getValidScrollbarCfg();
    const isHorizontal = type !== 'vertical';

    return Math.floor((isHorizontal ? coordinateBBox.width : coordinateBBox.height) / categorySize);
  }

  private getCnt() {
    if (this.cnt) {
      return this.cnt;
    }
    const xScale = this.view.getXScale();
    const data = this.getScrollbarData();
    const values = valuesOfKey(data, xScale.field);
    return size(values);
  }

  private getScrollbarComponentCfg() {
    const { coordinateBBox, viewBBox } = this.view;
    const { type, padding, width, height, style } = this.getValidScrollbarCfg();
    const isHorizontal = type !== 'vertical';
    const [paddingTop, paddingRight, paddingBottom, paddingLeft] = padding;
    const position = isHorizontal
      ? {
        x: coordinateBBox.minX + paddingLeft,
        y: viewBBox.maxY - height - paddingBottom,
      }
      : {
        x: viewBBox.maxX - width - paddingRight,
        y: coordinateBBox.minY + paddingTop,
      };
    const step = this.getStep();
    const cnt = this.getCnt();
    const trackLen = isHorizontal
      ? coordinateBBox.width - paddingLeft - paddingRight
      : coordinateBBox.height - paddingTop - paddingBottom;
    const thumbLen = Math.max(trackLen * clamp(step / cnt, 0, 1), MIN_THUMB_LENGTH);

    return {
      ...this.getThemeOptions(),
      x: position.x,
      y: position.y,
      size: isHorizontal ? height : width,
      isHorizontal,
      trackLen,
      thumbLen,
      thumbOffset: 0,
      theme: this.getScrollbarTheme(style),
    };
  }

  /**
   * 填充一些默认的配置项目
   */
  private getValidScrollbarCfg(): Required<ScrollbarCfg> {
    let cfg: Required<ScrollbarCfg> = {
      type: 'horizontal',
      categorySize: DEFAULT_CATEGORY_SIZE,
      width: DEFAULT_SIZE,
      height: DEFAULT_SIZE,
      padding: [0, 0, 0, 0],
      animate: true,
      style: {},
    };
    if (isObject(this.option)) {
      cfg = { ...cfg, ...this.option };
    }
    if (!isObject(this.option) || !this.option.padding) {
      cfg.padding =
        cfg.type === 'horizontal' ? [DEFAULT_PADDING, 0, DEFAULT_PADDING, 0] : [0, DEFAULT_PADDING, 0, DEFAULT_PADDING];
    }

    return cfg;
  }

  /**
   * 获取数据
   */
  private getScrollbarData(): Data {
    const coordinate = this.view.getCoordinate();
    const cfg = this.getValidScrollbarCfg();
    let data = this.view.getOptions().data || [];
    // 纵向做了 y 轴镜像之后，数据也需要镜像反转
    if (coordinate.isReflect('y') && cfg.type === 'vertical') {
      data = [...data].reverse();
    }

    return data;
  }
}
