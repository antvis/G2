import * as _ from '@antv/util';
import { Group, Shape, Event } from '@antv/g';
import Legend from '../base';
import { ContinuousLegendCfg } from '../../interface';
import Slider, { SliderCfg } from './components/slider';
import {
  SliderTextStyle,
  SliderMiddleBackgroundStyle,
  SliderMiddleFrontendStyle,
  DefaultTitleStyle,
} from './constant';
import { SliderChangeEvent, CreateBgType } from './interface';

export default abstract class Continuous extends Legend {
  constructor(cfg: ContinuousLegendCfg) {
    const { backgroundStyle, fillStyle, textStyle, titleStyle, ...otherCfg } = cfg;
    const { layout = 'horizontal' } = cfg;

    // 放入主题中
    const defaultSize = {
      width: layout === 'horizontal' ? 156 : 16,
      height: layout === 'horizontal' ? 16 : 156,
    };

    super({
      /* title 间距 */
      titleDistance: 16,
      /* 布局默认水平 */
      layout: 'horizontal',
      /* 默认可交互 */
      operational: true,
      /* 滑块的样式： rect | circle */
      handleIcon: 'rect',
      /* 背景的样式 */
      backgroundStyle: { ...SliderMiddleBackgroundStyle, ...backgroundStyle },
      /* slider 滑块前景色 */
      fillStyle: { ...SliderMiddleFrontendStyle, ...fillStyle },
      /* 文本样式 */
      textStyle: { ...SliderTextStyle, ...textStyle },
      /* 标题样式 */
      titleStyle: { ...DefaultTitleStyle, ...titleStyle },
      /* 宽度 */
      width: 156,
      /* 高度 */
      height: 16,
      ...defaultSize,
      ...otherCfg,
    });
  }

  init() {
    const container = this.get('container');
    this.set('canvas', container.get('canvas'));

    const legendGroup = container.addGroup();
    this.set('legendGroup', legendGroup);

    const itemsGroup = legendGroup.addGroup();
    this.set('itemsGroup', itemsGroup);

    // 平移
    legendGroup.translate(this.get('offsetX'), this.get('offsetY'));
  }

  /**
   * 连续型 title，其实和分类的 canvas title 没有什么区别
   */
  renderTitle() {
    if (this.isShowTitle()) {
      const title = this.get('title');

      const container = this.get('legendGroup');
      const titleStyle = this.get('titleStyle');

      const titleShape = container.addShape('text', {
        attrs: {
          x: 0,
          y: 0,
          text: title,
          ...titleStyle,
        },
      });
      titleShape.name = 'legend-title';
      this.set('titleShape', titleShape);
    }
  }

  /**
   * 连续性，直接 render 滑块即可
   */
  renderItems() {
    this.renderSlider();
  }

  // 绑定交互事件
  bindEvents() {
    if (this.isOperational()) {
      // 滑块的鼠标拖拽事件
      // 滑块更新数据之后的事件
    }
  }

  /**
  * 清空容器
  */
  clear() {
    const container = this.get('container');
    if (container && !container.destroyed) {
      container.clear();
    }
  }

  /**
   * 销毁
   */
  destroy() {
    super.destroy();
    const container = this.get('container');
    if (container && !container.destroyed) {
      // 将自己从父容器删除，并且销毁自己
      if (container.get('parent')) {
        container.remove(true);
      }
      container.destroy();
    }
  }

  /**
   * 滚动条布局，是否为横向
   * true  横向
   * false 纵向
   */
  isHorizontal(): boolean {
    return this.get('layout') === 'horizontal';
  }

  /* 是够可交互 */
  protected isOperational(): boolean {
    return this.get('operational');
  }

  /* 是够显示标题 */
  protected isShowTitle() {
    return !!this.get('title');
  }

  /* 滑块的配置 */
  protected getSliderConfig(): SliderCfg {
    return {
      layout: this.get('layout'),
      sliderType: this.get('handleIcon'), // rect | circle
      sliderSize: this.get('handleSize'),
      sliderStyle: this.get('handleStyle'),

      operational: this.isOperational(),

      // 宽高
      width: this.get('width'),
      height: this.get('height'),

      min: _.head(this.get('items')).value as number,
      max: _.last(this.get('items')).value as number,
      // 初始的 range 范围，例如：[ 0, 0.9 ]
      range: this.get('range') || [ 0, 1 ],

      // 文本样式
      textStyle: {
        ...this.get('textStyle'),
      },
      // 格式化
      formatter: this.formatterValue,
    };
  }

  // 渲染滑块（颜色和尺寸的效果是一致的）
  private renderSlider() {
    const itemsGroup = this.get('itemsGroup');
    // 创建 slider
    const slider = new Slider(this.getSliderConfig());
    // 设置背景 group
    slider.setBackground(this.createBackgroundGroup());

    // 平移
    if (this.isShowTitle()) {
      const titleDistance = this.get('titleDistance');
      const titleBbox = this.get('titleShape').getBBox();
      const height = titleBbox.height;
      // 往下平移 title 间距
      slider.translate(0, titleDistance + height);
    }

    // 监听事件
    // 值变更的时候，发送 itemfilter 事件。
    slider.on('sliderchange', (ev: SliderChangeEvent) => {
      const { value, range } = ev;
      const itemFiltered = new Event('itemfilter', ev, true, true);
      // @ts-ignore todo 传值格式
      itemFiltered.range = value;
      this.emit('itemfilter', itemFiltered);
    });

    itemsGroup.add(slider);

    this.set('slider', slider);
  }

  /* 背景的样式 */
  protected abstract createBackgroundGroup(): CreateBgType;
}
