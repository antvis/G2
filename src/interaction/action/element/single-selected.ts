import ElementSingleState from './single-state';

class ElementSingleSelected extends ElementSingleState {
  protected stateName: string = 'selected';
  public selected() {
    this.setState();
  }
}

export default ElementSingleSelected;
