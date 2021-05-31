import { Visibility } from '../core';

/**
 * Element 图形元素。
 * 定义：在 G2 中，我们会将数据通过图形语法映射成不同的图形，比如：
 * 点图，数据集中的每条数据会对应一个点，柱状图每条数据对应一个柱子；
 * 线图则是一组数据对应一条折线。
 * Element 即一条/一组数据对应的图形元素，它代表一条数据或者一个数据集，在图形层面，它可以是单个 Shape 也可以是多个 Shape，我们称之为图形元素。
 *
 * Element 是 G2 渲染最核心的类之一，开发者在基于图形做外部的自定义、联动的时候，会大量使用其中的数据和 API，非常重要！
 */
export class Element extends Visibility {
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
