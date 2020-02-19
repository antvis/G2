import ElementRangeState from './range-state';

/**
 * @ignore
 * 区域选中的 Action
 */
class ElementRangeSelected extends ElementRangeState {
  protected stateName: string = 'selected';
  /**
   * 选中
   */
  public selected() {
    this.setState();
  }
}

export default ElementRangeSelected;
