import { each } from '@antv/util';
import { View } from '../chart';
import { IAction, IInteractionContext, LooseObject } from '../interface';
/**
 * 交互的上下文
 */
class Context implements IInteractionContext {
  public actions: IAction[] = [];
  public view: View;
  public event: LooseObject = null;
  private cacheMap: LooseObject = {};
  constructor(view: View) {
    this.view = view;
  }

  /**
   * 缓存信息
   * @param params 缓存的字段
   *  - 如果一个字段则获取缓存
   *  - 两个字段则设置缓存
   */
  public cache(...params) {
    if (params.length === 1) {
      return this.cacheMap[params[0]];
    } else if (params.length === 2) {
      this.cacheMap[params[0]] = params[1];
    }
  }
  /**
   * 获取 Action
   * @param name Action 的名称
   */
  public getAction(name: string): IAction {
    return this.actions.find((action) => action.name === name);
  }

  /**
   * 获取 Action
   * @param action Action 对象
   */
  public addAction(action: IAction) {
    this.actions.push(action);
  }

  /**
   * 移除 Action
   * @param action Action 对象
   */
  public removeAction(action: IAction) {
    const actions = this.actions;
    const index = this.actions.indexOf(action);
    if (index >= 0) {
      actions.splice(index, 1);
    }
  }
  /**
   * 销毁
   */
  public destroy() {
    this.view = null;
    this.event = null;
    // 先销毁 action 再清空，一边遍历，一边删除，所以数组需要更新引用
    each(this.actions.slice(), (action) => {
      action.destroy();
    });
    this.actions = null;
    this.cacheMap = null;
  }
}

export default Context;
