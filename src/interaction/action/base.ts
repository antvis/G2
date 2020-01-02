import { each, isNil } from '@antv/util';
import { IAction, IInteractionContext, LooseObject } from '../../interface';

/**
 * Action 的基类
 */
abstract class Action<T = LooseObject> implements IAction {
  public name;
  public context: IInteractionContext;
  protected cfg: T;
  protected cfgFields: string[]; // 配置项的字段，自动负值到 this 上

  constructor(context: IInteractionContext, cfg?: T) {
    this.context = context;
    this.cfg = cfg;
    context.addAction(this);
  }

  // 设置配置项传入的值
  protected applyCfg(cfg) {
    if (this.cfgFields && cfg) {
      each(this.cfgFields, (field) => {
        if (!isNil(cfg[field])) {
          this[field] = cfg[field];
        }
      });
    }
  }

  // 提供给子类用于继承
  public init() {
    this.applyCfg(this.cfg);
  }

  public destroy() {
    // 移除 action
    this.context.removeAction(this);
    // 清空
    this.context = null;
  }
}

export default Action;
