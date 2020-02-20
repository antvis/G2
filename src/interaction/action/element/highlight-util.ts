import { each } from '@antv/util';
import { View } from '../../../chart';
import Element from '../../../geometry/element/';
import { getElements } from '../util';

const STATUS_UNACTIVE = 'inactive';
const STATUS_ACTIVE = 'active';

/**
 * @ignore
 * 清理 highlight 效果
 * @param view View 或者 Chart
 */
export function clearHighlight(view: View) {
  const elements = getElements(view);
  each(elements, (el) => {
    if (el.hasState(STATUS_ACTIVE)) {
      el.setState(STATUS_ACTIVE, false);
    }
    if (el.hasState(STATUS_UNACTIVE)) {
      el.setState(STATUS_UNACTIVE, false);
    }
  });
}

type MatchCallback = (el: Element) => boolean;

/**
 * @ignore
 * 设置多个元素的 highlight
 * @param elements 元素集合
 * @param callback 设置回调函数
 * @param enable 设置或者取消
 */
export function setHighlightBy(elements: Element[], callback: MatchCallback, enable: boolean) {
  each(elements, (el) => {
    // 需要处理 active 和 unactive 的互斥
    if (callback(el)) {
      if (el.hasState(STATUS_UNACTIVE)) {
        el.setState(STATUS_UNACTIVE, false);
      }
      el.setState(STATUS_ACTIVE, enable);
    } else {
      if (el.hasState(STATUS_ACTIVE)) {
        el.setState(STATUS_ACTIVE, false);
      }
      el.setState(STATUS_UNACTIVE, enable);
    }
  });
}
