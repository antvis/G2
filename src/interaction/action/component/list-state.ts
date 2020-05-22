import { each } from '@antv/util';
import { IList, ListItem } from '../../../dependents';
import Element from '../../../geometry/element';
import { LooseObject } from '../../../interface';
import Action from '../base';
import { getComponents } from '../util';
import { getCurrentElement, getDelegationObject, getElementValue, isList, getScaleByField } from '../util';

/** @ignore */
interface ListStateCfg {
  componentNames: string[];
}

/**
 * 列表项状态 Action 的基础类
 * @class
 * @ignore
 */
class ListState extends Action<ListStateCfg> {
  protected stateName: string = '';
  protected ignoreItemStates = [];

  /** 获取触发的列表组件 */
  protected getTriggerListInfo() {
    const delegateObject = getDelegationObject(this.context);
    let info: LooseObject = null;
    if (isList(delegateObject)) {
      info = {
        item: delegateObject.item,
        list: delegateObject.component,
      };
    }
    return info;
  }
  // 获取所有允许执行 Action 的组件
  protected getAllowComponents() {
    const view = this.context.view;
    const components = getComponents(view);
    const rst = [];
    each(components, (component) => {
      if (component.isList() && this.allowSetStateByElement(component)) {
        rst.push(component);
      }
    });
    return rst;
  }

  /** 是否存在指定的状态 */
  protected hasState(list: IList, item: ListItem) {
    return list.hasState(item, this.stateName);
  }

  /** 清理组件的状态 */
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
    if (this.cfg && this.cfg.componentNames) {
      const name = component.get('name');
      // 如果配置了限制的 component name，则要进行检测
      if (this.cfg.componentNames.indexOf(name) === -1) {
        return false;
      }
    }
    const view = this.context.view;
    const scale = getScaleByField(view, field);
    return scale && scale.isCategory;
  }
  // 检测是否允许触发对应的状态改变事件
  private allowSetStateByItem(item: ListItem, list: IList) {
    const ignoreStates = this.ignoreItemStates;
    if (ignoreStates.length) {
      const filterStates = ignoreStates.filter((state) => {
        return list.hasState(item, state);
      });
      return filterStates.length === 0;
    }
    return true; // 没有定义忽略的状态时，允许
  }

  // 设置组件的 item active
  private setStateByElement(component, element: Element, enable: boolean) {
    const field = component.get('field');
    const view = this.context.view;
    const scale = getScaleByField(view, field);
    const value = getElementValue(element, field);
    const text = scale.getText(value);
    this.setItemsState(component, text, enable);
  }

  // 设置状态
  protected setStateEnable(enable: boolean) {
    const element = getCurrentElement(this.context);
    if (element) {
      // trigger by element
      const components = this.getAllowComponents();
      each(components, (component) => {
        this.setStateByElement(component, element, enable);
      });
    } else {
      // 被组件触发
      const delegateObject = getDelegationObject(this.context);
      if (isList(delegateObject)) {
        const { item, component } = delegateObject;
        if (this.allowSetStateByElement(component) && this.allowSetStateByItem(item, component)) {
          this.setItemState(component, item, enable);
        }
      }
    }
  }

  // 多个 item 设置状态
  protected setItemsState(list: IList, name: string, enable: boolean) {
    const items = list.getItems();
    each(items, (item) => {
      if (item.name === name) {
        this.setItemState(list, item, enable);
      }
    });
  }

  // 单个 item 设置状态
  protected setItemState(list: IList, item: ListItem, enable: boolean) {
    list.setItemState(item, this.stateName, enable);
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
