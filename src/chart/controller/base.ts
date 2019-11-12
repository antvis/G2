import { IComponent, IGroup } from '../../dependents';
import View from '../view';

export type ControllerCtor<O, E> = new (view: View, option?: O, extra?: E) => Controller<any, any>;

/**
 * Controller 规范需要定义的基类
 * 1. 规范的 props 输入
 * 2. 统一的信息获取 API
 *    - 获取大小位置
 * 3. 明确定义的组件事件（名称、数据）
 */
export abstract class Controller<O = any, E = any> {
  /** the component container group */
  protected container: IGroup;
  protected view: View;
  /** option 配置，不同组件有自己不同的配置结构 */
  protected option: O;
  protected extra: E;

  private components: IComponent[] = [];

  constructor(view: View, option?: O, extra?: E) {
    this.view = view;
    this.option = option;
    this.extra = extra;

    this.container = this.getContainer();
  }

  /**
   * init the component
   */
  public abstract init();

  /**
   * render the components
   */
  public abstract render();

  /**
   * update the components
   */
  public abstract update();

  /**
   * destroy the component
   */
  public destroy() {
    this.container.remove();
    this.container.destroy();
  }

  /**
   * get the bbox of component
   */
  public getComponents(): IComponent[] {
    return this.components;
  }

  /**
   * get G container group
   * @returns container group
   */
  protected abstract getContainer(): IGroup;
}
