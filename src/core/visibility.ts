import EE from '@antv/event-emitter';

export type VisibilityCfg = {
  visible?: boolean;
};

/**
 * G2 Chart、View、Geometry、Element 等的基类，提供：
 * 1. 显示隐藏标记和 API
 * 2. 销毁标记和 API
 */
export class Visibility extends EE {
  /** 是否可见 */
  public visible: boolean;

  /** 标识对象是否已销毁 */
  public destroyed: boolean = false;

  constructor(cfg?: VisibilityCfg) {
    super();
    this.visible = cfg?.visible || true;
  }

  /**
   * 显示。
   */
  public show() {
    this.visible = true;
  }

  /**
   * 隐藏。
   */
  public hide() {
    this.visible = false;
  }

  /**
   * 切换显示隐藏转台
   */
  public toggle() {
    this.visible = !this.visible;
  }

  /**
   * 销毁。
   */
  public destroy() {
    this.off();
    this.destroyed = true;
  }
}
