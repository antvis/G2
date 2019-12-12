import ElementSingleState from './single-state';

class ElementSingleActive extends ElementSingleState {
  protected stateName: string = 'active';
  public active() {
    this.setState();
  }
}

export default ElementSingleActive;
