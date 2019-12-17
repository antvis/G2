import { IAction, IInteractionContext, LooseObject } from '../../interface';

/**
 * Action 的基类
 */
abstract class Action<T = LooseObject> implements IAction {
  public name;
  public context: IInteractionContext;
  protected cfg: T;

  constructor(context: IInteractionContext, cfg?: T) {
    this.context = context;
    this.cfg = cfg;
    context.addAction(this);
    this.init();
  }
  // 提供给子类用于继承
  public init() {}

  public destroy() {
    // 移除 action
    this.context.removeAction(this);
    // 清空
    this.context = null;
  }
}

export default Action;
