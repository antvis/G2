import ListState from './list-state';

class ListSelected extends ListState {
  protected stateName: string = 'selected';
  public selected() {
    this.setState();
  }
}

export default ListSelected;
