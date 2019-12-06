import { each } from '@antv/util';
import Element from '../../geometry/element/';
import Action from './base';
import { getCurrentElement, getElementsByState } from './util';
class ElementSelected extends Action {
  public readonly name: string = 'element-selected';

  protected setSelected(element: Element, selected: boolean) {
    element.setState('selected', selected);
  }

  /**
   * 选中节点，只允许选中一个
   */
  public selected() {
    const element = getCurrentElement(this.context);
    if (element) {
      this.clear();
      this.setSelected(element, true);
    }
  }

  /**
   * 切换选中，只允许选中一个
   */
  public toggle() {
    const element = getCurrentElement(this.context);
    if (element) {
      const hasSelected = element.hasState('selected');
      this.clear();
      this.setSelected(element, !hasSelected);
    }
  }

  public clear() {
    const view = this.context.view;
    const elements = getElementsByState(view, 'selected');
    each(elements, (el) => {
      this.setSelected(el, false);
    });
  }
}

export default ElementSelected;
