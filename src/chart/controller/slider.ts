import { deepMix, get, isObject, size, clamp, isNil, noop, throttle, isEmpty, valuesOfKey } from '@antv/util';
import { COMPONENT_TYPE, DIRECTION, LAYER, VIEW_LIFE_CIRCLE } from '../../constant';
import { IGroup, Slider as SliderComponent } from '../../dependents';
import { ComponentOption, Datum, Padding } from '../../interface';
import { BBox } from '../../util/bbox';
import { directionToPosition } from '../../util/direction';
import { isBetween } from '../../util/helper';
import { Writeable } from '../../util/types';
import View from '../view';
import { Controller } from './base';
import { SliderOption, SliderCfg } from '../../interface';

/**
 * @ignore
 * slider Controller
 */
export default class Slider extends Controller<SliderOption> {
  private slider: ComponentOption;
  private container: IGroup;

  private width: number;
  private start: number;
  private end: number;

  private onChangeFn: (evt: {}) => void = noop;

  constructor(view: View) {
    super(view);

    this.container = this.view.getLayer(LAYER.FORE).addGroup();
    this.onChangeFn = throttle(this.onValueChange, 20, {
      leading: true,
    }) as (evt: {}) => void;

    this.width = 0;
    this.view.on(VIEW_LIFE_CIRCLE.BEFORE_CHANGE_DATA, this.resetMeasure);
    this.view.on(VIEW_LIFE_CIRCLE.BEFORE_CHANGE_SIZE, this.resetMeasure);
  }

  get name(): string {
    return 'slider';
  }

  public destroy() {
    super.destroy();
    this.view.off(VIEW_LIFE_CIRCLE.BEFORE_CHANGE_DATA, this.resetMeasure);
    this.view.off(VIEW_LIFE_CIRCLE.BEFORE_CHANGE_SIZE, this.resetMeasure);
  }

  /**
   * 初始化
   */
  public init() {}

  /**
   * 渲染
   */
  public render() {
    this.option = this.view.getOptions().slider;
    const { start, end } = this.getSliderCfg();
    if (isNil(this.start)) {
      this.start = start;
      this.end = end;
    }

    const { data: viewData } = this.view.getOptions();
    if (this.option && !isEmpty(viewData)) {
      if (this.slider) {
        // exist, update
        this.slider = this.updateSlider();
      } else {
        // not exist, create
        this.slider = this.createSlider();
        // 监听事件，绑定交互
        this.slider.component.on('sliderchange', this.onChangeFn);
      }
    } else {
      if (this.slider) {
        // exist, destroy
        this.slider.component.destroy();
        this.slider = undefined;
      } else {
        // do nothing
      }
    }
  }

  /**
   * 布局
   */
  public layout() {
    if (this.option && !this.width) {
      this.measureSlider();
      setTimeout(() => {
        // 初始状态下的 view 数据过滤
        if (!this.view.destroyed) {
          this.changeViewData(this.start, this.end);
        }
      }, 0);
    }
    if (this.slider) {
      const width = this.view.coordinateBBox.width;
      // 获取组件的 layout bbox
      const padding: Padding = this.slider.component.get('padding') as Padding;
      const [paddingTop, paddingRight, paddingBottom, paddingLeft] = padding;
      const bboxObject = this.slider.component.getLayoutBBox();
      const bbox = new BBox(bboxObject.x, bboxObject.y, Math.min(bboxObject.width, width), bboxObject.height).expand(
        padding
      );
      const { minText, maxText } = this.getMinMaxText(this.start, this.end);

      const [x1, y1] = directionToPosition(this.view.viewBBox, bbox, DIRECTION.BOTTOM);
      const [x2, y2] = directionToPosition(this.view.coordinateBBox, bbox, DIRECTION.BOTTOM);

      // 默认放在 bottom
      this.slider.component.update({
        ...this.getSliderCfg(),
        x: x2 + paddingLeft,
        y: y1 + paddingTop,
        width: this.width,
        start: this.start,
        end: this.end,
        minText,
        maxText,
      });

      this.view.viewBBox = this.view.viewBBox.cut(bbox, DIRECTION.BOTTOM);
    }
  }

  /**
   * 更新
   */
  public update() {
    // 逻辑和 render 保持一致
    this.render();
  }

  /**
   * 创建 slider 组件
   */
  private createSlider(): ComponentOption {
    const cfg: any = this.getSliderCfg();
    // 添加 slider 组件
    const component = new SliderComponent({
      container: this.container,
      ...cfg,
    });

    component.init();

    return {
      component,
      layer: LAYER.FORE,
      direction: DIRECTION.BOTTOM,
      type: COMPONENT_TYPE.SLIDER,
    };
  }

  /**
   * 更新配置
   */
  private updateSlider() {
    let cfg = this.getSliderCfg();
    if (this.width) {
      const { minText, maxText } = this.getMinMaxText(this.start, this.end);
      cfg = { ...cfg, width: this.width, start: this.start, end: this.end, minText, maxText };
    }

    this.slider.component.update(cfg);

    return this.slider;
  }

