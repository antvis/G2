import EE from '@antv/event-emitter';

interface BaseCfg {
  visible?: boolean;
}

/**
 * G2 Chart、View、Geometry 以及 Element 等的基类，提供事件以及一些通用的方法。
 */
export default class Base extends EE {
  /** 是否可见 */
  public visible: boolean;
  /** 标识对象是否已销毁 */
  public destroyed: boolean = false;

  constructor(cfg: BaseCfg) {
    super();
    const { visible = true } = cfg;
    this.visible = visible;
  }

  /**
   * 显示。
   */
  public show() {
    const visible = this.visible;
    if (!visible) {
      this.changeVisible(true);
    }
  }

  /**
   * 隐藏。
   */
  public hide() {
    const visible = this.visible;
    if (visible) {
      this.changeVisible(false);
    }
  }

  /**
   * 销毁。
   */
  public destroy() {
    this.off();
    this.destroyed = true;
  }

  /**
   * 显示或者隐藏。
   * @param visible
   * @returns
   */
  public changeVisible(visible: boolean) {
    if (this.visible === visible) {
      return;
    }
    this.visible = visible;
  }
}
