import Element from '../../../geometry/element/';
import { getElements } from '../util';
import { clearHighlight, setHighlightBy } from './highlight-util';
import ElementSingleState from './single-state';

/**
 * @ignore
 * 单个 Element Highlight 的 Action
 */
class ElementSingleHighlight extends ElementSingleState {
  protected stateName: string = 'active';

  /**
   * Element Highlight
   */
  public highlight() {
    this.setState();
  }

  protected setElementState(element: Element, enable: boolean) {
    const view = this.context.view;
    const elements = getElements(view);
    setHighlightBy(elements, (el) => element === el, enable);
  }

  // 清理掉所有的 active， unactive 状态
  public clear() {
    const view = this.context.view;
    clearHighlight(view);
  }
}

export default ElementSingleHighlight;
