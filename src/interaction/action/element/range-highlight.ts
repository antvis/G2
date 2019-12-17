import Element from '../../../geometry/element/';
import { getElements } from '../util';
import { clearHighlight, setHighlightBy } from './highlight-util';
import ElementRangeState from './range-state';

/**
 * 区域 highlight 的 Action
 */
class ElementRangeHighlight extends ElementRangeState {
  protected stateName: string = 'active';
  // 清理掉所有的 active， unactive 状态
  public clear() {
    const view = this.context.view;
    clearHighlight(view);
  }
  /**
   * 设置 highlight
   */
  public highlight() {
    this.setState();
  }

  protected setElementsState(elements: Element[], enable) {
    const view = this.context.view;
    const AllElements = getElements(view);
    setHighlightBy(AllElements, (el) => elements.indexOf(el) >= 0, enable);
  }
}

export default ElementRangeHighlight;
