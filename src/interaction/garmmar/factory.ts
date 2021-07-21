import type { ActionCtor } from './action';

const ACTION_MAP = new Map<string, ActionCtor>();

/**
 * 注册自定义交互中的 Action
 * @param name
 * @param action
 */
export function registerAction(name: string, action: ActionCtor) {
  ACTION_MAP.set(name.toLowerCase(), action);
}

/**
 * 根据名称获得一个交互 Action
 * @param name
 * @returns
 */
export function getAction(name: string): ActionCtor {
  return ACTION_MAP.get(name.toLowerCase());
}
