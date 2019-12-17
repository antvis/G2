import { each } from '@antv/util';
import Element from '../../../geometry/element/';
import { getIntersectElements } from '../util';
import StateBase from './state-base';

/**
 * 区域设置状态的基础 Action
 */
class ElementRangeState extends StateBase {
  private startPoint = null;
  private endPoint = null;
  private isStarted: boolean = false;
  // 获取当前的位置
  private getCurrentPoint() {
    const event = this.context.event;
    return {
      x: event.x,
      y: event.y,
    };
  }

  /**
   * 开始，记录开始选中的位置
   */
  public start() {
    this.startPoint = this.getCurrentPoint();
    this.isStarted = true;
  }

  /**
   * 选中
   */
  public setStateEnable(enable: boolean) {
    const startPoint = this.startPoint;
    const endPoint = this.isStarted ? this.getCurrentPoint() : this.endPoint;
    // 计算框选区域
    const box = {
      minX: Math.min(startPoint.x, endPoint.x),
      minY: Math.min(startPoint.y, endPoint.y),
      maxX: Math.max(startPoint.x, endPoint.x),
      maxY: Math.max(startPoint.y, endPoint.y),
    };
    this.clear(); // 区域设置状态，要清理之前的状态
    const view = this.context.view;
    const elements = getIntersectElements(view, box);
    if (elements.length) {
      this.setElementsState(elements, enable);
    }
  }

  protected setElementsState(elements: Element[], enable) {
    each(elements, (el) => {
      this.setElementState(el, enable);
    });
  }

  /**
   * 结束
   */
  public end() {
    this.isStarted = false;
    this.endPoint = this.getCurrentPoint();
  }
}

export default ElementRangeState;
