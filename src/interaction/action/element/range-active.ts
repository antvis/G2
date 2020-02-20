import ElementRangeState from './range-state';

/**
 * @ignore
 * 图表元素区域 Active 的 Action
 */
class ElementRangeActive extends ElementRangeState {
  protected stateName: string = 'active';
  /**
   * 图表元素 Active
   */
  public active() {
    this.setState();
  }
}

export default ElementRangeActive;
