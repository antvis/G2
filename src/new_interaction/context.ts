import { each } from '@antv/util';
import { View } from '../chart';
import { IAction, IInteractionContext, LooseObject } from '../interface';
class Context implements IInteractionContext {
  public actions: IAction[] = [];
  public view: View;
  public event: LooseObject = null;
  private cacheMap: LooseObject = {};
  constructor(view: View) {
    this.view = view;
  }

  public cache(...params) {
    if (params.length === 1) {
      return this.cacheMap[params[0]];
    } else if (params.length === 2) {
      this.cacheMap[params[0]] = params[1];
    }
  }

  public getAction(name: string): IAction {
    const actions = this.actions;
    let rst = null;
    each(actions, (action) => {
      if (action.name === name) {
        rst = action;
        return false;
      }
    });
    return rst;
  }

  public addAction(action: IAction) {
    this.actions.push(action);
  }

  public removeAction(action: IAction) {
    const actions = this.actions;
    const index = this.actions.indexOf(action);
    if (index >= 0) {
      actions.splice(index, 1);
    }
  }

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
