import Highlight from './highlight';
import Element from '../../../geometry/element/';
import { getElementValue, getElements } from '../util';

class HighlightX extends Highlight {
  protected setStateByElement(element: Element, enable: boolean) {
    const view = this.context.view;
    const scale = view.getXScale();
    const value = getElementValue(element, scale.field);
    const elements = getElements(view);
    const highlightElements = elements.filter(el => {
      return getElementValue(el, scale.field) === value;
    });
    this.setHighlightBy(elements, (el) => highlightElements.includes(el), enable);
  }
}

export default HighlightX;