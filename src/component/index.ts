import EE from '@antv/event-emitter';
import { BBox, Group } from '@antv/g';

type Position = [number, number];

/**
 * Component 规范需要定义的基类
 * 1. 规范的 props 输入
 * 2. 统一的信息获取 API
 *    - 获取大小位置
 * 3. 明确定义的组件事件（名称、数据）
 */
export default abstract class Component extends EE {
  /** 组件名称，用于做组合事件 */
  public name: string;
  /** G.Group，因为无法确定 renderer，所以类型定义只能 any */
  public container: any;
  /** 位置信息 */
  public position: Position;
  /** 其他配置，不同组件有自己不同的配置结构 */
  private cfg: any;

  constructor(container: any, position: Position, cfg?: any) {
    super();

    this.container = container;
    this.position = position;
    this.cfg = cfg;
  }

  /**
   * 获取 G 组件
   */
  public getGComponent() {
    return this.container;
  }

  /**
   * 获取组件的位置大小
   */
  public getBBox(): BBox {
    return this.container.getBBox();
  }

  /**
   * 移动位置
   * @param x
   * @param y
   */
  public move(x: number, y: number) {
    this.container.move(x, y);
  }

  /**
   * 销毁
   */
  public destroy() {
    this.container.destroy();
  }

  /** 初始化节点 */
  protected abstract initial();

  // 代理 G.shape 事件，然后自己 emit 出来
  protected abstract proxyEvents();
}
