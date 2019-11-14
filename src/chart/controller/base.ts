import * as _ from '@antv/util';
import { IGroup } from '../../dependents';
import { ComponentOption } from '../interface';
import View from '../view';

export type ControllerCtor<O, E> = new (view: View) => Controller<any>;

/**
 * Controller 规范需要定义的基类
 * 1. 规范的 props 输入
 * 2. 统一的信息获取 API
 *    - 获取大小位置
 * 3. 明确定义的组件事件（名称、数据）
 */
export abstract class Controller<O> {
  /** the component container group */
  protected container: IGroup;
  protected view: View;
  /** option 配置，不同组件有自己不同的配置结构 */
  protected option: O;

  protected components: ComponentOption[] = [];

  constructor(view: View) {
    this.view = view;

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
  // public abstract update();

  /**
   * do layout
   */
  public abstract layout();

  /**
   * clear
   */
  public clear() {
    // destroy all components
    _.each(this.components, (co: ComponentOption) => {
      if (co.component.get('container')) {
        co.component.get('container').remove(true);
      }
      co.component.destroy();
    });

    this.components = [];
  }

  /**
   * destroy the component
   */
  public destroy() {
    this.clear();
  }

  /**
   * get the bbox of component
   */
  public getComponents(): ComponentOption[] {
    return this.components;
  }

  /**
   * get G container group, means where are the components of the controller will be added to.
   * @returns container group
   */
  protected abstract getContainer(): IGroup;
}
