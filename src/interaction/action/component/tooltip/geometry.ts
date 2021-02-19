import { isEqual, get } from '@antv/util';
import { View } from '../../../../chart';
import { Point } from '../../../../interface';
import Action from '../../base';
import Tooltip from '../../../../chart/controller/tooltip';

/**
 * Tooltip 展示隐藏的 Action
 * @ignore
 */
class TooltipAction extends Action {
  private timeStamp: number = 0;
  private location: Point;

  /**
   * 显示 Tooltip
   * @returns
   */
  public show() {
    const context = this.context;
    const ev = context.event;
    const view = context.view;
    const isTooltipLocked = view.isTooltipLocked();
    if (isTooltipLocked) {
      // 锁定时不移动 tooltip
      return;
    }
    const lastTimeStamp = this.timeStamp;
    const timeStamp = +new Date();

    // 在 showDelay 毫秒（默认 16ms）内到 tooltip 上可以实现 enterable（调参工程师）
    const showDelay = get(context.view.getOptions(), 'tooltip.showDelay', 16);
    if (timeStamp - lastTimeStamp > showDelay) {
      const preLoc = this.location;
      const curLoc = { x: ev.x, y: ev.y };
      if (!preLoc || !isEqual(preLoc, curLoc)) {
        this.showTooltip(view, curLoc);
      }
      this.timeStamp = timeStamp;
      this.location = curLoc;
    }
  }

  /**
   * 隐藏 Tooltip。
   * @returns
   */
  public hide() {
    const view = this.context.view;

    const tooltip = view.getController('tooltip');
    const { clientX, clientY } = this.context.event;

    // 如果已经 enterable + 已经在 tooltip 上，那么不隐藏
    if (tooltip.isCursorEntered({ x: clientX, y: clientY })) {
      return;
    }

    // 锁定 tooltip 时不隐藏
    if (view.isTooltipLocked()) {
      return;
    }
    this.hideTooltip(view);
    this.location = null;
  }

  protected showTooltip(view: View, point: Point) {
    // 相同位置不重复展示
    view.showTooltip(point);
  }

  protected hideTooltip(view) {
    view.hideTooltip();
  }
}

export default TooltipAction;
