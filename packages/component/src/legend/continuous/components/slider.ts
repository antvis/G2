import { Group, Shape } from '@antv/g';
import * as _ from '@antv/util';
import * as domUtil from '@antv/dom-util';
import { SLIDER_CIRCLE_MAX_SIZE, SLIDER_WIDTH, SLIDER_HEIGHT, SliderBtnStyle } from '../constant';
import { CreateBgType } from '../interface';

export interface SliderCfg {
  // 布局 vertical | horizontal
  readonly layout: string;
  // rect | circle
  readonly sliderType: string;
  readonly sliderSize?: number[];
  readonly sliderStyle?: object; // 暂未使用
  // 滑块大小是否随着值的变化而变化
  // readonly sliderReactive: boolean;
  // 是够可交互（滑块可以拖拽）
  readonly operational: boolean;

  // 图例宽高
  readonly width: number;
  readonly height: number;

  // 图例 min max 值
  readonly min: number;
  readonly max: number;
  // 初始的 range 范围，例如：[ 0, 1 ]
  readonly range: number[];

  // 文本样式
  readonly textStyle: object;
  // 文本和滑块之前的距离
  // readonly textOffset: number;

  // 格式化
  readonly formatter: Function;
}

/**
 * 滑动条的逻辑
 *
 * 滑动条包括几个部分：
 * - 滑动条背景
 * - 小滑块区域（滑块 + 文本）
 * - 大滑块区域（滑块 + 文本
 * - 中间滑动区域（左右滑块中间可以滑动选中的区域）
 * - 鼠标 hover 提示文本（暂时不处理）
 *
 * 其中 min，max，range 的创建内置掉，仅有外部的布局（v，h）、类型（rect、circle）影响
 */
export default class Slider extends Group {

  /* 布局 */
  layout: string;
  /* 滑块样式 */
  sliderType: string;
  sliderSize: number[];

  /* 是否可交互 */
  operational: boolean;
  /* 背景组 */
  backgroundGroup: Group;

  // 宽高
  width: number;
  height: number;

  // 滚动条的最大最小值
  min: number;
  max: number;
  // 移动的步长，暂无
  step?: number;

  // 当前的范围
  range: number[];

  // private stashRange: number[]; // 临时存储的变量

  textStyle: object;
  // textOffset: number;

  formatter: Function;

  // 其他内部属性
  minSliderGroup: Group;
  minSliderShape: Shape;
  minTextShape: Shape;

  maxSliderGroup: Group;
  maxSliderShape: Shape;
  maxTextShape: Shape;

  rangeSliderShape: Shape;
  clearAllEvents: Function;

  // 当前交互的 shape
  currentTarget: Shape;

  // 鼠标拖拽过程中，当前位置
  private pos: number;

  constructor(cfg: SliderCfg) {
    super();

    // cfg 属性全部存储到 this 上，而不是存储到 cfg 中！
    const {
      layout, sliderType,
      sliderSize,
      operational,
      width, height, textStyle,
      min, max, range,
      formatter,
    } = cfg;

    this.layout = layout;
    this.sliderType = sliderType;
    const [ w = SLIDER_WIDTH, h = SLIDER_HEIGHT ] = sliderSize || [];
    this.sliderSize = [ w, h ];

    this.operational = operational;

    this.width = width;
    this.height = height;

    this.min = min;
    this.max = max;
    this.range = range;

    this.textStyle = textStyle;

    this.formatter = formatter;

    // 创建初始的内容
    this.initialSlider();
  }

  /**
   * 外部设置 background
   * @param bg
   */
  setBackground(bg: CreateBgType) {
    // 如果已经存在，那么先移除
    if (this.backgroundGroup) {
      // this.remove(true);
      // this.backgroundGroup.remove(true);
      // this.removeChild(this.backgroundGroup, true);
      this.backgroundGroup.destroy();
    }

    const { group, background, frontend } = bg;

    // 然后添加
    this.backgroundGroup = group;
    this.backgroundGroup.set('zIndex', 0);

    if (this.operational && this.rangeSliderShape && frontend) {
      frontend.attr('clip', this.rangeSliderShape);
      // this.add(this.rangeSliderShape);
    }

    this.add(this.backgroundGroup);
    this.sort();
  }

