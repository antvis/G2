import '../chart/state/active';
import Interaction from './base';

export default class ActiveInteraction extends Interaction {
  public readonly type: string = 'active';

  protected initEvents() {
    // mock
    const canvas = this.view.canvas;
    canvas.on('interval:mouseenter', this.onMouseenter);
    canvas.on('interval:mouseleave', this.onMouseleave);
  }

  /**
   * destroy
   */
  public destroy() {
    const canvas = this.view.canvas;
    canvas.off('interval:mouseenter', this.onMouseenter);
    canvas.off('interval:mouseleave', this.onMouseleave);
  }

  private onMouseenter(ev) {
    const shape = ev.shape;
    const stateManager = this.stateManager;
    const element = shape.get('element');
    stateManager.setState('activeElements', [element]);
  }

  private onMouseleave(ev) {
    const stateManager = this.stateManager;
    stateManager.setState('activeElements', []);
  }
}
