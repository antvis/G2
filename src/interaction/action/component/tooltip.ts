import { isEqual } from '@antv/util';
import { Point } from '../../../interface';
import Action from '../base';
import { View } from '../../../chart';

/**
 * Tooltip 展示隐藏的 Action
 */
class TooltipAction extends Action {
  private timeStamp: number = 0;
  private location: Point;

  protected showTooltip(view: View, point: Point) {
    // 相同位置不重复展示
    view.showTooltip(point);
  }

  protected hideTooltip(view) {
    view.hideTooltip();
  }

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

    if (timeStamp - lastTimeStamp > 16) {
      const preLoc = this.location;
      const curLoc = { x: ev.x, y: ev.y };
      if (!preLoc || !isEqual(preLoc, curLoc)) {
        this.showTooltip(view, curLoc);
      }
      this.timeStamp = timeStamp;
      this.location = curLoc;
    }
  }

  public hide() {
    const view = this.context.view;
    const isTooltipLocked = view.isTooltipLocked();
    if (isTooltipLocked) {
      // 锁定 tooltip 时不隐藏
      return;
    }
    this.hideTooltip(view);
    this.location = null;
  }
}

export default TooltipAction;
