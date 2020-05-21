import { each } from '@antv/util';
import Action from '../base';
import {
  getDelegationObject,
  getElements,
  getElementValue,
  getScaleByField,
  isList,
  isSlider,
  isMask,
  getMaskedElements,
} from '../util';
/**
 * 元素过滤的 Action，控制元素的显示隐藏
 * @ignore
 */
class ElementFilter extends Action {
  /**
   * 过滤
   */
  public filter() {
    const delegateObject = getDelegationObject(this.context);
    const view = this.context.view;
    const elements = getElements(view);
    if (isMask(this.context)) {
      const maskElements = getMaskedElements(this.context, 10);
      if (maskElements) {
        each(elements, (el) => {
          if (maskElements.includes(el)) {
            el.show();
          } else {
            el.hide();
          }
        });
      }
    } else if (delegateObject) {
      const { component } = delegateObject;
      const field = component.get('field');
      // 列表类的组件能够触发
      if (isList(delegateObject)) {
        if (field) {
          const unCheckedItems = component.getItemsByState('unchecked');
          const scale = getScaleByField(view, field);
          const names = unCheckedItems.map((item) => item.name);
          // 直接控制显示、隐藏
          each(elements, (el) => {
            const value = getElementValue(el, field);
            const text = scale.getText(value);
            if (names.indexOf(text) >= 0) {
              el.hide();
            } else {
              el.show();
            }
          });
        }
      } else if (isSlider(delegateObject)) {
        const range = component.getValue();
        const [min, max] = range;
        each(elements, (el) => {
          const value = getElementValue(el, field);
          if (value >= min && value <= max) {
            el.show();
          } else {
            el.hide();
          }
        });
      }
    }
  }
  /**
   * 清除过滤
   */
  public clear() {
    const elements = getElements(this.context.view);
    each(elements, (el) => {
      el.show();
    });
  }

  /**
   * 恢复发生的过滤，保持同 data-filter 命名的一致
   */
  public reset() {
    this.clear();
  }
}

export default ElementFilter;
