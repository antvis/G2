import '../state/active';
import Interaction from './base';

/**
 * Active interactions
 * 鼠标 hover 到具体图形，激活图形的 active 状态
 */
export default class ActiveInteraction extends Interaction {
  public readonly type: string = 'active';

  protected initEvents() {
    this.view.on('element:mouseenter', this.onMouseenter);
    this.view.on('element:mouseleave', this.onMouseleave);
  }

  /**
   * destroy
   */
  public destroy() {
    this.view.off('element:mouseenter', this.onMouseenter);
    this.view.off('element:mouseleave', this.onMouseleave);
  }

  private onMouseenter = (ev) => {
    const shape = ev.target;
    const stateManager = this.stateManager;
    const element = shape.get('element');
    stateManager.setState('active', [element]);
  };

  private onMouseleave = (ev) => {
    const stateManager = this.stateManager;
    stateManager.setState('active', null);
  };
}
