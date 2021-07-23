import Element from '../../../geometry/element';
import { Event } from '../../../chart';
import { clearHighlight, setHighlightBy } from './highlight-util';
import ElementRangeState from './range-state';

enum EVENTS {
  BEFORE_HIGHLIGHT = 'element-range-highlight:beforehighlight',
  AFTER_HIGHLIGHT = 'element-range-highlight:afterhighlight',
  BEFORE_CLEAR = 'element-range-highlight:beforeclear',
  AFTER_CLEAR = 'element-range-highlight:afterclear',
}

export { EVENTS as ELEMENT_RANGE_HIGHLIGHT_EVENTS };

/**
 * @ignore
 * 区域 highlight 的 Action
 */
class ElementRangeHighlight extends ElementRangeState {
  protected stateName: string = 'active';

  // 清理掉所有的 active， unactive 状态
  protected clearViewState(view) {
    clearHighlight(view);
  }

  /**
   * 设置 highlight
   */
  public highlight() {
    const { view, event } = this.context;
    const elements = this.getIntersectElements();
    const payload = { view, event, highlightElements: elements };
    view.emit(EVENTS.BEFORE_HIGHLIGHT, Event.fromData(view, EVENTS.BEFORE_HIGHLIGHT, payload));
    this.setState();
    view.emit(EVENTS.AFTER_HIGHLIGHT, Event.fromData(view, EVENTS.AFTER_HIGHLIGHT, payload));
  }

  /**
   * @overrider 添加事件
   */
  public clear() {
    const view = this.context.view;
    view.emit(EVENTS.BEFORE_CLEAR, Event.fromData(view, EVENTS.BEFORE_CLEAR, {}));
    super.clear();
    view.emit(EVENTS.AFTER_CLEAR, Event.fromData(view, EVENTS.AFTER_CLEAR, {}));
  }

  protected setElementsState(elements: Element[], enable: boolean, allElements: Element[]) {
    setHighlightBy(allElements, (el) => elements.indexOf(el) >= 0, enable);
  }
}

export default ElementRangeHighlight;
