import { each } from '@antv/util';
import { ListItem } from '../../../dependents';
import Element from '../../../geometry/element/';
import { getElements, getElementsByState } from '../util';
import { clearHighlight } from './highlight-util';
import StateAction from './state';

import { ELEMENT_STATE } from '../../../constant';

export const STATUS_UNACTIVE = ELEMENT_STATE.INACTIVE;
export const STATUS_ACTIVE = ELEMENT_STATE.ACTIVE;
export type Callback = (el) => boolean;

/**
 * @ignore
 * highlight，指定图形高亮，其他图形变暗
 */
class ElementHighlight extends StateAction {
  protected stateName: string = STATUS_ACTIVE;

  // 多个元素设置、取消 highlight
  protected setElementsStateByItem(elements: Element[], field: string, item: ListItem, enable: boolean) {
    const callback = (el) => this.isMathItem(el, field, item);
    this.setHighlightBy(elements, callback, enable);
  }

  // 设置元素的 highlight
  protected setElementHighlight(el: Element, callback: Callback) {
    if (callback(el)) {
      if (el.hasState(STATUS_UNACTIVE)) {
        el.setState(STATUS_UNACTIVE, false);
      }
      el.setState(STATUS_ACTIVE, true);
    } else if (!el.hasState(STATUS_ACTIVE)) {
      el.setState(STATUS_UNACTIVE, true);
    }
  }

  protected setHighlightBy(elements: Element[], callback: Callback, enable: boolean) {
    if (enable) {
      // 如果是设置 highlight ，则将匹配的 element 设置成 active，
      // 其他如果不是 active，则设置成 unactive
      each(elements, (el) => {
        this.setElementHighlight(el, callback);
      });
    } else {
      // 如果取消 highlight，则要检测是否全部取消 highlight
      const activeElements = getElementsByState(this.context.view, STATUS_ACTIVE);
      let allCancel = true;
      // 检测所有 activeElements 都要取消 highlight
      each(activeElements, (el) => {
        if (!callback(el)) {
          allCancel = false;
          return false;
        }
      });
      if (allCancel) {
        // 都要取消，则取消所有的 active，unactive 状态
        this.clear();
      } else {
        // 如果不是都要取消 highlight, 则设置匹配的 element 的状态为 unactive
        // 其他 element 状态不变
        each(elements, (el) => {
          if (callback(el)) {
            if (el.hasState(STATUS_ACTIVE)) {
              el.setState(STATUS_ACTIVE, false);
            }
            el.setState(STATUS_UNACTIVE, true);
          }
        });
      }
    }
  }

  // 单个元素设置和取消 highlight
  protected setElementState(element: Element, enable: boolean) {
    const view = this.context.view;
    const elements = getElements(view);
    this.setHighlightBy(elements, (el) => element === el, enable);
  }

  public highlight() {
    this.setState();
  }

  // 清理掉所有的 active， unactive 状态
  public clear() {
    const view = this.context.view;
    clearHighlight(view);
  }
}

export default ElementHighlight;
