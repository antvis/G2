import { each } from '@antv/util';
import { isArray } from 'util';
import Element from '../../geometry/element';
import Action from './base';
import { getCurrentElement, getDelegationObject, isList } from './util';
class ListActive extends Action {
  public name: string = 'list-active';
  protected allowActive(component): boolean {
    const field = component.get('field');
    if (!field) {
      return false;
    }
    const view = this.context.view;
    const scale = view.getScaleByField(field);
    return scale.isCategory;
  }

  private setActiveByElement(component, element: Element, enable: boolean) {
    const field = component.get('field');
    const view = this.context.view;
    const scale = view.getScaleByField(field);
    const model = element.getModel();
    const record = model.data;
    let value;
    if (isArray(record)) {
      value = record[0][field];
    } else {
      value = record[field];
    }
    const text = scale.getText(value);
    const items = component.getItems();
    each(items, (item) => {
      if (item.name === text) {
        component.setItemState(item, 'active', enable);
      }
    });
  }

  private setItemActive(enable) {
    const element = getCurrentElement(this.context);
    if (element) {
      // trigger by element
      const view = this.context.view;
      const components = view.getComponents();
      each(components, (component) => {
        if (component.isList() && this.allowActive(component)) {
          this.setActiveByElement(component, element, enable);
        }
      });
    } else {
      // 被组件触发
      const delegationObject = getDelegationObject(this.context);
      if (isList(delegationObject)) {
        const { item, component } = delegationObject;
        component.setItemState(item, 'active', enable);
      }
    }
  }

  public active() {
    this.setItemActive(true);
  }

  public reset() {
    this.setItemActive(false);
  }
}

export default ListActive;