  /**
   * 滚动条布局，是否为横向
   * true  横向
   * false 纵向
   */
  isHorizontal(): boolean {
    return this.layout === 'horizontal';
  }

  /**
   * 初始化滑块
   * 在配置完滑块的背景之后，挑用初始化方法来初始化 slider
   */
  private initialSlider() {
    if (this.operational) {
      this.rangeSliderShape = this.createRangeSliderShape();
      this.rangeSliderShape.set('zIndex', 1);

      this.minSliderGroup = this.createMinSliderGroup();
      this.minSliderGroup.set('zIndex', 2);

      this.maxSliderGroup = this.createMaxSliderGroup();
      this.maxSliderGroup.set('zIndex', 2);

      const [ min, max ] = this.range;
      // 使用默认的 range 范围渲染 UI
      this.renderUIWithRange(min, max);
    }

    // 绑定事件
    this.bindEvent();
  }

  /* 滑块 hover 的鼠标样式 */
  private getSliderCursor() {
    return this.isHorizontal() ? 'ew-resize' : 'ns-resize';
  }

  /* 小滑块的区域样式 */
  private createMinSliderGroup(): Group {
    const group = this.addGroup();

    this.minSliderShape = this.createSliderButton(group, true);
    this.minTextShape = this.createSliderText(group, true);

    return group;
  }

  /* 大滑块的区域样式 */
  private createMaxSliderGroup(): Group {
    const group = this.addGroup();

    this.maxSliderShape = this.createSliderButton(group, false);
    this.maxTextShape = this.createSliderText(group, false);

    return group;
  }

  /* 拖动两个滑块 button 中间，可以滑动整体 */
  private createRangeSliderShape(): Shape {
    return this.addShape('rect', {
      attrs: {
        fill: '#fff',
        fillOpacity: 0,
        cursor: 'move',
      },
    });
  }

  /* rect 的属性信息 */
  private getRectButtonAttribute(isMin: boolean) {
    const [ sliderWidth, sliderHeight ] = this.sliderSize;

    // 前提，滑块的高度是宽度的一半
    if (this.isHorizontal()) {
      return {
        x: isMin ? -sliderWidth : 0,
        y: this.height / 2 - sliderHeight / 2,
        width: sliderWidth,
        height: sliderHeight,
      };
    }
    return {
      x: this.width / 2 - sliderHeight / 2,
      y: isMin ? 0 : -sliderWidth,
      width: sliderHeight,
      height: sliderWidth,
    };
  }

  private getCircleButtonAttribute(isMin: boolean) {
    // circle 坐标系为圆心
    if (this.isHorizontal()) {
      return {
        x: 0,
        y: this.height / 2,
        r: SLIDER_CIRCLE_MAX_SIZE / 2, // 半径
      };
    }
    return {
      x: this.width / 2,
      y: 0,
      r: SLIDER_CIRCLE_MAX_SIZE / 2,
    };
  }

  /**
   * 创建滑块
   * @param group
   * @param isMin 是小滑块还是大滑块
   */
  private createSliderButton(group: Group, isMin: boolean): Shape {
    const buttonAttr = this.sliderType === 'rect' ? this.getRectButtonAttribute(isMin) :
      this.sliderType === 'circle' ? this.getCircleButtonAttribute(isMin) : {};

    // 不同的 slider 滑块
    const buttonAttribute = {
      ...buttonAttr,
      ...SliderBtnStyle,
      cursor: this.getSliderCursor(),
    };

    return group.addShape(this.sliderType, {
      attrs: buttonAttribute,
    });
  }

