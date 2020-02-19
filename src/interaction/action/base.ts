import { assign } from '@antv/util';
import { IAction, IInteractionContext, LooseObject } from '../../interface';

/**
 * Action 的基类
 */
abstract class Action<T = LooseObject> implements IAction {
  /** Action 名字 */
  public name;
  /** 上下文对象 */
  public context: IInteractionContext;
  /** Action 配置 */
  protected cfg: T;
  /** 配置项的字段，自动负值到 this 上 */
  protected cfgFields: string[];

  constructor(context: IInteractionContext, cfg?: T) {
    this.context = context;
    this.cfg = cfg;
    context.addAction(this);
  }

  /**
   * 设置配置项传入的值
   * @param cfg
   */
  protected applyCfg(cfg) {
    assign(this, cfg);
  }

  /**
   * Inits action，提供给子类用于继承
   */
  public init() {
    this.applyCfg(this.cfg);
  }

  /**
   * Destroys action
   */
  public destroy() {
    // 移除 action
    this.context.removeAction(this);
    // 清空
    this.context = null;
  }
}

export default Action;
