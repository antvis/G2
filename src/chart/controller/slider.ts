import { deepMix, get, isObject, size } from '@antv/util';
import { COMPONENT_TYPE, DIRECTION, LAYER } from '../../constant';
import { IGroup, Slider as SliderComponent, TrendCfg } from '../../dependents';
import { ComponentOption, Datum } from '../../interface';
import { BBox } from '../../util/bbox';
import { directionToPosition } from '../../util/direction';
import { isBetween, omit } from '../../util/helper';
import View from '../view';
import { Controller } from './base';

export type SliderFormatterType = (val: any, datum: Datum, idx: number) => any;
/** Slider 配置 */
export interface SliderOption {
  /** slider 高度 */
  readonly height?: number;

  /** 滑块背景区域配置 */
  readonly trendCfg?: TrendCfg;
  /** 滑块背景样式 */
  readonly backgroundStyle?: any;
  /** 滑块前景样式 */
  readonly foregroundStyle?: any;
  /** 滑块两个操作块样式 */
  readonly handlerStyle?: any;
  /** 文本样式 */
  readonly textStyle?: any;
  /** 允许滑动位置的最小值 */
  readonly minLimit?: number;
  /** 允许滑动位置的最大值 */
  readonly maxLimit?: number;
  /** 滑块初始化的起始位置 */
  readonly start?: number;
  /** 滑块初始化的结束位置 */
  readonly end?: number;
  /** 滑块文本格式化函数 */
  formatter?: SliderFormatterType;
}

type Option = SliderOption | boolean;

/**
 * @ignore
 * slider Controller
 */
export default class Slider extends Controller<Option> {
  private slider: ComponentOption;
  private container: IGroup;

  constructor(view: View) {
    super(view);

    this.container = this.view.getLayer(LAYER.FORE).addGroup();
  }

  get name(): string {
    return 'slider';
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

    if (this.option) {
      if (this.slider) {
        // exist, update
        this.slider = this.updateSlider();
      } else {
        // not exist, create
        this.slider = this.createSlider();
        // 监听事件，绑定交互
        this.slider.component.on('sliderchange', this.onValueChanged);
      }
      // changeData 的时候同样需要更新
      // 设置初始的 text
      const min = this.slider.component.get('start') || 0;
      const max = this.slider.component.get('end') || 1;

      this.updateMinMaxText(min, max);
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
    if (this.slider) {
      const width = this.view.coordinateBBox.width;
      // 获取组件的 layout bbox
      const bboxObject = this.slider.component.getLayoutBBox();
      const bbox = new BBox(bboxObject.x, bboxObject.y, Math.min(bboxObject.width, width), bboxObject.height);

      const [x1, y1] = directionToPosition(this.view.viewBBox, bbox, DIRECTION.BOTTOM);
      const [x2, y2] = directionToPosition(this.view.coordinateBBox, bbox, DIRECTION.BOTTOM);

      // 默认放在 bottom
      this.slider.component.update({
        x: x2,
        y: y1,
        width,
      });
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
    const cfg = this.getSliderCfg();
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
      type: COMPONENT_TYPE.OTHER,
    };
  }

  /**
   * 更新配置
   */
  private updateSlider() {
    const cfg = this.getSliderCfg();
    omit(cfg, ['x', 'y', 'width', 'start', 'end', 'minText', 'maxText']);

    this.slider.component.update(cfg);

    return this.slider;
  }

  /**
   * 生成 slider 配置
   */
  private getSliderCfg() {
    if (isObject(this.option)) {
      // 用户配置的数据，优先级更高
      const trendCfg = {
        data: this.getData(),
        ...get(this.option, 'trendCfg', {}),
      };

      // 初始的位置大小信息
      const x = 0;
      const y = 0;
      const width = this.view.coordinateBBox.width;

      // 因为有样式，所以深层覆盖
      const cfg = deepMix({}, { x, y, width }, this.option);

      // trendCfg 因为有数据数组，所以使用浅替换
      return { ...cfg, trendCfg };
    }

    return {};
  }

  /**
   * 从 view 中获取数据，缩略轴使用全量的数据
   */
  private getData(): number[] {
    const data = this.view.getOptions().data;
    const [yScale] = this.view.getYScales();

    return data.map((datum) => datum[yScale.field] || 0);
  }

  /**
   * 滑块滑动的时候出发
   * @param v
   */
  private onValueChanged = (v: any) => {
    const [min, max] = v;

    this.updateMinMaxText(min, max);

    this.view.render(true);
  };

  private updateMinMaxText(min: number, max: number) {
    const data = this.view.getOptions().data;
    const dataSize = size(data);
    const xScale = this.view.getXScale();

    if (!xScale || !dataSize) {
      return;
    }

    const x = xScale.field;

    // x 轴数据
    const xData = data.map((datum) => datum[x] || '');

    const minIndex = Math.floor(min * (dataSize - 1));
    const maxIndex = Math.floor(max * (dataSize - 1));

    let minText = get(xData, [minIndex]);
    let maxText = get(xData, [maxIndex]);

    const formatter = this.getSliderCfg().formatter as SliderFormatterType;
    if (formatter) {
      minText = formatter(minText, data[minIndex], minIndex);
      maxText = formatter(maxText, data[maxIndex], maxIndex);
    }

    // 更新文本
    this.slider.component.update({
      minText,
      maxText,
      start: min,
      end: max,
    });

    // 增加 x 轴的过滤器
    this.view.filter(xScale.field, (value: any, datum: Datum, idx: number) => isBetween(idx, minIndex, maxIndex));
  }

  /**
   * 覆写父类方法
   */
  public getComponents() {
    return this.slider ? [this.slider] : [];
  }
}
