import { Point } from '@antv/g-base/lib/types';
import * as _ from '@antv/util';
import Action from './base';

class TooltipAction extends Action {
  private timeStamp: number = 0;
  private location: Point;

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
      if (!preLoc || !_.isEqual(preLoc, curLoc)) {
        // 相同位置不重复展示
        view.showTooltip(curLoc);
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
    view.hideTooltip();
    this.location = null;
  }
}

export default TooltipAction;
