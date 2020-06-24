import Element from '../../../geometry/element/';
import { getElements, getElementValue, getCurrentElement } from '../util';
import Highlight, { STATUS_ACTIVE, STATUS_UNACTIVE, Callback } from './highlight';

/**
 * Highlight x
 * @ignore
 */
class HighlightX extends Highlight {
  // 不允许多选
  protected setElementHighlight(el: Element, callback: Callback) {
    if (callback(el)) {
      if (el.hasState(STATUS_UNACTIVE)) {
        el.setState(STATUS_UNACTIVE, false);
      }
      el.setState(STATUS_ACTIVE, true);
    } else {
      el.setState(STATUS_UNACTIVE, true);
      if (el.hasState(STATUS_ACTIVE)) {
        el.setState(STATUS_ACTIVE, false);
      }
    }
  }

  protected setStateByElement(element: Element, enable: boolean) {
    const view = this.context.view;
    const scale = view.getXScale();
    const value = getElementValue(element, scale.field);
    const elements = getElements(view);
    const highlightElements = elements.filter((el) => {
      return getElementValue(el, scale.field) === value;
    });
    this.setHighlightBy(elements, (el) => highlightElements.includes(el), enable);
  }

  /**
   * 切换状态
   */
  public toggle() {
    const element = getCurrentElement(this.context);
    if (element) {
      const hasState = element.hasState(this.stateName);
      this.setStateByElement(element, !hasState);
    }
  }
}

export default HighlightX;