  /**
   * 进行测量操作
   */
  private measureSlider() {
    const { width } = this.getSliderCfg();

    this.width = width;
  }

  /**
   * 清除测量
   */
  private resetMeasure = () => {
    this.clear();
  };

  /**
   * 生成 slider 配置
   */
  private getSliderCfg() {
    let cfg: Writeable<SliderCfg> & { x: number; y: number; width: number; minText: string; maxText: string } = {
      height: 16,
      start: 0,
      end: 1,
      minText: '',
      maxText: '',
      x: 0,
      y: 0,
      width: this.view.coordinateBBox.width,
    };
    if (isObject(this.option)) {
      // 用户配置的数据，优先级更高
      const trendCfg = {
        data: this.getData(),
        ...get(this.option, 'trendCfg', {}),
      };

      // 因为有样式，所以深层覆盖
      cfg = deepMix({}, cfg, this.getThemeOptions(), this.option);

      // trendCfg 因为有数据数组，所以使用浅替换
      cfg = { ...cfg, trendCfg };
    }

    cfg.start = clamp(Math.min(isNil(cfg.start) ? 0 : cfg.start, isNil(cfg.end) ? 1 : cfg.end), 0, 1);
    cfg.end = clamp(Math.max(isNil(cfg.start) ? 0 : cfg.start, isNil(cfg.end) ? 1 : cfg.end), 0, 1);

    return cfg;
  }

  /**
   * 从 view 中获取数据，缩略轴使用全量的数据
   */
  private getData(): number[] {
    const data = this.view.getOptions().data;
    const [yScale] = this.view.getYScales();
    const groupScales = this.view.getGroupScales();
    if (groupScales.length) {
      const { field, ticks } = groupScales[0];
      return data.reduce((pre, cur) => {
        if (cur[field] === ticks[0]) {
          pre.push(cur[yScale.field] as number);
        }
        return pre;
      }, []) as number[];
    }

    return data.map((datum) => datum[yScale.field] || 0);
  }

  /**
   * 获取 slider 的主题配置
   */
  private getThemeOptions() {
    const theme = this.view.getTheme();
    return get(theme, ['components', 'slider', 'common'], {});
  }

  /**
   * 滑块滑动的时候出发
   * @param v
   */
  private onValueChange = (v: any) => {
    const [min, max] = v;

    this.start = min;
    this.end = max;

    this.changeViewData(min, max);
  };

  /**
   * 根据 start/end 和当前数据计算出当前的 minText/maxText
   * @param min
   * @param max
   */
  private getMinMaxText(min: number, max: number) {
    const data = this.view.getOptions().data;
    const xScale = this.view.getXScale();
    const isHorizontal = true;
    const values = valuesOfKey(data, xScale.field);
    const xValues = isHorizontal ? values : values.reverse();
    const dataSize = size(data);

    if (!xScale || !dataSize) {
      return {}; // fix: 需要兼容，否则调用方直接取值会报错
    }

    const xTickCount = size(xValues);

    const minIndex = Math.floor(min * (xTickCount - 1));
    const maxIndex = Math.floor(max * (xTickCount - 1));

    let minText = get(xValues, [minIndex]);
    let maxText = get(xValues, [maxIndex]);

    const formatter = this.getSliderCfg().formatter as SliderCfg['formatter'];
    if (formatter) {
      minText = formatter(minText, data[minIndex], minIndex);
      maxText = formatter(maxText, data[maxIndex], maxIndex);
    }

    return {
      minText,
      maxText,
    };
  }

  /**
   * 更新 view 过滤数据
   * @param min
   * @param max
   */
  private changeViewData(min: number, max: number) {
    const data = this.view.getOptions().data;
    const xScale = this.view.getXScale();
    const dataSize = size(data);
    if (!xScale || !dataSize) {
      return;
    }
    const isHorizontal = true;
    const values = valuesOfKey(data, xScale.field);
    const xValues = isHorizontal ? values : values.reverse();
    const xTickCount = size(xValues);

    const minIndex = Math.floor(min * (xTickCount - 1));
    const maxIndex = Math.floor(max * (xTickCount - 1));

    // 增加 x 轴的过滤器
    this.view.filter(xScale.field, (value: any, datum: Datum) => {
      const idx: number = xValues.indexOf(value);
      return idx > -1 ? isBetween(idx, minIndex, maxIndex) : true;
    });
    this.view.render(true);
  }

  /**
   * 覆写父类方法
   */
  public getComponents() {
    return this.slider ? [this.slider] : [];
  }

  /**
   * 覆盖父类
   */
  public clear() {
    if (this.slider) {
      this.slider.component.destroy();
      this.slider = undefined;
    }
    this.width = 0;
    this.start = undefined;
    this.end = undefined;
  }
}
