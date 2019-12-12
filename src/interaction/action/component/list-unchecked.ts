import ListState from './list-state';

class ListUnchecked extends ListState {
  protected stateName: string = 'unchecked';
  public unchecked() {
    this.setState();
  }
}

export default ListUnchecked;
