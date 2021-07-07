import { Group } from '@antv/g';
import { get, isArray } from '@antv/util';
import { ElementOptions } from '../types/element';
import { Visibility } from '../core';
import { ShapeInfo } from '../types';

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

  /**
   * 通过构造方法传入的配置项
   */
  private options: ElementOptions;

  /**
   * 绘制之后，产生的 G 元素
   */
  private shape: any;

  constructor(options: ElementOptions) {
    super();

    this.options = options;
  }

  public get id() {
    return this.options.id;
  }

  /**
   * 更新渲染
   * @param model
   */
  public update(model: ShapeInfo) {
    // 如果 shape 不存在，那么必然不是更新，也无法更新
    if (!this.shape) {
      return;
    }

    this.model = model;

    const { geometry } = this.options;
    const shapeType = this.getShapeType();

    // todo 使用 G 场景树构造一个！
    const offscreenGroup = new Group({});

    const newShape = geometry.drawShape(shapeType, this.model, offscreenGroup);

    // 最后新旧 shape 进行同步
    this.syncShape(this.shape, newShape);
  }

  /**
   * 初次渲染
   * @param model
   */
  public draw(model: ShapeInfo) {
    // 更新 model
    this.model = model;

    // 绘制图形
    this.drawShape();

    if (this.visible === false) {
      this.hide();
    }
  }

  public destroy() {
    // 销毁动画
    // 重置属性
  }

  /**
   * 获取数据模型
   */
  public getModel() {
    return this.model;
  }

  /**
   * 获取对应的数据
   */
  public getData() {
    return this.model.data;
  }

  /**
   * 具体根据 shape 类型，绘制对应的 ui
   */
  private drawShape() {
    const shapeType = this.getShapeType();
    const { geometry, container } = this.options;

    this.shape = geometry.drawShape(shapeType, this.model, container);

    // todo
    // 添加 shape 的 name 属性，用于 element 事件
    // 执行动画
  }

  /**
   * 当前的 shape 名称
   */
  private getShapeType() {
    const shape = get(this.model, 'shape');
    return isArray(shape) ? shape[0] : shape;
  }

  /**
   * element 更新的时候，新旧 shape 进行同步
   * todo: 通过 diff，觉得哪些是 add、update、remove
   */
  private syncShape(shape: Group, newShape: Group) {
    const { container } = this.options;
    // 移除旧节点
    shape.destroy();

    // 增加新节点
    container.appendChild(newShape);

    this.shape = newShape;
  }
}
