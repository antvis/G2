import ListState from './list-state';

/**
 * 列表项（图例项、坐标轴文本）激活的 Action
 * @class
 * @ignore
 */
class ListActive extends ListState {
  protected stateName: string = 'active';
  /**
   * 激活选项
   */
  public active() {
    this.setState();
  }
}

export default ListActive;
