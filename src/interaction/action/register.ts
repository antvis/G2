import { ActionCallback, IInteractionContext, LooseObject } from '../../interface';
import Action from './base';
import CallbackAction from './callback';

type ActionConstructor = new (context: IInteractionContext, cfg?: LooseObject) => Action;
interface ActionOption {
  ActionClass: ActionConstructor;
  cfg: LooseObject;
}

// Action 类的缓存
const ActionCache: Record<string, ActionOption> = {};

/**
 * 根据名称获取 Action 实例
 * @param actionName - action 的名称
 * @param context 上下文
 * @returns Action 实例
 */
export function createAction(actionName: string, context: IInteractionContext): Action {
  const actionOption = ActionCache[actionName];
  let action = null;
  if (actionOption) {
    const { ActionClass, cfg } = actionOption;
    action = new ActionClass(context, cfg);
    action.name = actionName;
  }
  return action;
}

/**
 *
 * @param actionName - action 的名称
 * @param ActionClass - 继承自 action 的类
 */
export function registerAction(actionName: string, ActionClass: ActionConstructor, cfg?: LooseObject) {
  ActionCache[actionName] = {
    ActionClass,
    cfg,
  };
}

export function unregisterAction(actionName: string) {
  delete ActionCache[actionName];
}

/**
 * 根据回调函数获取 Action 实例
 * @param callback - action 的回调函数
 * @param context 上下文
 * @returns Action 实例
 */
export function createCallbackAction(callback: ActionCallback, context: IInteractionContext): CallbackAction {
  const action = new CallbackAction(context);
  action.callback = callback;
  action.name = 'callback';
  return action;
}
