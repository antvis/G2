import Element from '../../geometry/element/';
import Action from './base';
import { getCurrentElement } from './util';
class ElementActive extends Action {
  private element: Element;

  public active() {
    const element = getCurrentElement(this.context);
    if (element) {
      element.setState('active', true);
      this.element = element;
    }
  }

  public reset() {
    const element = this.element;
    if (element) {
      element.setState('active', false);
    }
  }

  public destroy() {
    super.destroy();
    this.element = null;
  }
}

export default ElementActive;
