import { Point } from '../../../dependents';
import Action from '../base';
import { distance } from '../util';

const DISTANCE = 4; // 移动的最小距离

/**
 * @ignore
 * View 支持 Drag 的 Action
 */
class Drag extends Action {
  // Action 开始，不等同于 拖拽开始，需要判定移动的范围
  protected starting = false;
  // 拖拽开始
  protected dragStart = false;
  // 开始的节点
  protected startPoint: Point;

  /**
   * 开始
   */
  public start() {
    this.starting = true;
    this.startPoint = this.context.getCurrentPoint();
  }

  /**
   * 拖拽
   */
  public drag() {
    if (!this.startPoint) {
      return;
    }
    const current = this.context.getCurrentPoint();
    const view = this.context.view;
    const event = this.context.event;
    if (!this.dragStart) {
      if (distance(current, this.startPoint) > DISTANCE) {
        view.emit('dragstart', {
          target: event.target,
          x: event.x,
          y: event.y,
        });
        this.dragStart = true;
      }
    } else {
      view.emit('drag', {
        target: event.target,
        x: event.x,
        y: event.y,
      });
    }
  }

  /**
   * 结束
   */
  public end() {
    if (this.dragStart) {
      const view = this.context.view;
      const event = this.context.event;
      view.emit('dragend', {
        target: event.target,
        x: event.x,
        y: event.y,
      });
    }
    this.starting = false;
    this.dragStart = false;
  }
}

export default Drag;
