import { ControllerCtor } from './base';

const LOAD_COMPONENT_CONTROLLERS: Record<string, ControllerCtor> = {};

/**
 * 全局注册组件。
 * @param name 组件名称
 * @param plugin 注册的组件类
 * @returns void
 */
export function registerComponentController(name: string, plugin: ControllerCtor) {
  LOAD_COMPONENT_CONTROLLERS[name] = plugin;
}

/**
 * 删除全局组件。
 * @param name 组件名
 * @returns void
 */
export function unregisterComponentController(name: string) {
  delete LOAD_COMPONENT_CONTROLLERS[name];
}

/**
 * 获取以注册的组件名。
 * @returns string[] 返回已注册的组件名称
 */
export function getComponentControllerNames(): string[] {
  return Object.keys(LOAD_COMPONENT_CONTROLLERS);
}

/**
 * 根据组件名获取组件类。
 * @param name 组件名
 * @returns 返回组件类
 */
export function getComponentController(name: string): ControllerCtor {
  return LOAD_COMPONENT_CONTROLLERS[name];
}
