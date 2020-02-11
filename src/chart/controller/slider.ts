import { deepMix, get, head, isObject, last, map } from '@antv/util';
import { COMPONENT_TYPE, DIRECTION, LAYER } from '../../constant';
import { IGroup, Slider, TrendCfg } from '../../dependents';
import { Datum } from '../../interface';
import { BBox } from '../../util/bbox';
import { directionToPosition } from '../../util/direction';
import { isBetween } from '../../util/helper';
import { ComponentOption } from '../interface';
import View from '../view';
import { Controller } from './base';

export interface SliderOption {
  readonly height?: number;

  // style
  readonly trendCfg?: TrendCfg;
  readonly backgroundStyle?: any;
  readonly foregroundStyle?: any;
  readonly handlerStyle?: any;
  readonly textStyle?: any;
  // 允许滑动位置
  readonly minLimit?: number;
  readonly maxLimit?: number;
  // 初始位置
  readonly start?: number;
  readonly end?: number;
  // 滑块文本
  readonly minText?: string;
  readonly maxText?: string;
}

type Option = SliderOption | boolean;

/**
 * slider Controller
 */
export default class extends Controller<Option> {
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
  public init() {
  }

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
    if (this.slider) {
      // 获取组件的 layout bbox
      const bboxObject = this.slider.component.getLayoutBBox();
      const bbox = new BBox(bboxObject.x, bboxObject.y, bboxObject.width, bboxObject.height);

      const [x, y] = directionToPosition(this.view.coordinateBBox, bbox, DIRECTION.BOTTOM);
      const width = this.view.coordinateBBox.width;

      // todo component 暂时有 bug，无法更新
      // this.slider.component.update({
      //   x,
      //   y,
      //   width,
      // });
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
    const component = new Slider({
      container: this.container,
      ...cfg,
    });

    component.init();

    // 监听事件，绑定交互
    component.on('valuechanged', this.onValueChanged);

    // const { start = 0, end = 1 } = cfg;
    // todo 默认触发一次
    // this.changeMinMaxText(start, end);

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
    this.slider.component.update(this.getSliderCfg());

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
   * 从 view 中获取数据
   */
  private getData(): number[] {
    // @ts-ignore
    const data = this.view.filteredData;
    const [yScale] = this.view.getYScales();

    return map(data, (datum) => datum[yScale.field] || 0);
  }

  /**
   * 滑块滑动的时候出发
   * @param v
   */
  private onValueChanged = (v: any) => {
    const { value } = v;
    const [min, max] = value;

    this.changeMinMaxText(min, max);
  };

  private changeMinMaxText(min: number, max: number) {
    // @ts-ignore
    const data = this.view.filteredData;
    const xScale = this.view.getXScale();

    if (!xScale) {
      return;
    }

    const x = xScale.field;

    // x 轴数据
    const xData = map(data, (datum) => datum[x] || '');

    const size = xData.length;

    const minIndex = Math.floor(min * size);
    const maxIndex = Math.floor(max * size);

    const minText = get(xData, [minIndex], head(xData));
    const maxText = get(xData, [maxIndex], last(xData));

    // 更新文本
    this.slider.component.update({
      minText,
      maxText,
    });

    // 增加 x 轴的过滤器
    this.view.filter(x, (value: any, datum: Datum, idx: number) => isBetween(idx / size, min, max));

    this.view.render();
  }

  /**
   * 覆写父类方法
   */
  public getComponents() {
    return this.slider ? [this.slider] : [];
  }
}
