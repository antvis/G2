import '../state/active';
import Interaction from './base';

/**
 * Active interactions
 * 鼠标 hover 到具体图形，激活图形的 active 状态
 */
export default class ActiveInteraction extends Interaction {
  public readonly type: string = 'active';

  protected initEvents() {
    // FIXME: 待事件 bug 修复后，监听 view 上的事件
    const canvas = this.view.canvas;
    canvas.on('element:mouseenter', this.onMouseenter);
    canvas.on('element:mouseleave', this.onMouseleave);
  }

  /**
   * destroy
   */
  public destroy() {
    const canvas = this.view.canvas;
    canvas.off('element:mouseenter', this.onMouseenter);
    canvas.off('element:mouseleave', this.onMouseleave);
  }

  private onMouseenter = (ev) => {
    const shape = ev.shape;
    const stateManager = this.stateManager;
    if (shape.get('animations').length !== 0) {
      // hack: 如果动画就不触发，防止动画引起 element.getOriginStyle() 取值错误
      return;
    }
    // FIXME: 带 G 的事件委托机制 OK 后修改
    const element = shape.get('element');
    stateManager.setState('active', [element]);
  };

  private onMouseleave = (ev) => {
    const stateManager = this.stateManager;
    stateManager.setState('active', []);
  };
}
