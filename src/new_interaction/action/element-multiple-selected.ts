import { each } from '@antv/util';
import Action from './base';
import { getCurrentElement, getElementsByState } from './util';

class ElementMultipleSelected extends Action {
  public readonly name: string = 'element-multiple-selected';

  /**
   * 选中节点，允许多选
   */
  public selected() {
    const element = getCurrentElement(this.context);
    if (element) {
      element.setState('selected', true);
    }
  }

  public unselected() {
    const element = getCurrentElement(this.context);
    if (element) {
      element.setState('selected', false);
    }
  }

  /**
   * 切换选中，允许多选
   */
  public toggle() {
    const element = getCurrentElement(this.context);
    if (element) {
      const hasSelected = element.hasState('selected');
      element.setState('selected', !hasSelected);
    }
  }

  public clear() {
    const view = this.context.view;
    const elements = getElementsByState(view, 'selected');
    each(elements, (el) => {
      el.setState('selected', false);
    });
  }
}

export default ElementMultipleSelected;
