import StateAction from './state';

/**
 * @ignore
 * 允许多选的 Action
 * @class
 */
class ElementMultipleSelected extends StateAction {
  protected stateName: string = 'selected';
  /**
   * 选中节点，允许多选
   */
  public selected() {
    this.setState();
  }
}

export default ElementMultipleSelected;
