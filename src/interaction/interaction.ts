import type { View } from '../chart/view';

/**
 * 交互（Interaction）的基类，所有交互都可以按照这个来按开发，非常简单的生命周期：
 * - init 初始化阶段，用来绑定交互事件
 * - destroy 解绑事件，销毁辅助元素
 */
export abstract class Interaction<O = any> {
  /**
   * 交互所在的 interaction
   */
  public view: View;

  /**
   * 交互的用户传入配置
   */
  public options: O;

  constructor(view: View, options: O) {
    this.view = view;
    this.options = options;
  }

  /**
   * 初始化
   */
  public abstract init();

  /**
   * 销毁
   */
  public destroy() {}
}

export type InteractionCtor = new (view: View, options: any) => Interaction;
