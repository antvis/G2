import { Controller } from './base';
import { IGroup, Scrollbar as ScrollbarComponent } from '../../dependents';
import { ScrollbarOption, ComponentOption, ScrollbarCfg } from '../../interface';
import View from '../view';
import { BBox } from '../../util/bbox';
import { directionToPosition } from '../../util/direction';
import { COMPONENT_TYPE, DIRECTION, LAYER } from '../../constant';
import { isObject, clamp } from '@antv/util';

const DEFAULT_PADDING: number = 4;
const DEFAULT_SIZE: number = 8;
const DEFAULT_CATEGORY_SIZE: number = 32;
const MIN_THUMB_LENGTH: number = 20;

export default class Scrollbar extends Controller<ScrollbarOption> {
  private scrollbar: ComponentOption;
  private container: IGroup;

  constructor(view: View) {
    super(view);

    this.container = this.view.getLayer(LAYER.FORE).addGroup();
  }

  get name(): string {
    return 'scrollbar';
  }

  /**
   * 初始化
   */
  public init() {}

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
        this.scrollbar.component.on('scrollchange', this.onValueChange);
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
    if (this.scrollbar) {
      const width = this.view.coordinateBBox.width;
      const bbox = BBox.fromObject(this.scrollbar.component.getLayoutBBox());

      const [x1, y1] = directionToPosition(this.view.viewBBox, bbox, DIRECTION.BOTTOM);
      const [x2, y2] = directionToPosition(this.view.coordinateBBox, bbox, DIRECTION.BOTTOM);

      // 默认放在 bottom
      this.scrollbar.component.update({
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

  private onValueChange = (evt) => {
    // TODO:
    console.log('onValueChange', evt);
  };

  private createScrollbar(): ComponentOption {
    const { type } = this.getValidScrollbarCfg();
    const isHorizontal = type !== 'vertical';
    const component = new ScrollbarComponent({
      container: this.container,
      ...this.getScrollbarComponentCfg(),
    });

    component.init();

    return {
      component,
      layer: LAYER.FORE,
      direction: isHorizontal ? DIRECTION.BOTTOM : DIRECTION.RIGHT,
      type: COMPONENT_TYPE.OTHER,
    };
  }

  private updateScrollbar(): ComponentOption {
    this.scrollbar.component.update({
      ...this.getScrollbarComponentCfg(),
    });

    return this.scrollbar;
  }

  private getScrollbarComponentCfg() {
    const { coordinateBBox, viewBBox } = this.view;
    const xScale = this.view.getXScale();
    const { type, padding, width, height, categorySize } = this.getValidScrollbarCfg();
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
    const step = Math.floor((isHorizontal ? coordinateBBox.width : coordinateBBox.height) / categorySize);
    const trackLen = isHorizontal
      ? coordinateBBox.width - paddingLeft - paddingRight
      : coordinateBBox.height - paddingTop - paddingBottom;
    const thumbLen = Math.max(trackLen * clamp(step / xScale.values.length, 0, 1), MIN_THUMB_LENGTH);

    return {
      x: 0,
      y: 0,
      isHorizontal,
      trackLen,
      thumbLen,
      thumbOffset: 0,
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
}
