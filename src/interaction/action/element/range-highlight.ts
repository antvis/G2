import Element from '../../../geometry/element/';
import { clearHighlight, setHighlightBy } from './highlight-util';
import ElementRangeState from './range-state';

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
    this.setState();
  }

  protected setElementsState(elements: Element[], enable: boolean, allElements: Element[]) {
    setHighlightBy(allElements, (el) => elements.indexOf(el) >= 0, enable);
  }
}

export default ElementRangeHighlight;
