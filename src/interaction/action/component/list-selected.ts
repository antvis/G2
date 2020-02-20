import ListState from './list-state';

/**
 * 图例项和坐标轴文本选中的 Action
 * @ignore
 */
class ListSelected extends ListState {
  protected stateName: string = 'selected';
  public selected() {
    this.setState();
  }
}

export default ListSelected;
