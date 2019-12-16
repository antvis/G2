import { each } from '@antv/util';
import Element from '../../../geometry/element/';
import Action from '../base';
import { getDelegationObject, getElements, getElementValue, isList } from '../util';

class ElementFilter extends Action {
  // 合并 elment.show, element.hide 后，删除此方法
  private setVisible(element: Element, visible: boolean) {
    const shape = element.shape;
    if (visible) {
      shape.show();
    } else {
      shape.hide();
    }
  }
  public filter() {
    const delegateObject = getDelegationObject(this.context);
    // 列表类的组件能够触发
    if (isList(delegateObject)) {
      const view = this.context.view;
      const { component } = delegateObject;
      const field = component.get('field');
      if (field) {
        const unCheckedItems = component.getItemsByState('unchecked');
        const scale = view.getScaleByField(field);
        const names = unCheckedItems.map((item) => item.name);
        const elements = getElements(view);
        // 直接控制显示、隐藏
        each(elements, (el) => {
          const value = getElementValue(el, field);
          const text = scale.getText(value);
          if (names.indexOf(text) >= 0) {
            this.setVisible(el, false);
          } else {
            this.setVisible(el, true);
          }
        });
      }
    }
  }

  public clear() {
    const elements = getElements(this.context.view);
    each(elements, (el) => {
      this.setVisible(el, true);
    });
  }
}

export default ElementFilter;
