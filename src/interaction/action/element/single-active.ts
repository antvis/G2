import ElementSingleState from './single-state';

/**
 * @ignore
 * 仅允许单个 Element Active 的 Action
 */
class ElementSingleActive extends ElementSingleState {
  protected stateName: string = 'active';
  /**
   * 当前事件相关的 Element Active
   */
  public active() {
    this.setState();
  }
}

export default ElementSingleActive;
