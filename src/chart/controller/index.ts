import { find } from '@antv/util';
import { ControllerCtor } from './base';

const LOAD_COMPONENT_CONTROLLERS: Record<string, ControllerCtor> = {};

/**
 * 全局注册插件
 * @param name
 * @param plugin
 * @returns void
 */
export function registerController(name: string, plugin: ControllerCtor) {
  LOAD_COMPONENT_CONTROLLERS[name] = plugin;
}

/**
 * 删除全局插件
 * @param name
 * @returns void
 */
export function unregisterController(name: string) {
  delete LOAD_COMPONENT_CONTROLLERS[name];
}

/**
 * 获取全局插件
 * @returns string[]
 */
export function getControllerNames(): string[] {
  return Object.keys(LOAD_COMPONENT_CONTROLLERS);
}

/**
 * 获得组件插件
 * @param name
 */
export function getController(name: string): ControllerCtor {
  return LOAD_COMPONENT_CONTROLLERS[name];
}
