import { each, isNil } from '@antv/util';
import { ListItem } from '../../../dependents';
import Element from '../../../geometry/element/';
import { getCurrentElement, getDelegationObject, getElements, getElementValue, isList } from '../util';
import StateBase from './state-base';
/**
 * 状态量 Action 的基类，允许多个 Element 同时拥有某个状态
 * @class
 */
class ElementState extends StateBase {
  // 设置由组件选项导致的状态变化
  private setStateByComponent(component, item: ListItem, enable: boolean) {
    const view = this.context.view;
    const field = component.get('field');
    const elements = getElements(view);
    this.setElementsStateByItem(elements, field, item, enable);
  }

  /** 组件的选项是否同 element 匹配 */
  protected isMathItem(element: Element, field: string, item: ListItem) {
    const view = this.context.view;
    const scale = view.getScaleByField(field);
    const value = getElementValue(element, field);
    return !isNil(value) && item.name === scale.getText(value);
  }

  protected setElementsStateByItem(elements: Element[], field: string, item: ListItem, enable: boolean) {
    each(elements, (el) => {
      if (this.isMathItem(el, field, item)) {
        el.setState(this.stateName, enable);
      }
    });
  }

  /** 设置状态是否激活 */
  protected setStateEnable(enable: boolean) {
    const element = getCurrentElement(this.context);
    const stateName = this.stateName;
    if (element) {
      // 触发源由于 element 导致
      this.setElementState(element, enable);
    } else {
      // 触发源由组件导致
      const delegateObject = getDelegationObject(this.context);
      // 如果触发源时列表，图例、坐标轴
      if (isList(delegateObject)) {
        const { item, component } = delegateObject;
        if (item && component) {
          this.setStateByComponent(component, item, enable);
        }
      }
    }
  }

  /**
   * 切换状态
   */
  public toggle() {
    const element = getCurrentElement(this.context);
    if (element) {
      const hasState = element.hasState(this.stateName);
      this.setElementState(element, !hasState);
    }
  }

  /**
   * 取消当前时间影响的状态
   */
  public reset() {
    this.setStateEnable(false);
  }
}

export default ElementState;
