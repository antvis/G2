import ElementSingleState from './single-state';

/**
 * @ignore
 * 单选的 Action
 */
class ElementSingleSelected extends ElementSingleState {
  protected stateName: string = 'selected';
  /**
   * 选中
   */
  public selected() {
    this.setState();
  }
}

export default ElementSingleSelected;
