import ElementRangeState from './range-state';

class ElementRangeSelected extends ElementRangeState {
  protected stateName: string = 'selected';
  public selected() {
    this.setState();
  }
}

export default ElementRangeSelected;
