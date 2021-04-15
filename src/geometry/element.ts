import EE from '@antv/event-emitter';
/**
 * 每个 Geometry 中对应多个分组的 Element，Element 对于不同的 Geometry 都是统一的一个类。
 */

export class Element extends EE {
  /**
   * 绘制图形 Element 对应的数据层模型
   */
  private model: any;

  constructor() {
    super();
  }

  /**
   * 获取数据模型
   */
  public getModel() {
    return this.model;
  }

  /**
   * 显示
   */
  public show() {}

  /**
   * 隐藏
   */
  public hide() {}
}
