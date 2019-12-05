import { isEqual } from '@antv/util';
import { PLOT_EVENTS } from '../constant';
import { Point } from '../interface';
import Interaction from './base';

export default class TooltipInteraction extends Interaction {
  public readonly type: string = 'tooltip';

  private timeStamp: number = 0;
  private location: Point;

  protected initEvents() {
    const view = this.view;
    const eventName = this.getTriggerEvent();
    if (eventName) {
      view.on(eventName, this.showTooltip);
      view.on(PLOT_EVENTS.MOUSE_LEAVE, this.hideTooltip);

      // enterable
      const { enterable, tooltip } = this.cfg;
      const tooltipContainer = tooltip.getContainer();

      if (enterable === false) {
        // 不允许进入
        tooltipContainer.onmousemove = (e) => {
          // 避免 tooltip 频繁闪烁
          const canvas = view.getCanvas();
          const eventObj = {
            ...canvas.getPointByClient(e.clientX, e.clientY),
            view,
          };
          view.emit(eventName, eventObj);
        };
      }

      // 鼠标移入 tooltipContainer 然后再移出时，需要隐藏 tooltip
      tooltipContainer.onmouseleave = () => {
        if (!this.stateManager.getState('_isTooltipLocked')) {
          view.hideTooltip();
        }
      };
    }
  }

  private getTriggerEvent() {
    const { trigger } = this.cfg;
    let eventName;

    if (trigger === 'mousemove') {
      eventName = PLOT_EVENTS.MOUSE_MOVE;
    } else if (trigger === 'click') {
      eventName = 'click';
    } else if (trigger === 'none') {
      eventName = null;
    }

    return eventName;
  }

  private showTooltip = (ev) => {
    const isTooltipLocked = this.stateManager.getState('_isTooltipLocked');
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
        // 相同位置不重复展示
        this.view.showTooltip(curLoc);
      }
      this.timeStamp = timeStamp;
      this.location = curLoc;
    }
  };

  private hideTooltip = () => {
    const isTooltipLocked = this.stateManager.getState('_isTooltipLocked');
    if (isTooltipLocked) {
      // 锁定 tooltip 时不隐藏
      return;
    }
    this.view.hideTooltip();
    this.location = null;
  };

  /**
   * destroy
   */
  public destroy() {
    const view = this.view;
    const eventName = this.getTriggerEvent();
    if (eventName) {
      view.off(eventName, this.showTooltip);
      view.off('plot:mouseleave', this.hideTooltip);
    }
  }
}
