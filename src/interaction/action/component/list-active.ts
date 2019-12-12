import ListState from './list-state';

class ListActive extends ListState {
  protected stateName: string = 'active';
  public active() {
    this.setState();
  }
}

export default ListActive;