  private getRectTextAttribute(isMin: boolean) {
    const [ sliderWidth, sliderHeight ] = this.sliderSize;

    return this.isHorizontal() ? {
      // text 文本值
      x: isMin ? -sliderWidth / 2 : sliderWidth / 2,
      y: this.height / 2 + sliderHeight / 2 + 4, // 间距 4px
      textAlign: 'center',
      textBaseline: 'top',
    } : {
      x: this.width / 2 + sliderHeight / 2 + 4,
      y: isMin ? sliderWidth / 2 : -sliderWidth / 2,
      textAlign: 'left',
      textBaseline: 'middle',
    };
  }

  private getCircleTextAttribute(isMin: boolean) {
    return this.isHorizontal() ? {
      // text 文本值
      x: 0,
      y: this.height / 2 + SLIDER_CIRCLE_MAX_SIZE / 2 + 4, // 间距 4px
      textAlign: 'center',
      textBaseline: 'top',
    } : {
      x: this.width / 2 + SLIDER_CIRCLE_MAX_SIZE / 2 + 4,
      y: 0,
      textAlign: 'left',
      textBaseline: 'middle',
    };
  }

  /**
   * 创建滑块文字
   * @param group
   * @param isMin
   */
  private createSliderText(group: Group, isMin: boolean): Shape {
    const textAttribute = this.sliderType === 'rect' ? this.getRectTextAttribute(isMin) :
      this.sliderType === 'circle' ? this.getCircleTextAttribute(isMin) : {};

    const textAttr = {
      ...this.textStyle,
      ...textAttribute,
      text: '', // 暂时使用空的
    };

    return group.addShape('text', {
      attrs: textAttr,
    });
  }

  // 绑定事件：大小滑块鼠标事件，range 区域的鼠标事件
  private bindEvent() {
    if (this.operational) {
      // 鼠标点击的时候，开始滑动
      this.on('mousedown', this.onMouseDown);
    }
  }

  private onMouseDown(ev) {
    // 当前触发的 shape
    this.currentTarget = ev.target;

    const originEvent = ev.event as MouseEvent;

    // 阻止冒泡
    originEvent.stopPropagation();
    originEvent.preventDefault();

    const { clientX, clientY } = originEvent;

    // 鼠标坐标位置
    this.pos = this.isHorizontal() ? clientX : clientY;

    this.bindCanvasEvents();
  }

  private bindCanvasEvents() {
    const containerDOM = this.get('canvas').get('containerDOM');

    const e1 = domUtil.addEventListener(containerDOM, 'mousemove', this.onMouseMove);
    const e2 = domUtil.addEventListener(containerDOM, 'mouseup', this.onMouseUp);
    const e3 = domUtil.addEventListener(containerDOM, 'mouseleave', this.onMouseUp);

    // 清除所有事件的方法，在交互结束的时候执行
    this.clearAllEvents = () => {
      e1.remove();
      e2.remove();
      e3.remove();
    };
  }

  // 拖拽过程中，更新 slider 状态位置
  private onMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e;

