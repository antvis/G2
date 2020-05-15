import { get, isEqual, isNil } from '@antv/util';
import { View } from '../../../chart';
import { Point } from '../../../interface';
import Action from '../base';

// 判断是否有样式
function hasClass(dom, className) {
  if (!dom) {
    return false;
  }
  let cls = '';
  if (!dom.className) {
    return false;
  }
  if (!isNil(dom.className.baseVal)) {
    cls = dom.className.baseVal;
  } else {
    cls = dom.className;
  }
  return cls.includes(className);
}

function isParent(dom, cls) {
  let parent = dom.parentNode;
  let rst = false;
  while (parent && parent !== document.body) {
    if (hasClass(parent, cls)) {
      rst = true;
      break;
    }
    parent = parent.parentNode;
  }
  return rst;
}

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

  /**
   * 隐藏 Tooltip。
   * @returns
   */
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

  protected showTooltip(view: View, point: Point) {
    // 相同位置不重复展示
    view.showTooltip(point);
  }

  protected hideTooltip(view) {
    view.hideTooltip();
  }
}

export default TooltipAction;
