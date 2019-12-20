import { getCurrentElement } from '../util';
import StateBase from './state-base';

/**
 * 单状态量的 Action 基类
 * @class
 */
class ElementSingleState extends StateBase {
  protected setStateEnable(enable: boolean) {
    const element = getCurrentElement(this.context);
    if (element) {
      // 仅支持单个状态量的元素，只能由 element 触发
      if (enable) {
        this.clear();
        this.setElementState(element, true);
      } else if (this.hasState(element)) {
        this.setElementState(element, false);
      }
    }
  }

  /**
   * 切换选中，只允许选中一个
   */
  public toggle() {
    const element = getCurrentElement(this.context);
    if (element) {
      const hasState = this.hasState(element); // 提前获取状态
      this.clear();
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

export default ElementSingleState;
