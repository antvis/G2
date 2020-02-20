import StateAction from './state';

/**
 * 元素 active 的 Action，允许多个元素同时 active
 * @class
 * @ignore
 */
class ElementActive extends StateAction {
  protected stateName: string = 'active';
  /**
   * Active Element
   */
  public active() {
    this.setState();
  }
}

export default ElementActive;
