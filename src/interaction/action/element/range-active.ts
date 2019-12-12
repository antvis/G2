import ElementRangeState from './range-state';

class ElementRangeActive extends ElementRangeState {
  protected stateName: string = 'active';
  public active() {
    this.setState();
  }
}

export default ElementRangeActive;
