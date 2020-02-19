import { each } from '@antv/util';
import Element from '../../../geometry/element/';
import Action from '../base';
import { getElementsByState } from '../util';

/**
 * 状态量 Action 的基类
 * @abstract
 * @class
 * @ignore
 */
abstract class StateBase extends Action {
  /**
   * 状态名称
   */
  protected stateName: string = '';

  /**
   * 设置状态是否激活
   * @param enable 状态值
   */
  protected abstract setStateEnable(enable: boolean);

  /**
   * 是否具有某个状态
   * @param element 图表 Element 元素
   */
  protected hasState(element: Element): boolean {
    return element.hasState(this.stateName);
  }
  /**
   * 设置状态激活
   * @param enable 状态值
   */
  protected setElementState(element: Element, enable: boolean) {
    // 防止闪烁
    element.setState(this.stateName, enable);
  }

  /**
   * 设置状态
   */
  public setState() {
    this.setStateEnable(true);
  }

  /**
   * 清除所有 Element 的状态
   */
  public clear() {
    const view = this.context.view;
    this.clearViewState(view);
  }

  protected clearViewState(view) {
    const elements = getElementsByState(view, this.stateName);
    each(elements, (el: Element) => {
      this.setElementState(el, false);
    });
  }
}

export default StateBase;
