import EE from '@antv/event-emitter';

/**
 * 所有 Geometry 的基类
 */
export class Geometry extends EE {
  
  constructor() {
    super();
  }

  /** 设置图形的视觉通道字段和配置          ***********************************************************************************/

  /**
   * 位置通道：x, y
   */
  public position() {

  }

  /**
   * 位置通道：x, y
   */
  public color() {

  }

  /**
   * 大小通道：size
   */
  public size() {

  }

  /**
   * 数据标签通道：label
   */
  public label() {

  }

  /**
   * tooltip 通道：tooltip
   */
  public tooltip() {

  }

  /**
   * sequence 序列通道：sequence
   */
  public sequence() {

  }

  /** 获取信息的 API            ***********************************************************************************/

  /**
   * 获取当前 Geometry 对应的 elements 绘图元素
   */
  public getElements() {

  }

  
}
 