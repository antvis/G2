import { View } from '../chart';
import { LooseObject } from '../interface';

export type InteractionConstructor = new (view: View, cfg: LooseObject) => Interaction;

/**
 * 交互的基类。
 */
export default class Interaction {
  /** view 或者 chart */
  protected view: View;
  /** 配置项 */
  protected cfg: LooseObject;

  constructor(view: View, cfg: LooseObject) {
    this.view = view;
    this.cfg = cfg;
  }

  /**
   * 初始化。
   */
  public init() {
    this.initEvents();
  }

  /**
   * 绑定事件
   */
  protected initEvents() {}

  /**
   * 销毁事件
   */
  protected clearEvents() {}

  /**
   * 销毁。
   */
  public destroy() {
    this.clearEvents();
  }
}
