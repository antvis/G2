import Element from '../../../geometry/element/';
import { getElements, getElementValue } from '../util';
import Highlight from './highlight';

/**
 * Highlight color
 * @ignore
 */
class HighlightColor extends Highlight {
  protected setStateByElement(element: Element, enable: boolean) {
    const view = this.context.view;
    const colorAttr = element.geometry.getAttribute('color');
    if (!colorAttr) {
      return;
    }
    const scale = view.getScaleByField(colorAttr.getFields()[0]);
    const value = getElementValue(element, scale.field);
    const elements = getElements(view);
    const highlightElements = elements.filter((el) => {
      return getElementValue(el, scale.field) === value;
    });
    this.setHighlightBy(elements, (el) => highlightElements.includes(el), enable);
  }
}

export default HighlightColor;
