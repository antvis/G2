import EE from '@antv/event-emitter';

interface BaseCfg {
  visible?: boolean;
}

export default class Base extends EE {
  public visible: boolean;
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
      this.visible = true;
      this.changeVisible(true);
    }
  }

  /**
   * 隐藏。
   */
  public hide() {
    const visible = this.visible;
    if (visible) {
      this.visible = false;
      this.changeVisible(false);
    }
  }

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