    this.updateSliderStatus(clientX, clientY);
  }

  // 拖拽结束，清除事件
  private onMouseUp = () => {
    // 走到这里，理论上一定会存在方法
    if (this.clearAllEvents) {
      this.clearAllEvents();
    }

    this.currentTarget = undefined;
  }

  private isDragMin(): boolean {
    return this.currentTarget === this.minSliderShape;
  }

  private isDragMax(): boolean {
    return this.currentTarget === this.maxSliderShape;
  }

  private isDragAll(): boolean {
    return this.currentTarget === this.rangeSliderShape;
  }

  /**
   * 根据鼠标位置 x,y，更新滑块位置状态
   * @param x
   * @param y
   */
  private updateSliderStatus(x: number, y: number) {
    const totalLength = this.isHorizontal() ? this.width : this.height;

    const sign = this.isHorizontal() ? 1 : -1; // canvas 坐标和事件坐标相反

    const [ min, max ] = this.range; // 默认的 range

    const prePosition = this.pos;
    const currentPosition = this.isHorizontal() ? x : y;

    // 鼠标拖拽的长度
    const diffLength = currentPosition - prePosition;

    // 鼠标拖拽的比例，用于做 range 计算
    const diff = (diffLength / totalLength) * sign;

    let newRange = [ min, max ];

    // 左右两个一起拖拽（拖拽左右滑块中间区域，可以实现两个滑块一起拖拽）
    if (this.isDragAll()) {
      if (diff >= 0 && max + diff > 1) {
        // max 超出
        newRange = [ min + (1 - max), 1 ];
      } else if (diff < 0 && min + diff < 0) {
        // min 超出
        newRange = [ 0, max - min ];
      } else {
        // 都没有超出
        newRange = [ min + diff, max + diff ];
      }
    } else {
      // 分别处理
      if (this.isDragMin()) {
        newRange[0] = this.getNewRange(min, diff);
      }
      if (this.isDragMax()) {
        newRange[1] = this.getNewRange(max, diff);
      }

      // 如果处理之后 max < min，则设置成一样的，拖那个用哪个
      if (newRange[1] < newRange[0]) {
        newRange = Array(2).fill(this.isDragMin() ? newRange[0] : newRange[1]);
      }
    }

    // 更新状态
    this.pos = currentPosition;
    this.range = newRange;

    // 发送事件
    this.emit('sliderchange', {
      range: newRange,
      value: newRange.map((r) => this.getValue(r)),
    });

    this.renderUIWithRange(newRange[0], newRange[1]);

    // 渲染 redraw
    this.get('canvas').draw();
  }

  /* 根据 range 变更 ui */
  private renderUIWithRange(minRatio: number, maxRatio: number) {
    const width = this.width;
    const height = this.height;

    // resetMatrix 是 reset 的创建的属性
    this.minSliderGroup.resetMatrix();
    this.maxSliderGroup.resetMatrix();

    // 修改滑块位置
    // 横向，纵向的变换逻辑不一样
    if (this.isHorizontal()) {
      this.rangeSliderShape.attr({
        x: width * minRatio,
        y: 0,
        width: (maxRatio - minRatio) * width,
        height,
      });
      this.minSliderGroup.translate(minRatio * width, 0);
      this.maxSliderGroup.translate(maxRatio * width, 0);
    } else {
      this.rangeSliderShape.attr({
        x: 0,
        y: height * (1 - maxRatio),
        width,
        height: (maxRatio - minRatio) * height,
      });
      // 纵向图例，上大下小
      this.minSliderGroup.translate(0, (1 - minRatio) * height);
      this.maxSliderGroup.translate(0, (1 - maxRatio) * height);
    }

    // 更新文本
    this.minTextShape.attr('text', this.formatter(this.getValue(minRatio)));
    this.maxTextShape.attr('text', this.formatter(this.getValue(maxRatio)));

    // 对于 circle 的情况下，滑块的大小需要随着变化而变化
    if (this.sliderType === 'circle') {
      this.minSliderShape.attr({
        r: (SLIDER_HEIGHT + minRatio * (SLIDER_CIRCLE_MAX_SIZE - SLIDER_HEIGHT)) / 2,
      });
      this.maxSliderShape.attr({
        r: (SLIDER_HEIGHT + maxRatio * (SLIDER_CIRCLE_MAX_SIZE - SLIDER_HEIGHT)) / 2,
      });
    }
  }

  /**
   * 在原来 range 的基础上，增加一个 diff
   * @param range
   * @param diff
   */
  private getNewRange(range, diff) {
    const r = diff + range;
    return r > 1 ? 1 :
      r < 0 ? 0 : r;
  }

  private getValue(ratio: number): number {
    const v = this.min + (this.max - this.min) * ratio;
    return Number(v.toFixed(v > 1 ? 0 : 2)); // todo 格式化规则
  }
}
