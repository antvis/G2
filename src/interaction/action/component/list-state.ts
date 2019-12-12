import { each } from '@antv/util';
import Element from '../../../geometry/element';
import { LooseObject } from '../../../interface';
import Action from '../base';

import { getCurrentElement, getDelegationObject, getElementValue, isList } from '../util';
class ListState extends Action {
  protected stateName: string = '';
  protected getTriggerListInfo() {
    const delegationObject = getDelegationObject(this.context);
    let info: LooseObject = null;
    if (isList(delegationObject)) {
      info = {
        item: delegationObject.item,
        list: delegationObject.component,
      };
    }
    return info;
  }
  protected getAllowComponents() {
    const view = this.context.view;
    const components = view.getComponents();
    const rst = [];
    each(components, (component) => {
      if (component.isList() && this.allowSetStateByElement(component)) {
        rst.push(component);
      }
    });
    return rst;
  }

  protected hasState(list, item) {
    return list.hasState(item, this.stateName);
  }

  protected clearAllComponentsState() {
    const components = this.getAllowComponents();
    each(components, (component) => {
      component.clearItemsState(this.stateName);
    });
  }

  // 不是所有的 component 都能进行 active，目前仅支持分类 scale 对应的组件
  protected allowSetStateByElement(component): boolean {
    const field = component.get('field');
    if (!field) {
      return false;
    }
    const view = this.context.view;
    const scale = view.getScaleByField(field);
    return scale.isCategory;
  }

  // 设置组件的 item active
  private setStateByElement(component, element: Element, enable: boolean) {
    const field = component.get('field');
    const view = this.context.view;
    const scale = view.getScaleByField(field);
    const value = getElementValue(element, field);
    const text = scale.getText(value);
    this.setItemsState(component, text, enable);
  }

  // 设置状态
  protected setStateEnable(enable) {
    const element = getCurrentElement(this.context);
    if (element) {
      // trigger by element
      const view = this.context.view;
      const components = this.getAllowComponents();
      each(components, (component) => {
        this.setStateByElement(component, element, enable);
      });
    } else {
      // 被组件触发
      const delegationObject = getDelegationObject(this.context);
      if (isList(delegationObject)) {
        const { item, component } = delegationObject;
        this.setItemState(component, item, enable);
      }
    }
  }

  // 多个 item 设置状态
  protected setItemsState(component, name, enable) {
    const items = component.getItems();
    each(items, (item) => {
      if (item.name === name) {
        this.setItemState(component, item, enable);
      }
    });
  }

  // 单个 item 设置状态
  protected setItemState(component, item, enable) {
    component.setItemState(item, this.stateName, enable);
  }

  /**
   * 设置状态
   */
  public setState() {
    this.setStateEnable(true);
  }

  /**
   * 取消状态
   */
  public reset() {
    this.setStateEnable(false);
  }

  /**
   * 切换状态
   */
  public toggle() {
    const triggerInfo = this.getTriggerListInfo();
    if (triggerInfo && triggerInfo.item) {
      const { list, item } = triggerInfo;
      const enable = this.hasState(list, item);
      this.setItemState(list, item, !enable);
    }
  }

  /**
   * 取消状态
   */
  public clear() {
    const triggerInfo = this.getTriggerListInfo();
    if (triggerInfo) {
      triggerInfo.list.clearItemsState(this.stateName);
    } else {
      this.clearAllComponentsState();
    }
  }
}

export default ListState;
