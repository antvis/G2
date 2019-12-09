import { IAction, IInteractionContext } from '../../interface';

class Action implements IAction {
  public name;
  public context: IInteractionContext;

  constructor(context: IInteractionContext) {
    this.context = context;
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
