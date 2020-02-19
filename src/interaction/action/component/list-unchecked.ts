import ListState from './list-state';

/**
 * 图例项取消勾选的 Action
 * @ignore
 */
class ListUnchecked extends ListState {
  protected stateName: string = 'unchecked';
  /**
   * 取消勾选
   */
  public unchecked() {
    this.setState();
  }
}

export default ListUnchecked;
